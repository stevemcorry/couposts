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

  pushUpload(upload: Upload, uid, name) {
    let time = new Date().toISOString();
    let uploadTask = this.storageRef.child(`${this.basePath}/${name}${upload.file.name}`+ uid + time + Math.random()).put(upload.file);
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
  pushUploadDeal(upload: Upload, key, name) {
    let time = new Date().toISOString();
    let uploadTask = this.storageRef.child(`${this.basePath}/${name}${upload.file.name}`+ key + time + Math.random()).put(upload.file);
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
  setDealDisplay(upload: Upload, key, name){
    let time = new Date().toISOString();
    let uploadTask = this.storageRef.child(`${this.basePath}/${name}${upload.file.name}`+ key + time + Math.random()).put(upload.file);
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
        this.saveDealDisplay(upload, key)
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
  private saveDealDisplay(upload: Upload, key) {
    let currentUserObj: FirebaseObjectObservable<any> = this.db.object('deals/'+ key + "/display");
    currentUserObj.set(upload.url);
  }

}
