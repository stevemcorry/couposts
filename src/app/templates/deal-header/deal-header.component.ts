import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DealsService } from '../../services/deals.service';

@Component({
  selector: 'app-deal-header',
  templateUrl: './deal-header.component.html',
  styleUrls: ['./deal-header.component.scss'],
  providers: [
    DealsService
  ]
})
export class DealHeaderComponent implements OnInit {

  @Output() close: EventEmitter<string> = new EventEmitter();
  @Input()deal: any = {
    business: {},
    deal: {}
  }
  @Input()profile;
  @Input()expiration;
  @Input()headerOff = false;

  constructor(
    private dealService: DealsService,
  ) { 

  }

  ngOnInit() {
  }
  closeModal(){
    this.close.emit();
  }
  websiteClick(business){
    let url = "";
    if (!/^http[s]?:\/\//.test(business.website)) 
    {
      url += 'http://';
    }
    url += business.website;
    window.open( url, "_blank");
    let obj = {
      time: new Date().toISOString(),
    }
    this.dealService.websiteVisit(business.id, obj).then(res=>{
      console.log('saved you dutch boi')
    })
  }
  instaClick(business){
    window.open("http://instagram.com/" + business.insta, "_blank");
    let obj = {
      time: new Date().toISOString(),
    }
    this.dealService.instaVisit(business.id, obj).then(res=>{
      console.log('saved you dutch boi')
    })
  }

}
