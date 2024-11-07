import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item } from '../item.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @Input() items: Item[] = [];
  @Output() remove = new EventEmitter<number>();
  @Output() togglePurchased = new EventEmitter<number>();

  editItemId: number | null = null;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.shoppingListService.getItems().subscribe(items => this.items = items);
  }

  addItem(item: Item) {
    this.shoppingListService.addItem(item).subscribe(() => this.loadItems());
  }

  removeItem(id: number) {
    this.shoppingListService.removeItem(id).subscribe(() => this.loadItems());
  }

  editItem(id: number) {
    this.editItemId = id;
  }

  saveEdit() {
    this.editItemId = null;
  }

  cancelEdit() {
    this.editItemId = null;
  }

  toggleItemPurchased(id: number): void {
    this.togglePurchased.emit(id);
  }

  get purchasedItems() {
    return this.items.filter(item => item.isPurchased);
  }

  get notPurchasedItems() {
    return this.items.filter(item => !item.isPurchased);
  }
}