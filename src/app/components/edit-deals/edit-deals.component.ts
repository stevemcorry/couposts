import { Component, OnInit, Input, ViewChild } from '@angular/core';
//import { MainService } from 'app/services/main.service';
import { UploadComponent } from 'app/modals/upload/upload.component';
import { DealsService } from 'app/services/deals.service';

import { UploadService } from '../../services/upload.service';
import { Upload } from '../../services/upload';
import * as _ from "lodash";

@Component({
  selector: 'app-edit-deals',
  templateUrl: './edit-deals.component.html',
  styleUrls: ['./edit-deals.component.scss'],
  providers: [
    //MainService,
    DealsService,
    UploadService,
  ]
})
export class EditDealsComponent implements OnInit {

  //@ViewChild(UploadComponent)uploadComponent;
  @Input()deal:any = {
    // dealTitle: '',
    // dealAmount: 0,
    // redeemOnline: false,
    // redeemInStore: false,
    // comment: ''
    dealPercentage: 50
  };
  @Input()business:any = {
    name: 'Loading...',
    about: "",
    url: ""
  };
  @Input()uid =  "";
  @Input()image =  "";
  selectedFiles: FileList;
  currentUpload: Upload;

  addModal;
  dealImages: any = [];
  newDealKey;
  carouselPos;
  carouselCheck = 0;
  stepCount = 3;
  selectAll = true;
  codes = [{value:'', used: false}];
  locationArr = [];

  constructor(
    //public mainService: MainService,
    public dealsService: DealsService,
    public upSvc: UploadService,
  ) { }

  ngOnInit() {
  }
  alert(x){
    alert(x);
  }
  nextStep(x){
    if(x == 2){
      if(this.deal.dealTitle){
        this.stepCount = 2;
      } else {
        alert('Please enter what you are discounting');
      }
    } else if(x == 3){
      if(this.selectedFiles || this.dealImages[0]){
        if(this.selectedFiles){
          if(this.selectedFiles.length){
              this.stepCount = 3;
          } else {
            alert('Please select your pictures');
          }
        }
      } else {
        alert('Please select your pictures');
      }
    } else if(x == 4){
      if(this.locationArr.length){
        for(let loc of this.locationArr){
          if(loc == true){
            this.stepCount = 4;
            return;
          }
        }
        alert('No location selected');
      } else{
        this.stepCount = 4;
      }
    }
  }

  openDeal(x){
    this.addModal = true;
    if(x){
      this.deal = x.deal;
      this.newDealKey = x.$key;
      this.getImages();
    } else {
      // this.dealsService.newDeal(this.uid, {}).then(res=>{
      //   this.newDealKey = res.key;
      //   this.getImages();
      // })
    }
  }
  // openAddDealImg(x){
  //   this.uploadComponent.openDeal();
  // }
  cancelNewDeal(){
    this.addModal = false;
    this.dealsService.cancelDeal(this.newDealKey);
    this.deal = {
      dealTitle: '',
      dealAmount: 0,
      redeemOnline: false,
      redeemInStore: false,
      comment: ''
    };
    this.dealImages = [];
  }
  closeNewDeal(){
    this.addModal = false;
    this.deal = {
      dealTitle: '',
      dealAmount: 0,
      redeemOnline: false,
      redeemInStore: false,
      comment: ''
    };
    this.dealImages = [];
    this.stepCount = 1;
    this.redeemType = false;
    this.deal.dealAmount = 0;
    this.codeType = 'universal';
    this.codes = [{value: '', used: false}];
    this.newDealKey = '';
  }
  getImages(){
    this.dealsService.getBusinessDealImages(this.newDealKey).subscribe(res=>{
      this.dealImages = res;
    })
  }
  selectAllFunction(){
    if(!this.selectAll){
      for(let i = 0; i < this.business.address.length; i++){
        this.locationArr[i] = true;
      }
    } else{
      for(let i = 0; i < this.business.address.length; i++){
        this.locationArr[i] = false;
      }
    }
    this.selectAll = !this.selectAll;
  }
  checkIndex(i){
    if(this.locationArr.length){
      if(this.locationArr[i]){
        return true;
      } else{
        return false;
      }
    } else {
      return true;
    }
  }
  editLocation(i){
    if(!this.locationArr.length){
      this.selectAll = false;
      for(let j = 0; j < this.business.address.length; j++){
        this.locationArr[j] = true;
      }
    }
    this.locationArr[i] = !this.locationArr[i];
  }

