import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent implements OnInit {

  @Input()deal;
  @Input()home;
  @Input()time;
  @Input()previewImage;
  @Input()businessName;
  @Input()percentage;
  @Input()dealTitle;

  constructor() { }

  ngOnInit() {
  }
  getImage(){
    return this.deal.display? this.deal.display : this.deal.firstImage;
  }
  // checkTime(deal){
  //   if(deal.dealStatus){
  //     if(deal.dealStatus.timeConfirmed){
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // getExpiration(){
  //   let date = this.time;
  //   !date ? date = new Date().toISOString() : "";
  //   let format = new Date(date);
  //   format.setDate(format.getDate() + 7);
  //   date = format.toDateString();
  //   return date.slice(0,date.length-4);
  // }

}
