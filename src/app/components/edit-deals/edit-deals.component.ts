import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
//import { MainService } from 'app/services/main.service';
import { UploadComponent } from 'app/modals/upload/upload.component';
import { DealsService } from 'app/services/deals.service';

import { UploadService } from '../../services/upload.service';
import { Upload } from '../../services/upload';
import * as _ from "lodash";
import { environment } from '../../../environments/environment';
import { PaymentService } from '../../payments/payment.service';

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
  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close()
  }
  @Output()closeDeal: EventEmitter<string> = new EventEmitter();
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
  selectedFile: FileList;
  currentUpload: Upload;

  today = new Date().toDateString();

  addModal;
  dealImages: any = [];
  newDealKey;
  carouselPos;
  carouselCheck = 0;
  stepCount = 1;
  selectAll = true;
  codes = [{value:'', used: false}];
  locationArr = [];

  payOptionType;
  customAmount;
  customAmountOn;
  savePlan;
  displayText = "Choose a file";
  displayTexts = "Choose your files";

  constructor(
    //public mainService: MainService,
    public dealsService: DealsService,
    public upSvc: UploadService,
    private paymentSvc: PaymentService
  ) { }

  ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: '../../../assets/Images/Couposts_$_Icon_LightBlue.png',
      locale: 'auto',
      token: token => {
        this.paymentSvc.processPayment(token, this.amount)
      }
    });
  }
  alert(x){
    alert(x);
  }
  nextStep(x){
    if(x == 1){
      this.stepCount = 1;
    }
    if(x >= 2){
      if(!this.deal.dealTitle){
        alert('Please enter what you are discounting');
        this.stepCount = 1;
        return;
      }
    }
    if(x >= 3){
      if(this.selectedFiles || this.dealImages[0]){
        if(this.selectedFiles){
          if(!this.selectedFiles.length){
            alert('Please select your pictures');
            this.stepCount = 2;
            return;
          }
        } else if(this.dealImages[0]){
          //this.stepCount = 3;
        }
      } else {
        alert('Please select your pictures');
        this.stepCount = 2;
        return;
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
    } else if(x == 5){
      //Check payment and # of deals
      if(this.payOptionType == 'go'){
        if(this.deal.dealAmount){

        }else{
          alert('Please enter the number of deals you want to give');
          return;
        }
      } else if(this.payOptionType == 'save') {
        //check to see if plan is selected of custom ammount entered
        if(this.savePlan){
          if(this.savePlan == 4){
            if(!this.deal.dealAmount){
              alert('Please enter the amount of deals you want to give');
              return;
            }
          } else {
            this.stepCount = 5;
          }
        } else{
          alert('Please choose a plan');
          return;
        }
      }
      this.stepCount = 5;
    } else if(x == 6){
      //check the codes
      this.stepCount = 6;
    } else if(x == 7){
      //check to see if contract and info was entered
      this.stepCount = 7;
    }
    this.stepCount = x;
  }


  //Step One

  previewImage:any;
  detectFile(event) {
    this.previewImage = '';
    this.previewImage = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewImage = e.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
    
    let file = event.target.files[0];
    if(file.name){ 
      this.displayText = file.name;
    } else {

      this.displayText = "Choose your file";
    }
    this.selectedFile = event.target.files;
  }

  //Step Two
  previewImages: any = [];
  detectFiles(event) {
    this.previewImages = [];
    for(let i = 0; i <  event.target.files.length; i++){
      let x = event.target.files[i];
      this.previewImages.push(x);
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImages[i] = e.target.result;
      }
      reader.readAsDataURL(event.target.files[i]);
    }

    let files = event.target.files;
    if(files.length > 1){
      this.displayTexts = files.length + " Files selected";
    } else if(files[0]) {
      this.displayTexts = files[0].name;
    } else {
      this.displayTexts = "Choose your files";
    }
    this.selectedFiles = event.target.files;
  }


  //step 5

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

  redeemType = false;
  codeType = 'universal';
  redeemCode(x){
    this.redeemType = x;
    this.codeSet(x);
    this.setCodes();
  }

  dealExpires;
  expirationDate;
  checkStepFive(){
    if(this.redeemType === false || (this.codes[0] && this.codes[0].value ) ){
      if((!this.dealExpires || this.expirationDate)){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }


  //step 7

  handler: any;
  amount = 500;
  handlePayment() {
    this.handler.open({
      name: 'FireStarter',
      excerpt: 'Deposit Funds to Account',
      amount: this.amount
    });
  }



  payOption(x){
    this.payOptionType = x;
  }
  setSavePlan(x){
    this.customAmountOn = false;
    this.savePlan = x;
    switch(x){
      case 1:
        this.deal.dealAmount = 20;
        break;
      case 2:
        this.deal.dealAmount = 50;
        break;
      case 3:
        this.deal.dealAmount = 100;
        break;
      case 4:
        this.customAmountOn = true;
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
      comment: '',
      dealPercentage: 50
    };
    this.dealImages = [];
    this.stepCount = 1;
    this.redeemType = false;
    this.deal.dealAmount = 0;
    this.codeType = 'universal';
    this.codes = [{value: '', used: false}];
    this.newDealKey = '';
    this.closeDeal.emit();
  }
  getImages(){
    this.dealsService.getBusinessDealImages(this.newDealKey).subscribe(res=>{
      this.dealImages = [];
      for(let img of res){
        this.dealImages.push(img.$value);
      }
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
  uploadDisplay(key) {
    this.upSvc.resetDealImages(this.uid, key);
    let files = this.selectedFile
    let filesIndex = _.range(files.length)
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(files[idx]);
      this.upSvc.pushUploadDeal(this.currentUpload, key)}
    )
    this.checkDone();
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
  // enterCodes;
  // setCoupons(){
  //   this.enterCodes = true;
  //   // for(let i = 0; i < this.deal.dealAmount; i++){
  //   //   this.deal.coupons.push({})
  //   // }
  // }

  calcSavePrice(x){
    if(x < 20){
      this.customAmount = x * 5;
    } else if(x >= 20 && x < 50){
      this.customAmount = x * 4.5;
    } else if(x >= 50 && x < 100){
      this.customAmount = x * 4;
    } else if(x >= 100){
      this.customAmount = x * 3;
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
