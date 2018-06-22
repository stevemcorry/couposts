import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from '../../services/main.service';
import { DealsService } from '../../services/deals.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [
    MainService,
    DealsService,
  ]
})
export class AdminComponent implements OnInit {


  @ViewChild('modal')modal: ModalComponent

  usersWith = [];
  denialMessage;
  one = false;
  two = false;
  three = false;
  four = false;
  denyDeal;
  denyKey;
  constructor(
    public mainService: MainService,
    public dealService: DealsService,
    public router: Router
  ) { }

  ngOnInit() {
    this.mainService.getLoggedInState().subscribe(res=>{
      if(res.uid){
        this.getUsers();
      } else if(!res){
        setTimeout(() => {
          this.getLoggedIn();
        }, 500);
      } else{
        this.router.navigate(['/']);
      }
    })
  }
  getLoggedIn(){
    this.mainService.getLoggedInState().subscribe(res=>{
      if(res.uid == "f0NiMru6f0Sd5aaIctnDCeg6Y8J2"){
        this.getUsers();
      } else{
        this.router.navigate(['/']);
      }
    })
  }
  getUsers(){
    this.mainService.getUsers().subscribe(res=>{
      this.usersWith = [];
      for(let user of res){
        if(user.deals){
          for(let deal in user.deals){
            if(!user.deals[deal].confirmed){
              if(!user.deals[deal].denied){
                this.usersWith.push(user);
                break;
              }
            }
          }
        }
      }
      this.formatDeals();
    })
  }
  denyOpen(deal, key){
    this.modal.open();
    this.denyDeal = deal;
    this.denyKey = key;
    console.log(deal,key);
  }
  setMessage(x){
    this.one = false;
    this.two = false;
    this.three = false;
    this.four = false;
    switch(x){
      case 1: 
        this.one = true;
        this.denialMessage = "We couldn't find your post";
        break;
      case 2: 
        this.two = true;
        this.denialMessage = "You must use the photos provided by the company";
        break;
      case 3: 
        this.three = true;
        this.denialMessage = "You must correctly link the business and Couposts";
        break;
      case 4: 
        this.four = true;
        this.denialMessage = "Please allow Couposts to follow you to verify your deal";
    }
  }
  formatDeals(){
    for(let user of this.usersWith){
      let deals = [];
      for(let deal in user.deals){
        if(!user.deals[deal].confirmed){
          if(!user.deals[deal].denied){
            this.dealService.getDeal(deal).subscribe(res=>{
              res.userDeal = user.deals[deal];
              deals.push(res);
            });
          }
        }
      }
      user.formatDeals = deals;
    }
  }
  confirmPost(deal, uid){
    let dealObj = deal.userDeal;
    console.log(deal,'userdeal', uid, 'key');
    if(deal.deal.codes.type){
      console.log('codes true');
      dealObj.code = this.getObjCode(deal.deal.codes.codes);
    }
    dealObj.confirmed = true;
    dealObj.timeConfirmed = new Date().toISOString();
    this.saveDeal(uid, deal.$key,dealObj);
  }
  getObjCode(codes){
    for(let code of codes){
      console.log(code);
      if(!code.redeemed){
        return code.value;
      }
    }
    return false;
  }
  denyPost(deal, uid){
    if(!this.denialMessage){
      alert('select a denial reason');
      return;
    }
    let dealObj = deal.userDeal;
    dealObj.denied = true;
    dealObj.timeDenied = new Date().toISOString();
    dealObj.deny_message = this.denialMessage;
    console.log(deal, uid, dealObj);
    this.dealService.denyUserPost(uid,deal.$key, dealObj).then(()=>{
      console.log('denied');
      this.denyDeal = "";
      this.denyKey = "";
      this.modal.close();
    })
  }
  saveDeal(uid, key, obj){
    console.log(uid,key,obj);
    this.dealService.editUserDeal(uid, key, obj).then(res=>{
      console.log('saved correctly you beautiful bastard')
    })
  }


}
