import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input()dealImages = [];

  constructor() {
    window.addEventListener("resize", this.resizeFunction);
   }

  carouselPos;
  carouselCheck = 0;
  resizeWidth = this.getWidth();

  ngOnInit() {
  }


  carousel(){
    let width = this.getWidth();
    if(this.carouselCheck == this.dealImages.length - 1 || this.carouselCheck >= this.dealImages.length - 1){
      this.carouselPos = '';
      this.carouselCheck = 0
      return
    }
    this.carouselCheck += 1;
    this.carouselPos = 'translateX(' + - width * this.carouselCheck + 'px)';
  }
  resizeFunction(){
    let width = document.documentElement.clientWidth;
    if(width <= 575){
      this.resizeWidth = 325;
    } else {
      this.resizeWidth = 375;
    }
  }
  carouselLeft(){
    let width = this.getWidth();
    if(this.carouselCheck == 0){
      this.carouselPos = '';
      this.carouselCheck = this.dealImages.length
      this.carouselPos = 'translateX(' + - width * (this.carouselCheck - 1) + 'px)';
      return
    }
    this.carouselCheck -= 1;
    this.carouselPos = 'translateX(' + - width * this.carouselCheck + 'px)';
  }
  getWidth(){
    let width = document.documentElement.clientWidth;
    if(width <= 575){
      return 325;
    } else {
      return 375;
    }
  }


}
