import { Component, OnInit, HostListener, ViewChild } from '@angular/core';

//import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';
import { DealsService } from 'app/services/deals.service';
import { DealModalComponent } from '../../modals/deal-modal/deal-modal.component';

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
  @ViewChild(DealModalComponent)dealModal: DealModalComponent;
  constructor(
    //private mainService: MainService,
    private dealsService: DealsService,
    public router: Router
  ) {
    this.getDeals();
   }
  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    let height = $(window).scrollTop();
      document.getElementById('mainDisplay').style.opacity = this.returnOpacString(height);
      document.getElementById('mainDisplay').style.transform = this.returnTranslateString(height)
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
  getDeals(){
    let listings = [];
    this.dealsService.getDeals().subscribe(res=>{
      if(!res[0]){
        this.dealsLoading = "No deals right now!"
      }
      this.deals = res;
      this.formatDeals();
    })
  }
  formatDeals(){
    for(let deal of this.deals){
      if(deal.imgs){
        deal.firstImage = deal.imgs[Object.keys(deal.imgs)[0]];
      }
    }
   }
   dealImg(img){
     //console.log(img)
     if(img){
       for(let x in img){
         return img[x]
        }
     } else {
       return '';
     }
   }
  open(deal){
    this.dealModal.open(deal);
  }



  ngOnInit() {
  }

}
