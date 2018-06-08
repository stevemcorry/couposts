import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-business-finish-modal',
  templateUrl: './business-finish-modal.component.html',
  styleUrls: ['./business-finish-modal.component.scss']
})
export class BusinessFinishModalComponent implements OnInit {

  @ViewChild('modal')modal: ModalComponent;
  @Input()uid;
  @Output()saved: EventEmitter<string> = new EventEmitter();

  allLocations = [
    {city: ""}
  ];

  constructor() { }

  ngOnInit() {
  }
  open(){
    this.modal.open();
  }
  finish(){
    //save web info
    this.modal.close();
    this.saved.emit();
  }

}
