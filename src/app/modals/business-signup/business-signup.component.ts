import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {MainService} from '../../services/main.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-business-signup',
  templateUrl: './business-signup.component.html',
  styleUrls: ['./business-signup.component.scss'],
  providers: [MainService]
})
export class BusinessSignupComponent implements OnInit {

  @Output() loginOpen: EventEmitter<string> = new EventEmitter();

  comp = {
    name:'',
    signupName: '',
    title: ''
  }
  @ViewChild('modal')modal: ModalComponent

  constructor(
    public mainService: MainService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  open(){
    this.modal.open();
  }
  close(){
    this.modal.close()
  }
  login(){
    this.close();
    this.loginOpen.emit('');
  }
  save(){
    if(this.comp.name){
      this.mainService.saveSignup(this.comp).then(res=>{
        console.log(res,'Worked');
        this.close();
        this.router.navigate(['signup'],{ queryParams: { id: res.key }});
        this.comp = {
          name:'',
          signupName: '',
          title: ''
        }
      })
    } else{
      alert('Please enter the name of your business');
    }
  }

}
