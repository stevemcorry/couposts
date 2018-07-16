import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MainService } from '../../services/main.service';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-verify-insta-modal',
  templateUrl: './verify-insta-modal.component.html',
  styleUrls: ['./verify-insta-modal.component.scss'],
  providers: [MainService]
})
export class VerifyInstaModalComponent implements OnInit {

  @ViewChild('modal')modal: ModalComponent;
  @Input()uid;
  @Output()saved: EventEmitter<string> = new EventEmitter();

  constructor(
    public mainService: MainService
  ) { }

  ngOnInit() {
  }
  open(){
    this.modal.open();
  }

  verifyInsta(){
    //this.mainService.instaLogin();

    //DELETE LATER
    let user = {counts: {
      followed_by: 250,
      follows: 250,
      media: 25
    }}
    this.mainService.updateUserInsta(user, this.uid).then(res=>{
      console.log('saved Insta Data',res);
      this.modal.close();
      this.saved.emit();
    })

  }

}
