import { Component, OnInit } from '@angular/core';
import { ProjetosService } from '../../services/projetos.service';
import Projeto from '../../classes/Projeto';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss']
})
export class ProjetosComponent implements OnInit {

  projetos: Projeto[] = [];

  constructor(private projetosService: ProjetosService) { }

  ngOnInit(): void {
    this.carregarProjetos();
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
