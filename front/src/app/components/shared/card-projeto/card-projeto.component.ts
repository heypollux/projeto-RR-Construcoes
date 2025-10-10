import { Component, Input } from '@angular/core';
import Projeto from '../../../classes/Projeto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-projeto',
  templateUrl: './card-projeto.component.html',
  styleUrls: ['./card-projeto.component.scss']
})
export class CardProjetoComponent {
  constructor(
    private router: Router
  ){}

  @Input() projeto: Projeto = {
    titulo: "Projeto",
    descricao: "Descrição do projeto",
    imagem: "",
    link: "#",
    assets: []
  };

  Navegar() {
    this.router.navigate([`/projetos/detalhes/${this.projeto.link}`]);
  }

}
