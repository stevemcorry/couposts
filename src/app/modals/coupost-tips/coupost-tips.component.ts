import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
@Component({
  selector: 'app-coupost-tips',
  templateUrl: './coupost-tips.component.html',
  styleUrls: ['./coupost-tips.component.scss']
})
export class CoupostTipsComponent implements OnInit {

  @ViewChild('modal')modal:ModalComponent;

  @Output()video: EventEmitter<string> = new EventEmitter();

  title = "Coupost Tips";
  tip;
  subTip = 1;

  constructor(

  ) { }

  ngOnInit() {
  }
  openVideo(){
    this.video.emit(this.tip);
  }
  open(name, x){
    this.title = name;
    this.tip = x;
    this.subTip = 1;
    this.modal.open();
  }
  close(){
    this.modal.close();
    //this.saved.emit();
  }

}
