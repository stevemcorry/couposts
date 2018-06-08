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
  
    constructor(
      private router: Router,
      private mainService: MainService,
      private activeRoute: ActivatedRoute,
    ) {
     }
  
    ngOnInit() {
      let url = this.router.url.split('=');
      let code = url[1];
      if (code) {
        // this.mainService.instaStories(code).subscribe(res=>{
        //   console.log(res,'ressssssssssssss')
        // });
        this.mainService.instaAccess(code)
        .subscribe((data) =>{
          console.log(data, 'user')
          this.mainService.getLoggedInState().subscribe(res =>{
            this.mainService.updateUserInsta(data.data, res.uid)
            this.router.navigate(['userprofile/' + res.uid])
          });
        });
      }
      else {
        console.log('error')
      }
    }
}
