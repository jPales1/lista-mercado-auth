import { Component } from '@angular/core';
import { AddItemFormComponent } from './add-item-form/add-item-form.component';
import { ItemListComponent } from './item-list/item-list.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { Item } from './item.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddItemFormComponent, ItemListComponent, LoginComponent, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lista-supermercado';
  items: Item[] = [];
  nextId = 1;

  constructor(public auth: AuthService) {}

  addItem(itemName: string) {
    if (itemName) {
      this.items.push({ id: this.nextId++, name: itemName, isPurchased: false });
    }
  }

  removeItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
  }

  toggleItemPurchased(id: number): void {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.isPurchased = !item.isPurchased;
    }
  }
}