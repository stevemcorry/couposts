import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
//import {MainService} from '../../services/main.service';

import { Router } from '@angular/router';
import { DealsService } from 'app/services/deals.service';
@Component({
  selector: 'app-deal-edit',
  templateUrl: './deal-edit.component.html',
  styleUrls: ['./deal-edit.component.scss'],
  providers: [
    DealsService,
    //MainService
  ]
})
export class DealEditComponent implements OnInit {

  @Input()uid;
  instaOn;
  edit;
  fbOn;
  deal:any = {};

  @ViewChild('modal')modal: ModalComponent

  constructor(
    //public mainService: MainService,
    public dealsService: DealsService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  saveDeal(){
    console.log(this.deal)
    if(!this.deal.dealAmount){
      alert('Please select how many deals you want to give out')
      return;
    }
    if(!this.deal.dealTitle){
      alert('What deal do you want to give?')
      return;
    }
    if(!this.instaOn && !this.fbOn){
      alert('Please select a platform for the user to post on!');
      this.instaOn = true;
      this.fbOn = true;
      return;
    }
    if(!this.deal.dealsLeft){
      this.deal.dealsLeft = this.deal.dealAmount;
    }
    this.instaOn ? this.deal.insta = true : '';
    this.fbOn ? this.deal.facebook = true : '';
    this.dealsService.saveDeal(this.deal, this.uid, '').then(res=>{
      console.log(res)
      this.close();
    }).catch(err=>{
      console.log(err)
    })
  }
  editDeal(){
    console.log(this.deal)
    if(!this.deal.dealAmount){
      alert('Please select how many deals you want to give out')
      return;
    }
    if(!this.deal.dealTitle){
      alert('What deal do you want to give?')
      return;
    }
    if(!this.instaOn && !this.fbOn){
      alert('Please select a platform for the user to post on!');
      this.instaOn = true;
      this.fbOn = true;
      return;
    }
    if(!this.deal.dealsLeft){
      this.deal.dealsLeft = this.deal.dealAmount;
    }
    this.instaOn ? this.deal.insta = true : '';
    this.fbOn ? this.deal.facebook = true : '';
    this.dealsService.editDeal(this.deal, this.uid, this.deal.$key).then(res=>{
      console.log(res)
      this.close();
    }).catch(err=>{
      console.log(err)
    })
  }
  open(deal){
    deal ? this.edit = true : this.edit = false ;
    deal ? this.deal = deal : this.deal = deal = {};
    this.modal.open();
  }
  close(){
    this.modal.close()
  }

}
