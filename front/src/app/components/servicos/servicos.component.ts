import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss']
})
export class ServicosComponent {

  constructor(private router: Router) {}

  goToContato() {
    this.router.navigate(['/contato']);
  }
}
