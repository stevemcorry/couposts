import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from '../../services/main.service';
import { UploadComponent } from '../../modals/upload/upload.component';
// import { DealEditComponent } from '../../modals/deal-edit/deal-edit.component';

import { Router } from '@angular/router';
import { EditDealsComponent } from 'app/components/edit-deals/edit-deals.component';
import { BusinessService } from 'app/services/business.service';
import { DealsService } from 'app/services/deals.service';
import { WelcomeBusinessModalComponent } from '../../modals/welcome-business-modal/welcome-business-modal.component';
import { BusinessWebsiteModalComponent } from '../../modals/business-website-modal/business-website-modal.component';
import { BusinessLocationsModalComponent } from '../../modals/business-locations-modal/business-locations-modal.component';
import { BusinessUploadModalComponent } from '../../modals/business-upload-modal/business-upload-modal.component';
import { BusinessFinishModalComponent } from '../../modals/business-finish-modal/business-finish-modal.component';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.scss'],
  providers: [
    MainService,
    BusinessService,
    DealsService
  ]
})
export class BusinessProfileComponent implements OnInit {

  @ViewChild(UploadComponent)uploadComponent;
  @ViewChild(EditDealsComponent)editDeals;
  @ViewChild(WelcomeBusinessModalComponent)welcomeModal;
  @ViewChild(BusinessWebsiteModalComponent)websiteModal;
  @ViewChild(BusinessLocationsModalComponent)locationModal;
  @ViewChild(BusinessUploadModalComponent)uploadModal;
  @ViewChild(BusinessFinishModalComponent)finishModal;

  mask: any[] = ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  uid;
  userAbout;
  enterCodes:boolean;
  url;
  arrowOn;
  showEdit = false;
  business:any = {};
  deal = {
    dealTitle: '',
    dealAmount: 0,
    redeemOnline: false,
    redeemInStore: false,
    coupons: [{}]
  }
  deals = [];
  dealImages = [0];
  dealsLoading = "Loading Deals...";
  editDeal;
  edit: boolean;
  editOn: boolean;
  image;
  couponDeals = [];
  counter = this.deal.dealAmount;
  imgHover;
  aboutModalOn;
  websiteModalOn;
  industryModalOn;
  locationModalOn;
  uploadModalOn;

  constructor(
    public mainService: MainService,
    public dealsService: DealsService,
    public businessService: BusinessService,
    public router: Router,
  ) {
    this.url = router.url.split('/')
    this.url = this.url[this.url.length -1];
    this.mainService.getLoggedInState().subscribe(res=>{
      if(res){
        this.uid = res.uid;
      }
      this.getProfile();
    })
  }

  getProfile(){
    let dataSub = this.businessService.getBusinessData(this.url).subscribe(result =>{
      if(this.uid === result.key){
        this.editOn = true;
      }
      dataSub.unsubscribe();
    })
    let profileSub = this.businessService.getBusinessProfile(this.url).subscribe(data=>{
      this.image = data.url;
      this.business = data;
      if(this.uid === data.$key){
        this.editOn = true;
        //this.openDeal('');
      }
      profileSub.unsubscribe();
    },error=>{
      console.log(error,'error')
    })
    let listings;
    this.dealsService.getBusinessDeals(this.url).subscribe(res =>{
      this.deals = [];
      for(let deal of res){
        if(deal.business.id == this.url){
          let imgs = [];
          for(let img in deal.imgs){
            imgs.push(deal.imgs[img]);
          }
          deal.imgs = imgs;
          this.deals.push(deal)
        }
      }
      if(!this.deals[0]){
        this.dealsLoading = "No couposts created yet! Click below to create a coupost!";
      }
    });
  }
  log(x){
    console.log(x)
  }
  checkBusiness(data){
    console.log(data)
    let industryCheck = 0;
    for(let i in data.industry){
      industryCheck++;
    }
    data.about ? this.aboutModalOn = true : '';
    //data.website ? this.websiteModalOn = true : '';
    industryCheck ? this.industryModalOn = true : '';
    data.address ? this.locationModalOn = true : '';
    data.url ? this.uploadModalOn = true : '';
    if(!data.about){
      this.welcomeModal.open();
      return false;
    } 
    // else if(!data.website || !industryCheck){
    //   this.websiteModal.open();
    //   return false;
    // } 
    else if(!data.address && data.onlineOnly !== true){
      this.locationModal.open();
      return false;
    } else if(!data.url){
      this.uploadModal.open();
      return false;
    } else {
      return true;
    }
  }
  aboutSaved(event){
    if(event){
      this.business.about = event;
      this.saveEdit();
    }
    if(!this.industryModalOn || !this.websiteModalOn){
      this.websiteModal.open();
    } else if(!this.locationModalOn){
      this.locationModal.open()
    } else if(!this.uploadModalOn){
      this.uploadModal.open()
    }
  }
  websiteSaved(event){
    let obj = JSON.parse(event);
    let industryCheck = 0;
    if(obj.website){
      this.business.website = obj.website;
    }
    for(let i in obj.industry){
      industryCheck++;
    }
    if(industryCheck){
      this.business.industry = obj.industry;
    }
    if(industryCheck || obj.website){
      this.saveEdit();
    }
    if(!this.locationModalOn){
      this.locationModal.open()
    } else if(!this.uploadModalOn){
      this.uploadModal.open()
    }
  }
  locationSaved(event){
    let obj = JSON.parse(event);
    console.log(obj);
    if(obj == 'online'){
      this.business.onlineOnly = true;
      this.saveEdit();
    } else if(obj[0]){
      this.business.address = obj;
      this.saveEdit();
    }
    // if(!this.uploadModalOn){
    //   this.uploadModal.open();
    // }
  }
  uploadSaved(event){
    let profileSub = this.businessService.getBusinessProfile(this.url).subscribe(data=>{
      if(!data.url){
        setTimeout(()=>{
          this.uploadSaved('');
        }, 500)
        profileSub.unsubscribe();
        return;
      }
      this.image = data.url;
      this.business = data;
      if(this.uid === data.$key){
        this.editOn = true;
      }
      profileSub.unsubscribe();
    },error=>{
      console.log(error,'error')
    })
  }
  finish(){
    console.log('finished');
  }
  saveEdit(){
    let business = {
      name: this.business.name,
      phone: this.business.phone,
      email: this.business.email,
      website: this.business.website,
      about: this.business.about,
      industry: this.business.industry,
      address: this.business.address
    }
    this.businessService.editBusiness(this.url, this.business).then(res=>{
      this.edit = false;
    },err =>{
      console.log(err, 'er')
    }).catch(err=>{
      console.log(err,'er')
    })
  }
  imgHoverCheck(x){
    if(this.editOn){
      this.imgHover = x;
    }
  }
  openUpload(){
    if(!this.editOn){return}
    this.uploadComponent.open();
  }
  ngOnInit() {
    //this.getProfile();
  }
  openDeal(x){
    if(!this.editOn){return}
    if(this.checkBusiness(this.business)){
      this.editDeals.openDeal(x);
    }
    setTimeout(()=>{
      this.showEdit = true;
    }, 500)
  }
  mobileBusinessInfo = true;
  mobileCoupostCreator;
  mobileAnalytics;
  setMobileView(x){
    this.mobileBusinessInfo = false;
    this.mobileCoupostCreator = false;
    this.mobileAnalytics = false;
    if(x == 'info'){
      this.mobileBusinessInfo = true;
    } else if(x == 'couposts'){
      this.mobileCoupostCreator = true;
    } else {
      this.mobileAnalytics = true;
    }
  }

}
