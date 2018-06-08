import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessSignupComponent } from '../../modals/business-signup/business-signup.component'
import { UserSignupComponent } from '../../modals/user-signup/user-signup.component'
import { LoginComponent } from '../../modals/login/login.component';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [MainService]
})
export class LandingComponent implements OnInit {

  @ViewChild(UserSignupComponent)userSignup;
  @ViewChild(BusinessSignupComponent)businesSignup;
  @ViewChild(LoginComponent)login;

  constructor(
    public mainService: MainService,
    public router: Router
  ) { }

  ngOnInit() {
    this.mainService.getLoggedInState().subscribe(res=>{
      if(res){
        this.router.navigate(['/'])
      }
    }, err=>{
      console.log(err,'err')
    })
  }
  openBis(){
    this.businesSignup.open();
  }
  openUser(){
    this.userSignup.open();
  }
  openLogin(){
    this.login.open()
  }

}
