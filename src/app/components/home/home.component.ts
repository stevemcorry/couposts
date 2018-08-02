import { Component, OnInit, HostListener, ViewChild } from '@angular/core';

//import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';
import { DealsService } from 'app/services/deals.service';
import { DealModalComponent } from '../../modals/deal-modal/deal-modal.component';
import { UserSignupComponent } from '../../modals/user-signup/user-signup.component';

import { AngularFireAuth } from 'angularfire2/auth';
import { UserDemoComponent } from '../../modals/user-demo/user-demo.component';
import { VerifyInstaModalComponent } from '../../modals/verify-insta-modal/verify-insta-modal.component';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    //MainService
    DealsService,
  ]
})
export class HomeComponent implements OnInit {

  @ViewChild(UserSignupComponent)userSignup;
  @ViewChild(UserDemoComponent)userdemo;
  @ViewChild(VerifyInstaModalComponent)verifyComponent;

  deals:any = [
    // {
    //   deal: {},
    //   business: {}
    // }
  ];
  homeSubtitles: [
    "These are the couposts you qualify for!",
    "Find the perfect deal for you!",
    "Where it's black friday every day!",
    "Post about businesses and return for deals!"
  ];
  dealsLoading = "Loading...";
  loadingProgress = "";
  loadingTimer;
  users;
  user:any = {};

  @ViewChild(DealModalComponent)dealModal: DealModalComponent;
  constructor(
    //private mainService: MainService,
    private dealsService: DealsService,
    public router: Router,
    private auth: AngularFireAuth,
  ) {
    this.getDeals();
   }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    let height = $(window).scrollTop();
      document.getElementById('mainDisplay').style.opacity = this.returnOpacString(height);
      document.getElementById('mainDisplay').style.transform = this.returnTranslateString(height)
  }

  loadingCount(){
    switch(this.loadingProgress){
      case "":
        this.loadingProgress = "s";
        break;
      case "s":
        this.loadingProgress = "L";
        break;
      case "L":
        this.loadingProgress = "o";
        break;
      case "o":
        this.loadingProgress = "a";
        break;
      case "a":
        this.loadingProgress = "d";
        break;
      case "d":
        this.loadingProgress = "i";
        break;
      case "i":
        this.loadingProgress = "n";
        break;
      case "n":
        this.loadingProgress = "g";
        break;
      case "g":
        this.loadingProgress = ".";
        break;
      case ".":
        this.loadingProgress = ",";
        break;
      case ",":
        this.loadingProgress = "/";
        break;
      case "/":
        this.loadingProgress = "L";
        break;
    }
    this.loadingTimer = setTimeout(()=>{
      this.loadingCount();
    },700)
  }

  returnOpacString(height){
    if(height > 100){
      let opac:any
      opac = 50/(height-100);
      opac = opac.toString();
      return opac;
    } else {
      return 1;
    }
  }

  returnTranslateString(height){
    return "translateY(-" + height/3 + "px)";
  }
  
  goToSignup(){
    this.router.navigate(['signup']);
  }
  getStarted(){
      this.userSignup.open();
  }
  getDeals(){
    let listings = [];
    this.dealsService.getDeals().subscribe(res=>{
      if(!res[0]){
        this.dealsLoading = "No deals right now!"
      }
      this.deals = res;
      //this.formatDeals();
    })
  }
  loggedIn(){
    this.userdemo.open();
    this.getUser(this.users);
  }
  demoSaved(){
    this.verifyComponent.open();
  }
  instaVerified(){
    //this.completeNext();
    this.getUser(this.users);
  }
  getUser(res){
    for(let user of res){
      if(this.auth.auth.currentUser){
        if(user.$key == this.auth.auth.currentUser.uid){
          this.user = user;
        }
      }
    }
  }
  // formatDeals(){
  //   for(let deal of this.deals){
  //     if(deal.imgs){
  //       deal.firstImage = deal.imgs[Object.keys(deal.imgs)[0]];
  //     }
  //   }
  //  }
  // dealImg(img){
  //   //console.log(img)
  //   if(img){
  //     for(let x in img){
  //       return img[x]
  //     }
  //   } else {
  //     return '';
  //   }
  // }
  open(deal){
    this.dealModal.open(deal);
  }



  ngOnInit() {
    this.loadingCount();
  }

}