  //upload Images

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }
  uploadMulti(key) {
    this.upSvc.resetDealImages(this.uid, key);
    let files = this.selectedFiles
    let filesIndex = _.range(files.length)
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(files[idx]);
      this.upSvc.pushUploadDeal(this.currentUpload, key)}
    )
    this.checkDone();
  }
  checkDone(){
    if(this.currentUpload.progress === 100){
      setTimeout(()=>{
      },200)
    } else{
      setTimeout(()=>{
        this.checkDone()
        this.currentUpload.progress = 0;
      },200)
    }
  }

  //images

  carousel(){
    if(this.carouselCheck == this.dealImages.length - 1 || this.carouselCheck >= this.dealImages.length - 1){
      this.carouselPos = '';
      this.carouselCheck = 0
      return
    }
    this.carouselCheck += 1;
    this.carouselPos = 'translateX(' + -375 * this.carouselCheck + 'px)';
  }
  carouselLeft(){
    if(this.carouselCheck == 0){
      this.carouselPos = '';
      this.carouselCheck = this.dealImages.length
      this.carouselPos = 'translateX(' + -375 * (this.carouselCheck - 1) + 'px)';
      return
    }
    this.carouselCheck -= 1;
    this.carouselPos = 'translateX(' + -375 * this.carouselCheck + 'px)';
  }
  // enterCodes;
  // setCoupons(){
  //   this.enterCodes = true;
  //   // for(let i = 0; i < this.deal.dealAmount; i++){
  //   //   this.deal.coupons.push({})
  //   // }
  // }
  redeemType = false;
  codeType = 'universal';
  redeemCode(x){
    this.redeemType = x;
    this.setCodes();
  }
  codeSet(x){
    this.codeType = x;
  }
  setCodes(){
    this.codes = [];
    if(this.codeType == 'unique'){
      for(let i = 0; i < this.deal.dealAmount; i++){
        this.codes.push({value:"", used: false});
      }
    } else {
      this.codes = [{value:"", used: false}]
    }
  }
  saveDeal(){
    if(!this.deal.dealAmount){
      alert('Please enter how many deals you want to give');
      return;
    }
    let codes = {
      type: this.redeemType,
      codes: this.codes,
    };
    if(!this.deal.dealsLeft){
      this.deal.dealsLeft = this.deal.dealAmount;
    }
    if(!this.deal.dealsLeft){
      this.deal.dealsLeft = this.deal.dealAmount;
    }
    let deal = {
      dealTitle: this.deal.dealTitle,
      dealAmount: this.deal.dealAmount,
      dealsLeft: this.deal.dealsLeft,
      redeem: this.deal.redeem,
      comment: this.deal.comment,
      codes: codes,
      redeemType: this.redeemType
    };
    let business = {
      id: this.uid,
      name: this.business.name,
      about: this.business.about,
      photo: this.business.url,
      email: this.business.email,
      phone: this.business.phone,
      website: this.business.website,
      insta: this.business.insta
    }
    let push = {
      deal: deal,
      business: business
    };
    this.dealsService.newDeal(push).then(res=>{
      this.newDealKey = res.key;
      this.uploadMulti(res.key);
      alert('Deal Saved!');
      this.closeNewDeal();
      this.stepCount = 1;
      this.redeemType = false;
      this.deal.dealAmount = 0;
      this.codeType = 'universal';
      this.codes = [{value: '', used: false}];
      //this.enterCodes = false;
    }).catch(err=>{
      console.log(err)
    })
  }
  editDeal(){
    if(!this.deal.dealAmount){
      alert('Please enter how many deals you want to give');
      return;
    }
    let codes = {
      type: this.redeemType,
      codes: this.codes,
    };
    if(!this.deal.dealsLeft){
      if(this.deal.dealsLeft != 0){
        this.deal.dealsLeft = this.deal.dealAmount;
      }
    }
    let deal = {
      dealTitle: this.deal.dealTitle,
      dealAmount: this.deal.dealAmount,
      dealsLeft: this.deal.dealsLeft,
      redeem: this.deal.redeem,
      comment: this.deal.comment,
      codes: codes
    };
    let business = {
      id: this.uid,
      name: this.business.name,
      about: this.business.about,
      photo: this.business.url
    }
    this.dealsService.editDeal(deal, business, this.newDealKey).then(res=>{
      if(this.selectedFiles){
        if(this.selectedFiles.length){
          this.uploadMulti(this.newDealKey);
        }
      }
      alert('Deal Saved!');
      this.closeNewDeal();
      //this.enterCodes = false;
    }).catch(err=>{
      console.log(err)
    })
  }

}
