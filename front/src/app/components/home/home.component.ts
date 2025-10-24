import { Component, HostListener, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('container1Ref') container1Ref!: ElementRef;
  @ViewChild('container2Ref') container2Ref!: ElementRef;
  @ViewChild('container3Ref') container3Ref!: ElementRef;
  @ViewChild('container4Ref') container4Ref!: ElementRef;
  @ViewChild('container5Ref') container5Ref!: ElementRef;
  
  windowHeight: number = 0;

  constructor(private scroller: ViewportScroller) { }

  ngOnInit(): void {
    this.windowHeight = window.innerHeight;
    setTimeout(() => this.checkVisibility(), 0); 
  }

  @HostListener('window:scroll', [])
  checkVisibility() {
    
    this.animateElement(this.container1Ref.nativeElement);
    this.animateElement(this.container2Ref.nativeElement);
    this.animateElement(this.container3Ref.nativeElement);
    this.animateElement(this.container4Ref.nativeElement);
    this.animateElement(this.container5Ref.nativeElement);
  }

  animateElement(element: HTMLElement): void {

    if (!element || element.classList.contains('scroll-show')) {
      return; 
    }

    const elementTop = element.getBoundingClientRect().top;
    
    const triggerPoint = this.windowHeight * 0.8; 

    if (elementTop < triggerPoint) {
      element.classList.add('scroll-show');
    }
  }
  
  scrollToElement(elementId: string): void {

    setTimeout(() => {
      this.scroller.scrollToAnchor(elementId);
    }, 50); 
  }

}

