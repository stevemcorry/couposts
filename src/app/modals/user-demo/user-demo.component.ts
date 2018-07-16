import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {MainService} from '../../services/main.service';

@Component({
  selector: 'app-user-demo',
  templateUrl: './user-demo.component.html',
  styleUrls: ['./user-demo.component.scss'],
  providers: [MainService]
})
export class UserDemoComponent implements OnInit {

  @ViewChild('modal')modal: ModalComponent;
  @Input()uid;
  @Output()saved: EventEmitter<string> = new EventEmitter();


  interests:any = [
    {
      name: 'In MiddleSchool/Junior High',
      value: false
    },
    {
      name: 'In High School',
      value: false
    },
    {
      name: 'In College',
      value: false
    },
    {
      name: 'Married',
      value: false
    },
    {
      name: 'Dating',
      value: false
    },
    {
      name: 'Single',
      value: false
    },
    {
      name: 'Athletic',
      value: false
    },
    {
      name: 'Outdoor Enthusiast',
      value: false
    },
    {
      name: 'Gamer',
      value: false
    },
    {
      name: 'Techy',
      value: false
    },
    {
      name: 'Fashionista',
      value: false
    },
    {
      name: 'Traveler',
      value: false
    },
    {
      name: 'Foodie',
      value: false
    },
    {
      name: 'Pregnant',
      value: false
    },
    {
      name: 'New Parent',
      value: false
    },
    {
      name: 'Regular Family (1-4 kids)',
      value: false
    },
    {
      name: 'Large Family (5+ kids)',
      value: false
    },
    {
      name: 'Grandparent',
      value: false
    },
  ];
  constructor(
    public mainService: MainService,
  ) {
   }

  ngOnInit() {
  }

  open(){
    this.modal.open();
  }
  save(){
    this.modal.close();
    this.saved.emit();
  }

}
