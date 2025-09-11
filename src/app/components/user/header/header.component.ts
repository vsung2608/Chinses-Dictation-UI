import {Component, NgModule, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {SplitButtonModule} from 'primeng/splitbutton';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {OverlayBadge} from 'primeng/overlaybadge';
import {AccordionModule} from 'primeng/accordion';
import {Avatar} from 'primeng/avatar';
import {Badge} from 'primeng/badge';
import {DrawerModule} from 'primeng/drawer';
import { StorageService } from '../../../services/storage/storage.service';
import { AuthService } from '../../../services/auth/auth.service';


@Component({
    selector: 'app-header',
    imports: [
        RouterLink,
        RouterLinkActive,
        SplitButtonModule,
        ButtonModule,
        OverlayBadge,
        AccordionModule,
        Avatar,
        Badge,
        DrawerModule
    ],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  items: MenuItem[];
  name: string = 'Nguyen Van Sung';
  avartar: string = "ajhsdasdasda";
  logined: boolean = true;
  visible: boolean = false;
  avatar: string = ''

  constructor(private router: Router, private authService: AuthService) {
    this.items = [
      {
        label: 'Chế độ sáng',
        icon: 'pi pi-power-off',
        command: () => {
          
        }
      },
      {
        label: 'Chế độ tối',
        icon: 'pi pi-refresh',
        command: () => {
          
        }
      },
      {
        separator: true,
      },
      {
        label: 'Thông tin cá nhân',
        icon: PrimeIcons.BELL,
        command: () => {
          
        }
      },
      {
        separator: true,
      },
      {
        label: 'Đăng xuất tài khoản',
        icon: 'pi pi-power-off',
        command: () => {
          this.logOut()
        }
      }
    ]
  }
  ngOnInit(): void {
    if(this.authService.isTokenExpired()){
      this.logined = false
    }
    this.avatar = this.authService.getUser()?.avatarUrl || '';
  }

  navigateToSignInPage(){
    this.router.navigateByUrl("/auth/login")
  }

  navigateToSignUpPage(){
    this.router.navigateByUrl("/auth/register")
  }

  navigateToCartPage(){
    this.router.navigateByUrl("/carts")
  }

  navigateToUpdateInformationPage() {
    this.router.navigateByUrl("/my-info");
  }

  displayNotification(){

  }

  logOut(){
    this.authService.logout()
    this.router.navigateByUrl('/auth/login')
  }
}