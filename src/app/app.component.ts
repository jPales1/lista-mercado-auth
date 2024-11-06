import { Component } from '@angular/core';
import { AddItemFormComponent } from './add-item-form/add-item-form.component';
import { ItemListComponent } from './item-list/item-list.component';
import { CommonModule } from '@angular/common';

export interface Item {
  id: number;
  name: string;
  isPurchased: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddItemFormComponent, ItemListComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lista-supermercado';
  items: Item[] = [];
  nextId = 1;

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