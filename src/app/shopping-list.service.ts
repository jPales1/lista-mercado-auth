import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item.model';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getItems(): Observable<Item[]> {
    return this.auth.user$.pipe(
      switchMap(user => {
        const userId = user?.sub || '';
        return this.http.get<Item[]>(`${this.apiUrl}/shopping-list?userId=${userId}`);
      })
    );
  }

  addItem(item: Item): Observable<Item> {
    return this.auth.user$.pipe(
      switchMap(user => {
        const userId = user?.sub || '';
        return this.http.post<Item>(`${this.apiUrl}/shopping-list`, { ...item, userId });
      })
    );
  }

  removeItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/shopping-list/${id}`);
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/shopping-list/${item.id}`, item);
  }

  addUser(user: { id: string, name: string, email: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, user);
  }

  getUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${id}`);
  }
}
