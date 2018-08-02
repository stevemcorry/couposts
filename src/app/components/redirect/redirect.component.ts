import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { MainService } from '../../services/main.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss'],
  providers: [MainService]
})
export class RedirectComponent implements OnInit {

  codeStatus: boolean = false;
  count = 0;
  data = {};
  engagement = 0;
  totalPosts = 0;
  loadingProgress = "";
  loadingTimer;
  finishedVerify = '';
  
    constructor(
      private router: Router,
      private mainService: MainService,
      private activeRoute: ActivatedRoute,
    ) {
     }
  
  ngOnInit() {
    this.loadingCount();
    let url = this.router.url.split('=');
    let code = url[1];
    if (code) {
      this.getUserData(code);
      // this.mainService.instaStories(code).subscribe(res=>{
      //   console.log(res,'ressssssssssssss')
      // });
    }
    else {
      console.log('error')
    }
  }
  getUserData(code){
    this.mainService.instaAccess(code)
    .subscribe((data) =>{
      this.data = data.data;
      console.log(this.data,'data')
      if(data.data.counts.followed_by >= 200){
        this.mainService.getUserMedia(code).subscribe(res=>{
          this.formatMedia(res.data);
        })
      } else {
        //not enough followers
        this.finishedVerify = 'followers';
        this.mainService.getLoggedInState().subscribe(res =>{
          this.count = 15;
          this.counter(res.uid);
        });
      }
    });
  }
  formatMedia(res){
    for(let post of res){
      //var date = new Date(post.created_time*1000);
      //console.log(date,'date created');
      this.totalPosts++;
      this.engagement += post.likes.count;
      this.engagement += post.comments.count;
      if(this.totalPosts >= 5){
        break;
      }
    }
    let eng = this.engagement/this.totalPosts;
    if(eng >= 50){
      this.finishedVerify = 'accepted';
      this.saveData();
    } else{
      //not enough engagements
      this.finishedVerify = 'engagements';
      this.mainService.getLoggedInState().subscribe(res =>{
        this.count = 15;
        this.counter(res.uid);
      });
    }
  }
  saveData(){
    this.mainService.getLoggedInState().subscribe(res =>{
      this.mainService.updateUserInsta(this.data, res.uid);
      this.count = 15;
      this.counter(res.uid);
      //this.router.navigate(['userprofile/' + res.uid])
    });
  }
  counter(uid){
    if(this.count == 0){
      //this.router.navigate(['userprofile/' + uid])
    } else {
      setTimeout(()=>{
        this.count--;
        this.counter(uid);
      },1000);
    }
  }
  loadingCount(){
    switch(this.loadingProgress){
      case "":
        this.loadingProgress = "s";
        break;
      case "s":
        this.loadingProgress = "L";
        break;
      case "L":
        this.loadingProgress = "o";
        break;
      case "o":
        this.loadingProgress = "a";
        break;
      case "a":
        this.loadingProgress = "d";
        break;
      case "d":
        this.loadingProgress = "i";
        break;
      case "i":
        this.loadingProgress = "n";
        break;
      case "n":
        this.loadingProgress = "g";
        break;
      case "g":
        this.loadingProgress = ".";
        break;
      case ".":
        this.loadingProgress = ",";
        break;
      case ",":
        this.loadingProgress = "/";
        break;
      case "/":
        this.loadingProgress = "L";
        break;
    }
    this.loadingTimer = setTimeout(()=>{
      this.loadingCount();
    },700)
  }
}

