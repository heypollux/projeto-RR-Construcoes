import { Component, HostListener, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import ContatoMessage from 'src/app/classes/ContatoMessage';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent implements OnInit {

  // criar scroll reveal para as colunas
  @ViewChild('colunaMetadeRef') colunaMetadeRef!: ElementRef;
  @ViewChild('infoMapaColunaRef') infoMapaColunaRef!: ElementRef;

  windowHeight: number = 0;

  ngOnInit(): void {
    this.windowHeight = window.innerHeight;
    setTimeout(() => this.checkVisibility(), 0);
  }
  
  @HostListener('window:scroll', [])
  checkVisibility() {
    this.animateElement(this.colunaMetadeRef.nativeElement);
    this.animateElement(this.infoMapaColunaRef.nativeElement);
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

  // enviar mensagem para o whatsapp
  constructor(private toastr: ToastrService) { }

  numeroTelefone: string = '5511952924797';

  contato: ContatoMessage = new ContatoMessage();

  enviarWhatsapp() {

    console.log(this.contato);

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