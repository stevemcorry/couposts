import { Component, OnInit, ViewChild} from '@angular/core';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';
import { DealsService } from '../../services/deals.service';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { CarouselComponent } from '../../templates/carousel/carousel.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [
    MainService,
    DealsService,
  ]
})
export class UserProfileComponent implements OnInit {

  @ViewChild('modal')modal: ModalComponent;
  @ViewChild('confirmedModal')confirmedModal: ModalComponent;
  @ViewChild('acceptModal')acceptModal: ModalComponent;
  @ViewChild('deniedModal')deniedModal: ModalComponent;
  @ViewChild(CarouselComponent)carosel: CarouselComponent;

  uid;
  allDeals = [];
  confirmed = "confirmed";
  denied = "denied";
  waiting = "waiting";
  deal:any = {
    business: {},
    deal: {},
    dealStatus: {}
  };
  user:any = {};
  dealImages = [];
  dealsLoading = 'Loading...';
  needsVerify = false;
  gettingDeals = false;

  constructor(
    public mainService: MainService,
    public dealService: DealsService,
    public router: Router,
    //private ref:ChangeDetectorRef
  ) {
    this.uid = router.url.split('/')
    this.uid = this.uid[this.uid.length -1];
    this.mainService.getUser(this.uid).subscribe(res=>{
      this.allDeals = [];
      !res.insta ? this.needsVerify = true : this.setUser(res);
      res.deals ? this.getDeals(res.deals) : this.dealsLoading = 'No deals yet!';
    });
  }

  ngOnInit() {
  }
  setUser(res){
    this.user = {
      userInsta: res.insta.username,
      followers: res.insta.counts.followed_by,
    }
  }
  resetFilters(){
    this.confirmed = "confirmed";
    this.denied = "denied";
    this.waiting = "waiting";
  }
  log(){
    console.log(this.confirmed)
  }
  getDeals(deals){
    if(this.gettingDeals){
      return;
    }
    this.gettingDeals = true;
    this.allDeals = [];
    let dealArr = [];
    this.resetFilters();
    dealArr = this.getValidDeals(deals);
    for(let i = 0; i < dealArr.length; i++){
      this.getDeal(dealArr[i]).then(res=>{
        this.allDeals.push(res);
        if(dealArr[i].confirmed){
          this.confirmed+= "s";
        }
        if(dealArr[i].denied){
          this.denied+= "s";
        }
        if(!dealArr[i].confirmed && !dealArr[i].denied){
          this.waiting+= "s";
        }
        if(dealArr.length - 1 == i){
          this.gettingDeals = false;
          if(!this.allDeals[0]){
            this.dealsLoading = "No more deals!"}
          }
      })
    }
  }
  getDeal(deal){
    return new Promise(((res)=>{
      this.dealService.getDeal(deal.key).subscribe(data=>{
        let dealObj: any = {
          business: data.business,
          deal: data.deal,
          imgs: data.imgs,
        }
        //dealObj.firstImage = data.imgs[Object.keys(data.imgs)[0]];
        dealObj.dealStatus = deal;
        res(dealObj);
      })
    }))
  }
  getValidDeals(deals){
    let dealsArr = [];
    for(let deal in deals){
      if(!deals[deal].redeemed){
        deals[deal].key = deal;
        dealsArr.push(deals[deal]);
      }
    }
    return dealsArr;
  }
  verifyInsta(){
    this.mainService.instaLogin();
  }

  open(deal){
    this.deal = deal;
    this.setImages(deal.imgs);
    this.carosel.carouselPos = 'translateX(0px)';
    this.modal.open();
  }
  openConfirm(deal){
    this.acceptModal.close();
    this.deal = deal;
    this.confirmedModal.open();
  }
  openDenied(deal){
    this.deal = deal;
    this.setImages(deal.imgs);
    this.carosel.carouselPos = 'translateX(0px)';
    this.deniedModal.open();
  }
  repost(deal){
    this.dealService.repostDeal(this.uid, deal.dealStatus.key).then(res=>{
      this.deniedModal.close();
    });
    window.open("http://instagram.com", "_blank");
  }
  setImages(imgs){
    this.dealImages = [];
    for(let img in imgs){
      this.dealImages.push(imgs[img]);
    }
  }
  getDeniedExpiration(date){
    !date ? date = new Date().toISOString() : "";
    let format = new Date(date);
    format.setDate(format.getDate() + 2);
    date = format.toDateString();
    return date.slice(0,date.length-4);
  }
  getExpiration(date){
    !date ? date = new Date().toISOString() : "";
    let format = new Date(date);
    format.setDate(format.getDate() + 7);
    date = format.toDateString();
    return date.slice(0,date.length-4);
  }
  redeem(){
    this.confirmedModal.close();
    this.acceptModal.open();
  }
  accept(){
    this.acceptModal.close();
    let deal = this.deal.dealStatus;
    let key = this.deal.dealStatus.key;
    delete this.deal.dealStatus.key;
    deal.redeemed = true;
    deal.timeRedeemed = new Date().toISOString();

    this.dealService.editUserDeal(this.uid, key, deal).then(res=>{
      this.user.timeRedeemed = new Date().toISOString();
      let userDeal = {
        key: key,
        deal: this.deal.dealStatus
      }
      this.dealService.dealRedeem(key, this.user, this.uid, userDeal).then(data=>{
      })
    })
  }
  emailCode(deal, key){
    let userCode,
      codes = deal.codes.codes,
      codeKey;
    for(let i = 0; i < codes.length; i++){
      if(this.uid == codes[i].user && !codes[i].used){
        console.log(codes[i], i);
        userCode = codes[i].value;
        codeKey = i;
        break;
      }
    }
    let body = {
      email: "stevemcorry@gmail.com",
      code: userCode,
      body: "This is your code: " + userCode
    }
    this.dealService.emailCode(body).then(res=>{
      this.emailSent(codeKey, key);
    }).catch(err=>{
      if(err.status == 200){
        this.emailSent(codeKey, key);
      }
    })
  }
  copyCode(){
    
  }
  emailSent(codeKey, key){
    //mark the code as used if needs be
    this.dealService.useCode(codeKey, key).then(()=>{
      console.log('saved')
    })
  };

}
