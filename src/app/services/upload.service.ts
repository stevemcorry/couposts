import { Injectable } from '@angular/core';
import { Upload } from './upload'
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'firebase/storage'
import * as _ from 'lodash';

@Injectable()
export class UploadService {
  storageRef;
  constructor(
   public afAuth: AngularFireAuth,
   public db: AngularFireDatabase,
   ) {
    this.storageRef = firebase.storage().ref()
   }
  private basePath:string = '/uploads';
  uploads: FirebaseListObservable<Upload[]>;

  pushUpload(upload: Upload, uid) {
    let uploadTask = this.storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    return uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error,'not working')
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        this.saveFileData(upload, uid)
      }
    )
  }
  pushUploadDeal(upload: Upload, key) {
    let uploadTask = this.storageRef.child(`${this.basePath}/${upload.file.name}`+ key).put(upload.file);
    return uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error,'not working')
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        this.saveDealData(upload, key)
      }
    )
  }
  // Writes the file details to the realtime db
  private saveFileData(upload: Upload, uid) {
    let currentUserObj: FirebaseObjectObservable<any> = this.db.object('companies/'+uid+'/url')
    currentUserObj.set(upload.url);
  }
  resetDealImages(uid, key){
    let currentUserObj: FirebaseListObservable<any> = this.db.list('deals/'+ key + '/imgs');
    currentUserObj.remove();
  }
  private saveDealData(upload: Upload, key) {
    let currentUserObj: FirebaseListObservable<any> = this.db.list('deals/'+ key + "/imgs");
    currentUserObj.push(upload.url);
  }

}
