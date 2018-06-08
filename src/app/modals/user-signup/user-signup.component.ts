import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {MainService} from '../../services/main.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss'],
  providers: [MainService]
})
export class UserSignupComponent implements OnInit {

  user = {
    name:'',
    email: '',
  }
  currentUser = false;
  email;
  pass;
  repass;
  @ViewChild('modal')modal: ModalComponent;
  @Input()fromRedeem;
  @Output()loggedIn: EventEmitter<string> = new EventEmitter();
  constructor(
    public mainService: MainService,
  ) { }

  ngOnInit() {
  }
  open(){
    this.modal.open();
  }
  close(){
    this.modal.close();
  }
  signup(){
    if(!this.user.name || !this.user.email || !this.pass){
      alert('Please fill out all info');
      return;
    }
    if(this.pass != this.repass){
      alert('Your passwords did not match. Please recheck.');
      return;
    }
    this.mainService.signUpBusiness(this.user.email, this.pass).then(res=>{
      console.log(res,'signup');
      this.close();
      this.save(res.uid);
      if(this.fromRedeem){
        this.loggedIn.emit()
      }
    }).catch(err =>{
      alert(err);
    })
  }
  login(){
    if(!this.pass || !this.user.email){
      alert('Please fill out all info')
      return;
    }
    this.mainService.signIn(this.user.email, this.pass).then(res=>{
      console.log(res, 'logged In!');
      this.close();
      if(this.fromRedeem){
        this.loggedIn.emit();
      }
    }).catch(err=>{
      alert(err);
    })
  }
  save(uid){
    if(this.user.name && this.user.email){
      this.mainService.saveUser(this.user, uid).then(res=>{
        this.close();
        this.user = {
          name:'',
          email: '',
        }
      })
    } else{
      alert('Please fill out all the info');
    }
  }
  facebookLogin(){
    this.mainService.facebookLogin();
  }
  instaLogin(){
    this.mainService.instaLogin();
  }

}
