import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { UploadService } from '../../services/upload.service';
import { Upload } from '../../services/upload';
import * as _ from "lodash";

@Component({
  selector: 'app-business-upload-modal',
  templateUrl: './business-upload-modal.component.html',
  styleUrls: ['./business-upload-modal.component.scss'],
  providers: [
    UploadService
  ]
})
export class BusinessUploadModalComponent implements OnInit {

  selectedFiles: FileList;
  currentUpload: Upload;

  @ViewChild('modal')modal: ModalComponent;
  @Input()uid;
  @Output()saved: EventEmitter<string> = new EventEmitter();

  constructor(
    private upSvc: UploadService
  ) { }

  ngOnInit() {
  }
  open(){
    this.modal.open();
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }
  checkDone(){
    if(this.currentUpload.progress === 100){
      setTimeout(()=>{
        this.done();
      },200)
    } else{
      setTimeout(()=>{
        this.checkDone()
        this.currentUpload.progress = 0;
      },200)
    }
  }

  save(){
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload,this.uid);
    this.checkDone()
  }
  done(){
    this.modal.close();
    this.saved.emit();
  }

}
