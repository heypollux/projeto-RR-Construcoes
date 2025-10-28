import { Component, HostListener, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss']
})
export class SobreComponent implements OnInit {
  // criar scroll reveal para as colunas
  @ViewChild('colunaMetadeRef') colunaMetadeRef!: ElementRef;
  @ViewChild('colunaMetadeRef2') colunaMetadeRef2!: ElementRef;
  @ViewChild('colunaMetadeRef3') colunaMetadeRef3!: ElementRef;
  @ViewChild('colunaMetadeRef4') colunaMetadeRef4!: ElementRef;
  @ViewChild('colunaMetadeRef5') colunaMetadeRef5!: ElementRef;
  @ViewChild('colunaMetadeRef6') colunaMetadeRef6!: ElementRef;

  windowHeight: number = 0;

  ngOnInit(): void {
    this.windowHeight = window.innerHeight;
    setTimeout(() => this.checkVisibility(), 0);
  }

  @HostListener('window:scroll', [])
  checkVisibility() {
    this.animateElement(this.colunaMetadeRef.nativeElement);
    this.animateElement(this.colunaMetadeRef2.nativeElement);
    this.animateElement(this.colunaMetadeRef3.nativeElement);
    this.animateElement(this.colunaMetadeRef4.nativeElement);
    this.animateElement(this.colunaMetadeRef5.nativeElement);
     this.animateElement(this.colunaMetadeRef6.nativeElement);
  }

  animateElement(element: HTMLElement): void {

    if (!element || element.classList.contains('scroll-show')) {
      return;
    }

    const elementTop = element.getBoundingClientRect().top;

    const triggerPoint = this.windowHeight * 0.6;

    if (elementTop < triggerPoint) {
      element.classList.add('scroll-show');
    }
  }

}
