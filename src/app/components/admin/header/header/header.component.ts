import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  avatar: string = ''
  fullName: string = ''

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    this.avatar = this.authService.getUser()?.avatarUrl || '';
    this.fullName = this.authService.getUser()?.fullName || '';
  }

  logOut(){
    this.authService.logout()
    this.router.navigateByUrl('/auth/login')
  }
}
