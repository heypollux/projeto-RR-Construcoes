import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ContatoComponent } from './components/contato/contato.component';
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RodapeComponent } from './components/rodape/rodape.component';
import { ProjetosComponent } from './components/projetos/projetos.component';
import { CardProjetoComponent } from './components/shared/card-projeto/card-projeto.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { DetalhesProjetosComponent } from './components/detalhes-projetos/detalhes-projetos.component';
import { ServicosComponent } from './components/servicos/servicos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContatoComponent,
    CabecalhoComponent,
    RodapeComponent,
    ProjetosComponent,
    CardProjetoComponent,
    SobreComponent,
    DetalhesProjetosComponent,
    ServicosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
