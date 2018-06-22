import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef, NgZone } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-business-locations-modal',
  templateUrl: './business-locations-modal.component.html',
  styleUrls: ['./business-locations-modal.component.scss']
})
export class BusinessLocationsModalComponent implements OnInit {

  @ViewChild('modal')modal: ModalComponent;
  @Input()next;
  @Output()saved: EventEmitter<string> = new EventEmitter();
  @ViewChild('search') public searchElement: ElementRef;

  allLocations = [];

  constructor(
    private mapsAPILoader: MapsAPILoader, 
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types:["address"] });
      autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        if(place.geometry === undefined || place.geometry === null ){
        return;
        }
      });
      });
    });
  }
  addLocation(){
    if(!this.searchElement.nativeElement.value){return}
    let value:any = this.searchElement.nativeElement.value;
    this.allLocations.push(value);
    this.searchElement.nativeElement.value = '';
  }
  open(){
    this.modal.open();
  }
  save(){
    this.addLocation();
    this.modal.close();
    this.saved.emit(JSON.stringify(this.allLocations));
  }
  remove(i, location){
    this.allLocations.splice(i,1);
  }

}
