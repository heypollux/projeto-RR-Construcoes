import { Component, HostListener, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss']
})
export class ServicosComponent implements OnInit{

  // criar scroll reveal para as colunas
  @ViewChild('colunaMetadeRef') colunaMetadeRef!: ElementRef;

  windowHeight: number = 0;

  ngOnInit(): void {
    this.windowHeight = window.innerHeight;
    setTimeout(() => this.checkVisibility(), 0);
  }
  
  @HostListener('window:scroll', [])
  checkVisibility() {
    this.animateElement(this.colunaMetadeRef.nativeElement);
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

  constructor(private router: Router) {}

  goToContato() {
    this.router.navigate(['/contato']);
  }
}
