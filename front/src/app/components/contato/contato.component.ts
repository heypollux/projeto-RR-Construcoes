import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import ContatoMessage from 'src/app/classes/ContatoMessage';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent {
  constructor(private toastr: ToastrService) {}

  numeroTelefone: string = '+55 (11) 95292-4797';

  contato: ContatoMessage = new ContatoMessage();

  enviarWhatsapp() {

    if (!this.validarInput(this.contato.nome, 'Por favor, insira seu nome.')) {
      return;
    }

    if (!this.validarInput(this.contato.mensagem, 'Por favor, insira uma mensagem.')) {
      return;
    }

    const mensagem = `Olá, meu nome é ${this.contato.nome}. ${this.contato.mensagem}`;

    const url = `https://wa.me/${this.numeroTelefone}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, '_blank');

    this.contato = new ContatoMessage();

    this.toastr.success('Mensagem enviada com sucesso!', 'Sucesso');

  }

  validarInput(input: string, mensagemErro: string): boolean {
    if (!input || input.trim() === '') {
      this.toastr.error(mensagemErro, 'Erro');
      return false;
    }

    return true;
  }
}