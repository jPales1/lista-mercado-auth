import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public auth: AuthService, private shoppingListService: ShoppingListService) {}

  loginWithRedirect() {
    this.auth.loginWithRedirect();
  }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.shoppingListService.getUser(user.sub || '').subscribe(
          existingUser => {
            if (!existingUser) {
              this.shoppingListService.addUser({
                id: user.sub || '',
                name: user.name || '',
                email: user.email || ''
              }).subscribe();
            }
          },
          error => {
            if (error.status === 404) {
              this.shoppingListService.addUser({
                id: user.sub || '',
                name: user.name || '',
                email: user.email || ''
              }).subscribe();
            }
          }
        );
      }
    });
  }
}
