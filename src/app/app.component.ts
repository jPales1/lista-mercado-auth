import { Component } from '@angular/core';
import { AddItemFormComponent } from './add-item-form/add-item-form.component';
import { ItemListComponent } from './item-list/item-list.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { Item } from './item.model';
import { ShoppingListService } from './shopping-list.service';

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

  constructor(public auth: AuthService, private shoppingListService: ShoppingListService) {
    this.loadItems();
  }

  loadItems() {
    this.shoppingListService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  addItem(itemName: string) {
    if (itemName) {
      const newItem: Partial<Item> = { name: itemName, isPurchased: false };
      this.shoppingListService.addItem(newItem as Item).subscribe(() => {
        this.loadItems(); // Recarrega a lista de itens do backend
      });
    }
  }

  removeItem(id: number) {
    this.shoppingListService.removeItem(id).subscribe(() => {
      this.items = this.items.filter(item => item.id !== id); // Atualize a lista de itens no frontend
    });
  }

  toggleItemPurchased(id: number): void {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.isPurchased = !item.isPurchased;
      this.shoppingListService.updateItem(item).subscribe(updatedItem => {
        // Atualize o item na lista local se necessário
        const index = this.items.findIndex(i => i.id === updatedItem.id);
        if (index !== -1) {
          this.items[index] = updatedItem;
        }
      });
    }
    this.loadItems();
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }
}