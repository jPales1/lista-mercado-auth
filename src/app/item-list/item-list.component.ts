import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item } from '../app.component';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})

export class ItemListComponent {
  @Input() items: Item[] = [];
  @Output() remove = new EventEmitter<number>();
  @Output() togglePurchased = new EventEmitter<number>();

  editIndex: number | null = null;

  editItem(index: number) {
    this.editIndex = index;
  }

  saveEdit(index: number) {
    this.editIndex = null;
  }

  cancelEdit() {
    this.editIndex = null;
  }

  get purchasedItems() {
    return this.items.filter(item => item.isPurchased);
  }

  get notPurchasedItems() {
    return this.items.filter(item => !item.isPurchased);
  }

  toggleItemPurchased(id: number): void {
    this.togglePurchased.emit(id);
  }

  removeItem(id: number): void {
    this.remove.emit(id);
  }
}