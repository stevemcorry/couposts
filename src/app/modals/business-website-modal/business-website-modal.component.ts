import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-business-website-modal',
  templateUrl: './business-website-modal.component.html',
  styleUrls: ['./business-website-modal.component.scss']
})
export class BusinessWebsiteModalComponent implements OnInit {

  @ViewChild('modal')modal: ModalComponent;
  @Input()next;
  @Output()saved: EventEmitter<string> = new EventEmitter();

  website;
  industry = {};

  constructor() { }

  ngOnInit() {
  }
  open(){
    this.modal.open();
  }
  save(){
    let obj = {
      website: this.website, 
      industry: this.industry
    }
    this.modal.close();
    this.saved.emit(JSON.stringify(obj));
  }

}
