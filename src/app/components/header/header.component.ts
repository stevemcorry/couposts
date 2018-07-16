import { Component, OnInit, HostListener, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../../services/main.service';
import { UserSignupComponent } from '../../modals/user-signup/user-signup.component';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MainService]
})
export class HeaderComponent implements OnInit {

  @ViewChild(UserSignupComponent)userSignup;
  @Input()clearHeader;
  loggedIn;
  drop;
  constructor(
    public mainService: MainService,
    public router: Router,
  ) { }
  user;
  userData;
  //users;
  userDealCount = 0;

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    let height = $(window).scrollTop();
    if(height > 305){
      document.getElementById('header').classList.add('smallHead')
    } else{
      document.getElementById('header').classList.remove('smallHead')
    }
    if(height > 50){
      document.getElementById('header').classList.add('smallHeaderOn')
    } else{
      document.getElementById('header').classList.remove('smallHeaderOn')
    }
  } 
  goAbout(){
    this.router.navigate(['about']);
  }
  goSignup(){
    this.router.navigate(['signup']);
  }
  goProfile(){
    if(this.userData){
      this.router.navigate(['userprofile/' + this.mainService.getLoggedInUser().uid]);
    } else {
      this.router.navigate(['businessprofile/'+this.mainService.getLoggedInUser().uid]);
    }
  }
  ngOnInit() {
    this.mainService.getLoggedInState().subscribe(res=>{
      if(res){
        this.loggedIn = res.uid;
      }
      this.getUser();
    })
  }
  getUser(){
    if(this.mainService.getLoggedInUser()){
      let user:any = this.mainService.getUser(this.mainService.getLoggedInUser().uid).subscribe(res=>{
        this.userDealCount = 0;
        if(res){
          if(!res.email){return}
          this.userData = res;
          for(let deal in res.deals){
            if(res.deals[deal].confirmed || res.deals[deal].denied|| !res.deals[deal].confirmed){
              if(!res.deals[deal].redeemed){
                this.userDealCount ++;
              }
            }
          }
          if(!res.insta){
            this.userDealCount ++;
          }
        }
      });
    }
  }
  home(){
    this.router.navigate(['']);
  }
  logOut(){
    this.mainService.logout();
    this.drop = false;
    this.loggedIn = false;

  }
  logIn(){
    this.userSignup.open();
    //this.router.navigate(['land']);
    this.drop = false;
  }
}
