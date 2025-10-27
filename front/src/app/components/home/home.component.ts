import { Component, HostListener, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ProjetosService } from '../../services/projetos.service';
import Projeto from '../../classes/Projeto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild('container1Ref') container1Ref!: ElementRef;
  @ViewChild('container2Ref') container2Ref!: ElementRef;
  @ViewChild('container3Ref') container3Ref!: ElementRef;
  @ViewChild('container4Ref') container4Ref!: ElementRef;
  @ViewChild('container5Ref') container5Ref!: ElementRef;
  
  windowHeight: number = 0;
  projetos: Projeto[] = [];
  currentSlideIndex: number = 0;
  private autoPlayInterval: any;
  private projetosSubscription!: Subscription;

  constructor(
    private scroller: ViewportScroller,
    private projetosService: ProjetosService
  ) { }

  ngOnInit(): void {
    this.windowHeight = window.innerHeight;
    setTimeout(() => this.checkVisibility(), 0); 
    this.carregarProjetos();
  }

  ngOnDestroy(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
    if (this.projetosSubscription) {
      this.projetosSubscription.unsubscribe();
    }
  }

  carregarProjetos(): void {
    this.projetosSubscription = this.projetosService.getProjetos().subscribe({
      next: (projetos) => {
        this.projetos = projetos;
        this.startAutoPlay();
      },
      error: (error) => {
        console.error('Erro ao carregar projetos:', error);
      }
    });
  }

  startAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  nextSlide(): void {
    if (this.projetos.length > 0) {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.projetos.length;
    }
  }

  prevSlide(): void {
    if (this.projetos.length > 0) {
      this.currentSlideIndex = (this.currentSlideIndex - 1 + this.projetos.length) % this.projetos.length;
    }
  }

  goToSlide(index: number): void {
    this.currentSlideIndex = index;
    this.startAutoPlay();
  }

  getCurrentProjeto(): Projeto | undefined {
    return this.projetos[this.currentSlideIndex];
  }

  getCurrentImage(): string {
    const projeto = this.getCurrentProjeto();
    return projeto?.assets?.[0] || '';
  }

  onImageLoad(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.style.opacity = '1';
    }
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

