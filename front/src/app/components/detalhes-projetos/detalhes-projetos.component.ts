import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Projeto from 'src/app/classes/Projeto';
import { ProjetosService } from 'src/app/services/projetos.service';

@Component({
  selector: 'app-detalhes-projetos',
  templateUrl: './detalhes-projetos.component.html',
  styleUrls: ['./detalhes-projetos.component.scss']
})
export class DetalhesProjetosComponent {

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
