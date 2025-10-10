import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import Projeto from '../classes/Projeto';

@Injectable({
  providedIn: 'root'
})
export class ProjetosService {

  private projetosUrl = 'assets/data/projetos.json';

  constructor(private http: HttpClient) { }

  getProjetos(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(this.projetosUrl);
  }

  getProjetoPorLink(link: string): Observable<Projeto | undefined> {
    return this.getProjetos().pipe(
      map(projetos =>
        projetos.find(p => p.link === link)
      )
    );
  }
}
