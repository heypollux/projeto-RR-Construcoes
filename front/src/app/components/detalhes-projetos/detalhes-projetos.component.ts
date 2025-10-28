import { Component, HostListener, ViewChild, ElementRef, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Projeto from 'src/app/classes/Projeto';
import { ProjetosService } from 'src/app/services/projetos.service';

@Component({
  selector: 'app-detalhes-projetos',
  templateUrl: './detalhes-projetos.component.html',
  styleUrls: ['./detalhes-projetos.component.scss']
})
export class DetalhesProjetosComponent implements OnInit {
// criar scroll reveal para as colunas
  @ViewChild('containerMainRef') containerMainRef!: ElementRef;
  @ViewChild('containerMainRef2') containerMainRef2!: ElementRef;

  windowHeight: number = 0;
  
  @HostListener('window:scroll', [])
  checkVisibility() {
    this.animateElement(this.containerMainRef.nativeElement);
    this.animateElement(this.containerMainRef2.nativeElement);
  }

  animateElement(element: HTMLElement): void {

    if (!element || element.classList.contains('scroll-show')) {
      return;
    }

    const elementTop = element.getBoundingClientRect().top;

    const triggerPoint = this.windowHeight * 0.9;

    if (elementTop < triggerPoint) {
      element.classList.add('scroll-show');
    }
  }
  


  constructor(
    private route: ActivatedRoute,
    private projetosService: ProjetosService,
    private router: Router
  ) { }

  projetoLink: string;

  projetoObs: Projeto | undefined;

  projeto: Projeto = new Projeto();

  isOpen: boolean = false;

  async ngOnInit() {

    this.windowHeight = window.innerHeight;
    setTimeout(() => this.checkVisibility(), 0);

    this.projetoLink = this.route.snapshot.params['projeto'];

    this.carregaProjetoPorLink()

  }

  carregaProjetoPorLink(): void {
    this.projetosService.getProjetoPorLink(this.projetoLink).subscribe({
      next: (projeto) => {
        this.projetoObs = projeto;

        console.log(this.projetoObs)

        if(this.projetoObs == undefined) {
          this.router.navigate(['/projetos']);
          return
        }

        this.projeto = this.projetoObs
      },
      error: (error) => {
        console.error('Erro ao carregar projeto:', error);
        this.router.navigate(['/projetos']);
      }
    });

  }

  OpenSlider() {
    this.isOpen = true;
  }

  closeSlider() {
    this.isOpen = false;
  }


}
