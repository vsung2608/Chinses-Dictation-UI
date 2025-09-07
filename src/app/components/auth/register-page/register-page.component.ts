import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuthService } from '../../../services/auth/auth.service';
import { RegisterRequest } from '../../../models/Auth';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, InputTextModule, FloatLabelModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  @ViewChild('firstName') firstName?: ElementRef;
  @ViewChild('lastName') lastName?: ElementRef;
  @ViewChild('email') email?: ElementRef;
  @ViewChild('password') password?: ElementRef;

  constructor(private authService: AuthService, private router: Router) {
  }

  onClick() {
    let data: RegisterRequest = {
      username: this.email?.nativeElement.value,
      password: this.password?.nativeElement.value,
      fullname: `${this.firstName?.nativeElement.value} ${this.lastName?.nativeElement.value}`
    };

    this.authService.register(data);
    this.router.navigateByUrl('/login');
  }
}
