import { Component , HostListener, ViewChild, ElementRef, OnInit} from '@angular/core';
import { ProjetosService } from '../../services/projetos.service';
import Projeto from '../../classes/Projeto';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss']
})
export class ProjetosComponent implements OnInit {
  // criar scroll reveal para as colunas
  @ViewChild('containerTextRef') containerTextRef!: ElementRef;
  @ViewChild('containerTextRef2') containerTextRef2!: ElementRef;

  windowHeight: number = 0;

  
  @HostListener('window:scroll', [])
  checkVisibility() {
    this.animateElement(this.containerTextRef.nativeElement);
    this.animateElement(this.containerTextRef2.nativeElement);
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

  projetos: Projeto[] = [];

  constructor(private projetosService: ProjetosService) { }

  ngOnInit(): void {
    this.carregarProjetos();

    this.windowHeight = window.innerHeight;
    setTimeout(() => this.checkVisibility(), 0); // scroll reveal
  }

  carregarProjetos(): void {
    this.projetosService.getProjetos().subscribe({
      next: (projetos) => {
        this.projetos = projetos;

        if(this.projetos.length % 4 !== 0) {
          const toCreate = 4 - (this.projetos.length % 4);

          for(let i = 0; i < toCreate; i++) {
            this.projetos.push(new Projeto());
          }
        }
      },
      error: (error) => {
        console.error('Erro ao carregar projetos:', error);
      }
    });

  }
}
