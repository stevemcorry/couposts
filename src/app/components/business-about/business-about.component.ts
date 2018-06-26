import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { NotificationsService } from 'angular2-notifications-lite';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-business-about',
  templateUrl: './business-about.component.html',
  styleUrls: ['./business-about.component.scss'],
  providers: [MainService]
})
export class BusinessAboutComponent implements OnInit {

  mask: any[] = ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  business = {
    name: '',
    email:'',
    phone: '',
    website: '',
    address: '',
    insta: ''
  };
  password;
  repassword
  businessId;
  inputOn = false;

  options = {
    position: ["bottom", "right"],
    timeOut: 5000,
    lastOnBottom: true,
    showProgressBar: false,
  }

  constructor(
    public mainService: MainService,
    public route: ActivatedRoute,
    public router: Router,
    private toastService: NotificationsService
  ) {
    this.route.queryParams.subscribe(res=>{
      this.businessId = res.id;
      this.getBusiness(this.businessId);
    })
   }

  ngOnInit() {
  }
  getBusiness(id){
    // let listings = [];
    // this.mainService.getSignup(id).map(action =>{
    //   const data = action.payload.toJSON(); return data;
    // }).subscribe(result =>{
    //   // listings = [];
    //   Object.keys(result).map(key=>{
    //     console.log(result, key, 'key result')
    //     // listings.push({ 'key': key, 'data':result[key] });
    //   }); 
    // })
    this.mainService.getSignup(id).subscribe(res=>{
      this.business.name = res.name;
    },err=>{
      console.log(err,'err')
    })
  }
  checkText(){
    if(this.business.insta.includes('@')){
      let toast = this.toastService.error('Dont include @','_', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });

      this.business.insta = "";
    }
  }
  signUp(){
    if(!this.business.name){
      alert('Please enter your name');
      return
    }
    // if(!this.business.address || !this.business.address){
    //   alert('Please enter an address or website')
    //   return
    // }
    if(!this.business.insta){
      alert('Please enter your instagram username so users can tag you.')
      return
    }
    // if(!this.business.phone){
    //   alert('Please enter your phone');
    //   return
    // }
    if(!this.business.email){
      alert('Please enter your email');
      return
    }
    if(!this.password){
      alert('Please enter your password');
      return
    }
    if(this.password === this.repassword){
      this.mainService.signUpBusiness(this.business.email, this.password).then(res=>{
        this.addBusiness(res.uid);
        this.router.navigate(['businessprofile/'+ res.uid])
      }).catch(err=>{
        console.log(err,'err')
        alert(err.message);
      })
    } else{
      alert('Passwords do not match')
    }
  }
  addBusiness(id){
    this.mainService.addBusiness(this.business, id).then(res=>{
    }).catch(err=>{
      console.log(err,'err')
      alert('There was an error updating your info.')
    })
  }
  scrollTop(){
    window.scrollTo(0, 0);
    this.inputOn = true;
    setTimeout(() => {
      this.inputOn = false;
    }, 500);
  }
  home(){
    this.router.navigate(['']);
  }

}
