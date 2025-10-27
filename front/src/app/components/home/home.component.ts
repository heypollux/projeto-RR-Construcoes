import { Component, HostListener, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
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
  currentFeedbackIndex: number = 0;
  private autoPlayInterval: any;
  private feedbackAutoPlayInterval: any;
  private projetosSubscription!: Subscription;

  feedbacks = [
    {
      id: 1,
      name: "João Silva",
      role: "Cliente",
      email: "joao@email.com",
      comment: "Trabalho excepcional! A equipe foi muito profissional e entregou exatamente o que combinamos.",
      image: "/assets/img/homepage/4.png"
    },
    {
      id: 2,
      name: "Maria Santos",
      role: "Arquiteta",
      email: "maria@email.com",
      comment: "Parceria incrível! A qualidade dos materiais e a atenção aos detalhes superaram minhas expectativas.",
      image: "/assets/img/homepage/4.png"
    },
    {
      id: 3,
      name: "Pedro Costa",
      role: "Engenheiro",
      email: "pedro@email.com",
      comment: "Projeto concluído no prazo e com excelente acabamento. Recomendo!",
      image: "/assets/img/homepage/4.png"
    }
  ];

  constructor(
    private scroller: ViewportScroller,
    private router: Router,
    private projetosService: ProjetosService
  ) { }

  ngOnInit(): void {
    this.windowHeight = window.innerHeight;
    setTimeout(() => this.checkVisibility(), 0); 
    this.carregarProjetos();
    this.startFeedbackAutoPlay();
  }

  ngOnDestroy(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
    if (this.feedbackAutoPlayInterval) {
      clearInterval(this.feedbackAutoPlayInterval);
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

  navigateToProjectDetails(): void {
    const currentProjeto = this.getCurrentProjeto();
    if (currentProjeto && currentProjeto.link) {
      this.router.navigate(['/projetos/detalhes', currentProjeto.link]);
    }
  }

  // Feedback slider methods
  startFeedbackAutoPlay(): void {
    if (this.feedbackAutoPlayInterval) {
      clearInterval(this.feedbackAutoPlayInterval);
    }
    this.feedbackAutoPlayInterval = setInterval(() => {
      this.nextFeedback();
    }, 4000);
  }

  stopFeedbackAutoPlay(): void {
    if (this.feedbackAutoPlayInterval) {
      clearInterval(this.feedbackAutoPlayInterval);
      this.feedbackAutoPlayInterval = null;
    }
  }

  nextFeedback(): void {
    if (this.feedbacks.length > 0) {
      this.currentFeedbackIndex = (this.currentFeedbackIndex + 1) % this.feedbacks.length;
    }
  }

  prevFeedback(): void {
    if (this.feedbacks.length > 0) {
      this.currentFeedbackIndex = (this.currentFeedbackIndex - 1 + this.feedbacks.length) % this.feedbacks.length;
    }
  }

  goToFeedback(index: number): void {
    this.currentFeedbackIndex = index;
    this.startFeedbackAutoPlay();
  }

  getCurrentFeedback(): any {
    return this.feedbacks[this.currentFeedbackIndex];
  }

}

