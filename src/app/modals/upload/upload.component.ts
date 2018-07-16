import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { UploadService } from '../../services/upload.service';
import { Upload } from '../../services/upload';
import * as _ from "lodash";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [UploadService]
})
export class UploadComponent{

  @ViewChild('modal')modal:ModalComponent
  @ViewChild('dealModal')dealModal:ModalComponent;
  @Output()saved: EventEmitter<string> = new EventEmitter();

    selectedFiles: FileList;
    @Input()uid;
    @Input()key;
    @Input()name;
    currentUpload: Upload;
    constructor(private upSvc: UploadService) { }
    detectFiles(event) {
        this.selectedFiles = event.target.files;
    }
    uploadSingle() {
      let file = this.selectedFiles.item(0)
      this.currentUpload = new Upload(file);
      this.upSvc.pushUpload(this.currentUpload,this.uid,this.name);
      this.checkDone()
    }
    // uploadSingleDeal() {
    //   this.upSvc.resetDealImages(this.uid);
    //   let file = this.selectedFiles.item(0)
    //   this.currentUpload = new Upload(file);
    //   this.upSvc.pushUploadDeal(this.currentUpload,this.uid);
    //   this.checkDone()
    // }
    checkDone(){
      if(this.currentUpload.progress === 100){
        setTimeout(()=>{
          this.close();
          this.closeDeal();
        },200)
      } else{
        setTimeout(()=>{
          this.checkDone()
          this.currentUpload.progress = 0;
        },200)
      }
    }
    uploadMulti() {
      this.upSvc.resetDealImages(this.uid, this.key);
      let files = this.selectedFiles
      let filesIndex = _.range(files.length)
      _.each(filesIndex, (idx) => {
        this.currentUpload = new Upload(files[idx]);
        this.upSvc.pushUploadDeal(this.currentUpload, this.key, this.name)}
      )
      this.checkDone();
    }
    open(){
      this.modal.open();
    }
    close(){
      this.modal.close();
      this.saved.emit();
    }
    openDeal(){
      this.dealModal.open()
    }
    closeDeal(){
      this.dealModal.close()
    }

}
