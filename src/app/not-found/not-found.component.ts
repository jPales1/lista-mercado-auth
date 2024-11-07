import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `<h1>Página não encontrada</h1><p>A página que você está procurando não existe.</p>`,
  styles: [`
    h1 {
      color: #dc3545;
      text-align: center;
      margin-top: 20px;
    }
    p {
      text-align: center;
    }
  `]
})
export class NotFoundComponent { }
