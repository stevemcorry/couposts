import { Injectable } from '@angular/core';
//import { Router } from '@angular/router';
//import { Http, Headers } from '@angular/http';

// import {Observable} from 'rxjs/Rx';
// import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'firebase/storage'

@Injectable()
export class BusinessService {

  constructor(
    public afAuth: AngularFireAuth,
    public afData: AngularFireDatabase,
    //public router: Router,
    //public http: Http
  ) { }

  getBusinessProfile(id){
    let business:any = this.afData.object('/companies/'+id);
    return business;
  }
  editBusiness(uid, business){
    let userObj: FirebaseObjectObservable<any>;
    userObj = this.afData.object('companies/'+uid);
    return userObj.set(business);
  }
  getBusinessData(id){
    return this.afData.object('/companies/'+id);
    // .map(action =>{
    //     const data = action.payload.toJSON(); return data;
    //   })
  }

}
