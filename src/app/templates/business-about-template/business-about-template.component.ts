import { Component, OnInit, Input } from '@angular/core';
import { AboutComponent } from '../../components/about/about.component';

@Component({
  selector: 'app-business-about-template',
  templateUrl: './business-about-template.component.html',
  styleUrls: ['./business-about-template.component.scss']
})
export class BusinessAboutTemplateComponent implements OnInit {

  @Input()about = "";

  showAbout = false;

  constructor() { }

  ngOnInit() {
  }
  aboutCheck(){
    if(!this.about){
      return
    }
    if(this.about.length < 120){
      return false
    } else {
      return true;
    }
  }
  aboutFix(){
    if(!this.about){
      return
    }
    if(this.about.length < 120){
      return this.about;
    }
    if(this.showAbout){
      return this.about;
    } else{
      return this.about.slice(0,120) + "..."
    }
  }

}
