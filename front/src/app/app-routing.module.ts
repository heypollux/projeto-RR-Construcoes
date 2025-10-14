import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatoComponent } from './components/contato/contato.component';
import { HomeComponent } from './components/home/home.component';
import { ProjetosComponent } from './components/projetos/projetos.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { DetalhesProjetosComponent } from './components/detalhes-projetos/detalhes-projetos.component';
import { ServicosComponent } from './components/servicos/servicos.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: HomeComponent
  },
  {
    path: 'contato',
    component: ContatoComponent
  },
  {
    path: 'projetos',
    component: ProjetosComponent
  },
  {
    path: 'projetos/detalhes/:projeto',
    component: DetalhesProjetosComponent
  },
  {
    path: 'sobre',
    component: SobreComponent
  },
  {
    path: 'servicos',
    component: ServicosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
