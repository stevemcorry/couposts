import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { UserSignupComponent } from '../user-signup/user-signup.component';
import { DealsService } from '../../services/deals.service';
import { MainService } from '../../services/main.service';
import { CarouselComponent } from '../../templates/carousel/carousel.component';

@Component({
  selector: 'app-deal-modal',
  templateUrl: './deal-modal.component.html',
  styleUrls: ['./deal-modal.component.scss'],
  providers: [
    MainService
  ]
})
export class DealModalComponent implements OnInit {

  @ViewChild(CarouselComponent)carosel: CarouselComponent;

  deal:any = {
    deal: {},
    business: {},
    imgs: {}
  };
  dealImages = [];
  carouselPos;
  carouselCheck = 0;
  users;
  //resizeWidth = this.getWidth();
  user;
  redeeming;

  @ViewChild('modal')modal: ModalComponent;
  @ViewChild('redeemModal')redeemModal: ModalComponent;
  @ViewChild(UserSignupComponent)userSignup;
  constructor(
    private auth: AngularFireAuth,
    private afData: AngularFireDatabase,
    private mainService: MainService,
    private dealService: DealsService,
  ) { 
    
  }

  ngOnInit() {
    this.afData.list('/users').subscribe(res=>{
      this.users = res;
      this.getUser(res);
    })
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
  open(deal){
    this.deal = deal;
    this.setImages(deal.imgs);
    this.modal.open();
    this.carosel.carouselPos = 'translateX(0px)';
    console.log(deal,'deal');
  }
  setImages(imgs){
    this.dealImages = [];
    for(let img in imgs){
      this.dealImages.push(imgs[img]);
    }
  }


  next(){
    let user = this.auth.auth.currentUser
    if(user){
      if(this.userCheck(user)){
        this.completeNext();
      }else{
        this.userLogin();
      }
    } else{
      this.userLogin()
    }
  }
  userCheck(user){
    for(let use of this.users){
      if(use.$key == user.uid){
        return true;
      }
    }
    return false;
  }
  userLogin(){
    this.modal.close();
    this.userSignup.open();
  }
  completeNext(){
    this.redeemModal.open();
    this.modal.close();
  }
  loggedIn(){
    this.completeNext();
    this.getUser(this.users);
  }
  redeem(){
    // if(this.redeeming){
    //   return;
    // }
    // this.redeeming = true;
    if(this.user){
      if(this.user.insta){
        if(this.user.insta.counts.followed_by >= 100){
          this.checkDeal();
        } else {
          this.showAlert('You must have more than 100 folowers to be able to use CouPosts. You can re-verify your account once you have 100 followers on your profile page!');
        }
      }else{
        this.showAlert('You need to verify your instagram before you can redeem deals. You can do that on your profile page!');
      }
    }
    else{
      this.userNotFound();
    }
    // this.dealService.addUserDeal(this.user.$key, this.deal.$key, deal);
    // this.dealService.redeemDeal(this.deal.$key, this.deal.deal.dealsLeft--);
    // this.redeemModal.close();
    
    // window.open("http://instagram.com", "_blank");
  }
  checkDeal(){
    for(let deal in this.user.deals){
      if(deal == this.deal.$key){
        this.showAlert('You have already redeemed this deal! It is under review. Thanks for your patience!');
        return;
      }
    }
    this.dealOk();
  }
  dealOk(){
    let deal= {
      timeClicked: this.getDate(),
      redeemed: false,
      confirmed: false,
      code: false,
      denied: false,
      deny_message: false,
      valid_until: false,
      expired: false,
    };
    if(this.deal.deal.codes.type){
      this.setCodes(this.deal.$key, this.user.$key);
    }
    this.dealService.addUserDeal(this.user.$key, this.deal.$key, deal);
    this.dealService.redeemDeal(this.deal.$key, this.deal.deal.dealsLeft- 1);
    this.redeemModal.close();
    window.open("http://instagram.com", "_blank");
  }
  setCodes(key,userKey){
    let codes = this.dealService.getCodes(key).subscribe((res)=>{
      for(let code of res){
        if(!code.user){
          let codeObj = {
            value: code.value,
            user: userKey
          }
          this.dealService.setUserDealCode(key, code.$key, codeObj);
          break;
        }
      }
    })
    codes.unsubscribe();
  }
  showAlert(x){
    alert(x);
    this.redeemModal.close();
  }
  userNotFound(){
    this.mainService.getLoggedInState().subscribe(res =>{
      if(res.uid){
        this.mainService.getUser(res.uid).subscribe(data=>{
          console.log(data,'user Not found');
        })
      }
    })
  }
  getDate(){
    let date = new Date().toISOString();
    return date;
  }
}
