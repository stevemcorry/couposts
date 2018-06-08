import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-welcome-business-modal',
  templateUrl: './welcome-business-modal.component.html',
  styleUrls: ['./welcome-business-modal.component.scss']
})
export class WelcomeBusinessModalComponent implements OnInit {

  @ViewChild('modal')modal: ModalComponent;
  @Input()next;
  @Output()saved: EventEmitter<string> = new EventEmitter();

  about;

  constructor() { }

  ngOnInit() {
  }
  open(){
    this.modal.open();
  }
  aboutSave(){
    this.modal.close();
    this.saved.emit(this.about);
  }

}
