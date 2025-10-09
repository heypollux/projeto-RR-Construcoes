import { Component, Input } from '@angular/core';
import Projeto from '../../../classes/Projeto';

@Component({
  selector: 'app-card-projeto',
  templateUrl: './card-projeto.component.html',
  styleUrls: ['./card-projeto.component.scss']
})
export class CardProjetoComponent {

  @Input() projeto: Projeto = {
    titulo: "Projeto",
    descricao: "Descrição do projeto",
    imagem: "",
    link: "#",
    assets: []
  };

}
