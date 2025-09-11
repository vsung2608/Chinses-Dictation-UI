import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { LoginRequest } from '../../../models/Auth';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, InputTextModule, FloatLabelModule, PasswordModule, ToastModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  @ViewChild('email') username?: ElementRef;
  @ViewChild('password') password?: ElementRef

  constructor(private authService: AuthService, private router: Router) {
  }

  onClick() {
    const username = this.username?.nativeElement.value;
    const password = this.password?.nativeElement.value;

    this.authService.login(username, password).subscribe({
      next: (data) => {
        const roles: string[] = data.info.roles;
        if (roles.includes('ADMIN')) {
          this.router.navigateByUrl('/admin');
        } else if (roles.includes('USER')) {
          this.router.navigateByUrl('/');
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
      }
    });
  }
}
