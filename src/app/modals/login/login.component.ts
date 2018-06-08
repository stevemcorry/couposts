import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {MainService} from '../../services/main.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MainService]
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    pass: ''
  }
  @ViewChild('modal')modal: ModalComponent;

  constructor(
    public mainService: MainService,
  ) { }

  login(){
    if(!this.user.email || !this.user.pass){
      alert('Please enter email and password')
      return
    }
    this.mainService.signIn(this.user.email, this.user.pass).then(res=>{
      console.log(res)
    },err =>{
      console.log(err)
      alert(err)
    })
  }
  open(){
    this.modal.open();
  }
  close(){
    this.modal.close();
  }
  ngOnInit() {
  }

}
