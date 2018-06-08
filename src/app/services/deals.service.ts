import { Injectable } from '@angular/core';
//import { Router } from '@angular/router';
//import { Http, Headers } from '@angular/http';

// import {Observable} from 'rxjs/Rx';
// import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/toPromise';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'firebase/storage'

@Injectable()
export class DealsService {

  url = 'https://us-central1-coupost-7fc1b.cloudfunctions.net/';

  constructor(
    public afAuth: AngularFireAuth,
    public afData: AngularFireDatabase,
    private httpClient: HttpClient
    //public router: Router,
    //public http: Http
  ) { }

  //GET

  getBusinessDeals(uid){
    //let deal: AngularFireList<any>;
    let deal:any = this.afData.list('deals');
    // deal.subscribe(res=>{
    //   for(let deal of res){
    //     if(deal.user == uid){
    //       console.log(deal,'good Deal')
    //     }
    //   }
    // });
    return deal;
  }
  getBusinessDealImages(key){
    let compObj = this.afData.list('deals/'+ key + '/imgs');
    return compObj;
  }
  getDeals(){
    //let compObj: AngularFireList<any>;
    let compObj:any = this.afData.list('deals');
    return compObj;
  }
  getDeal(key){
    let dealObj: FirebaseObjectObservable<any>;
    dealObj = this.afData.object('deals/' + key);
    return dealObj;
  }
  getCodes(key){
    let dealList: FirebaseListObservable<any>;
    dealList = this.afData.list('deals/' + key + '/deal/codes/codes');
    return dealList;
  }

  //POST / PUT
  
  newDeal(deal){
    let currentUserObj: FirebaseListObservable<any> = this.afData.list('deals');
    return currentUserObj.push(deal);
  }
  saveDeal(deal, uid, key){
    let dealList: FirebaseListObservable<any>;
    dealList = this.afData.list('deals/'+ uid + "/" +  key);
    return dealList.set('deal', deal);
  }
  editDeal(deal, business, key){
    let dealObj: FirebaseObjectObservable<any>;
    dealObj = this.afData.object('deals/'+key+"/deal");
    let businessObj: FirebaseObjectObservable<any>;
    businessObj = this.afData.object('deals/'+key+"/business");
    return businessObj.set(business);
  }
  dealRedeem(key, deal, userKey, userDeal){
    console.log('dealRedeem')
    if(!userKey || !key){return}
    let dealList: FirebaseListObservable<any>;
    dealList = this.afData.list('deals/'+  key + '/redeemed');
    dealList.push(deal);

    
    let userDealList: FirebaseListObservable<any>;
    userDealList = this.afData.list('users/'+  userKey + '/redeemed');
    userDealList.push(userDeal);

    let dealObject: FirebaseObjectObservable<any>;
    dealObject = this.afData.object('users/'+  userKey + '/deals/' + key);
    return dealObject.remove();
  }
  redeemDeal(key,value){
    console.log(value, key);
    let dealObj: FirebaseObjectObservable<any>;
    dealObj = this.afData.object('deals/'+key+"/deal/dealsLeft");
    dealObj.set(value);
  }
  addUserDeal(uid, key, deal){
    let dealObj: FirebaseObjectObservable<any>;
    dealObj = this.afData.object('users/' + uid + '/deals/' + key);
    dealObj.set(deal);
  }
  editUserDeal(uid, key, deal){
    if(!uid || !key || !deal){return}
    let dealObj: FirebaseObjectObservable<any>;
    dealObj = this.afData.object('users/' + uid + '/deals/' + key);
    return dealObj.set(deal);
  }
  denyUserPost(uid, key, deal){
    if(!uid || !key || !deal){return}
    let dealObj: FirebaseObjectObservable<any>;
    dealObj = this.afData.object('users/' + uid + '/deals/' + key);
    return dealObj.set(deal);
  }
  setUserDealCode(key, codeKey, codeObj){
    if(!codeKey || !key){return}
    let dealObj: FirebaseObjectObservable<any>;
    dealObj = this.afData.object('deals/' + key + '/deal/codes/codes/' + codeKey);
    return dealObj.set(codeObj);
  }
  repostDeal(userKey, key){
    let countObj: FirebaseObjectObservable<any>;
    countObj = this.afData.object('users/' + userKey + '/deals/' + key + 
  '/denied');
    return countObj.set(false);
  }
  useCode(codeKey, key){
    let countObj: FirebaseObjectObservable<any>;
    countObj = this.afData.object('deals/' + key + '/deal/codes/codes/' + codeKey + 
  '/used');
    return countObj.set(true);
  }
  websiteVisit(uid, obj){
    let countList: FirebaseListObservable<any>;
    countList = this.afData.list('companies/' + uid + '/webClicks');
    return countList.push(obj);
  }
  instaVisit(uid, obj){
    let countList: FirebaseListObservable<any>;
    countList = this.afData.list('companies/' + uid + '/instaClicks');
    return countList.push(obj);
  }
  emailCode(body){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.httpClient.post( this.url + 'sendCode', body, {headers: headers})
    .toPromise()
  }
  emailDenial(body){
    let headers:any = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.httpClient.post( this.url + 'sendDenial', body, {headers: headers})
    .toPromise()
  }
  emailConfirmation(body){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.httpClient.post( this.url + 'sendConfirmation', body, {headers: headers}
    ).toPromise()
  }

  //Delete

  cancelDeal(key){
    let currentUserObj: FirebaseListObservable<any> = this.afData.list('deals/'+ key);
    return currentUserObj.remove();
  }

}
