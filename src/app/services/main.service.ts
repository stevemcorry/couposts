import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'firebase/storage'

@Injectable()
export class MainService {

  constructor(
    public afAuth: AngularFireAuth,
    public afData: AngularFireDatabase,
    public router: Router,
    public http: Http
  ) { }

  access = '?access_token='

  //GET
  getLoggedInState(){
    return this.afAuth.authState
  }
  getLoggedInUser(){
    return this.afAuth.auth.currentUser;
  }
  getSignup(id){
    //let business: FirebaseObjectObservable<any>;
    let business:any = this.afData.object('/signups/'+id);
    return business;
  }
  getUser(uid){
    let userObj: FirebaseObjectObservable<any>;
    userObj = this.afData.object('users/' + uid);
    return userObj;
  }
  getUsers(){
    let userObj: FirebaseListObservable<any>;
    userObj = this.afData.list('/users');
    return userObj;
  }

  //POST

  addBusiness(comp,id){
    let compObj: FirebaseObjectObservable<any>;
    compObj = this.afData.object('companies/'+id);
    return compObj.set(comp)
  }
  saveSignup(comp){
    //let compObj: FirebaseListObservable<any>;
    let compObj = this.afData.list('signups');
    return compObj.push(comp)
  }
  saveUser(user, uid){
    let userObj: FirebaseObjectObservable<any>;
    userObj = this.afData.object('users/' + uid);
    return userObj.set(user)
  }
  signUpBusiness(email, password){
    return this.afAuth.auth.createUserWithEmailAndPassword(email,password)
  }
  facebookLogin(){
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('publish_actions');
    firebase.auth().signInWithPopup(provider).then((result) => {
      console.log(result)
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      //var token = result.credential.accessToken;
      // The signed-in user info.
      //var user = result.user;
    }).catch(function(error) {
      // Handle Errors here.
      console.log(error)
    });
  }
  facebookPostPicture(){
    
  }
  instaLogin(){
    // window.location.href =
    // "https://api.instagram.com/oauth/authorize/?client_id=240fc475ad0e43d383570dd87398fa43&redirect_uri=http://localhost:4000/auth/&response_type=code"

    window.location.href =
    "https://api.instagram.com/oauth/authorize/?client_id=240fc475ad0e43d383570dd87398fa43&redirect_uri=http://localhost:4000/auth/&response_type=token"

    // window.location.href =
    // "https://api.instagram.com/oauth/authorize/?client_id=240fc475ad0e43d383570dd87398fa43&redirect_uri=http://coupost-7fc1b.firebaseapp.com/auth&response_type=code"

    // window.location.href =
    // "https://api.instagram.com/oauth/authorize/?client_id=240fc475ad0e43d383570dd87398fa43&redirect_uri=http://coupost-7fc1b.firebaseapp.com/auth&response_type=token"
    
  }
  instaAccess(code){
    return this.http.get(`https://api.instagram.com/v1/users/self`+ this.access + code)
      .map(data => data.json())
  }
  // instaStories(code){
  //   const authHeader = new Headers();
  //   authHeader.append('Authorization', `Bearer ${token}`);
  //   return this.http.get(`https://i.instagram.com/api/v1/feed/reels_tray/`+ this.access + code)
  //     .map(data => data.json())
  // }
  updateUserInsta(user, uid){
    if(!uid){
      alert('There was a problem saving your data, please try again');
      return;
    }
    //let uid = this.afAuth.auth.currentUser.uid;
    console.log(uid,'uiddd');
    let userObj: FirebaseObjectObservable<any>;
    userObj = this.afData.object('users/' + uid + "/insta");
    return userObj.set(user)
  }
  signIn(email, pass){
    return this.afAuth.auth.signInWithEmailAndPassword(email,pass);
  }
  logout(){
    this.afAuth.auth.signOut().then(res=>{
      this.router.navigate(['/'])
    });
  }


}
