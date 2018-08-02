import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-valid-locations',
  templateUrl: './valid-locations.component.html',
  styleUrls: ['./valid-locations.component.scss']
})
export class ValidLocationsComponent implements OnInit {

  @Input()locations = [];
  locationsOn = true;

  constructor() { }

  ngOnInit() {
  }
  checkLocations(){
    if(this.locations.length <= 2){
      return false;
    } else{
      return this.locationsOn;
    }
  }

}
