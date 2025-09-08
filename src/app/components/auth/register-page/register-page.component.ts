import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuthService } from '../../../services/auth/auth.service';
import { RegisterRequest } from '../../../models/Auth';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, InputTextModule, FloatLabelModule, DialogModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  @ViewChild('firstName') firstName?: ElementRef;
  @ViewChild('lastName') lastName?: ElementRef;
  @ViewChild('email') email?: ElementRef;
  @ViewChild('password') password?: ElementRef;
  @ViewChildren('code1, code2, code3, code4, code5, code6') inputs!: QueryList<ElementRef>;

  otpForm: FormGroup;
  visibleActivationDialog = false;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.otpForm = this.fb.group({
      code1: ['', Validators.required],
      code2: ['', Validators.required],
      code3: ['', Validators.required],
      code4: ['', Validators.required],
      code5: ['', Validators.required],
      code6: ['', Validators.required],
    });
  }

  onClick() {
    let data: RegisterRequest = {
      username: this.email?.nativeElement.value,
      password: this.password?.nativeElement.value,
      fullName: `${this.firstName?.nativeElement.value} ${this.lastName?.nativeElement.value}`
    };

    this.authService.register(data).subscribe({
      next: (res) => {
        this.visibleActivationDialog = true;
      }});
  }

  moveFocus(index: number) {
    const inputArray = this.inputs.toArray();
    if (this.otpForm.controls[`code${index + 1}`].value.length === 1 && inputArray[index + 1]) {
      inputArray[index + 1].nativeElement.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const inputArray = this.inputs.toArray();
    if (event.key === 'Backspace' && this.otpForm.controls[`code${index + 1}`].value === '' && index > 0) {
      inputArray[index - 1].nativeElement.focus();
    }
  }

  onSubmit() {
    if (this.otpForm.valid) {
      this.loading = true;
      const otp = Object.values(this.otpForm.value).join('');
      this.authService.activation(otp).subscribe({
        next: (res) => {
          this.visibleActivationDialog = false;
          this.loading = false;
          this.router.navigateByUrl('/login');
        }});
    } else {
      alert('Vui lòng nhập đầy đủ 6 ký tự!');
    }
  }
}
