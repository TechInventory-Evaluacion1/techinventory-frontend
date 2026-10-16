import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}

  get estaLogueado(): boolean {
    return this.authService.isLoggedIn();
  }

  get usuarioNombre(): string {
    const cuenta = this.authService.getAccount();
    return cuenta?.name || cuenta?.username || 'Usuario';
  }

  iniciarSesion(): void {
    this.authService.login();
  }

  cerrarSesion(): void {
    this.authService.logout();
  }
}
