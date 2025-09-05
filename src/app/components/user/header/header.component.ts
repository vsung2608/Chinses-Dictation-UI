import {Component, NgModule} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {SplitButtonModule} from 'primeng/splitbutton';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {OverlayBadge} from 'primeng/overlaybadge';
import {AccordionModule} from 'primeng/accordion';
import {Avatar} from 'primeng/avatar';
import {Badge} from 'primeng/badge';
import {DrawerModule} from 'primeng/drawer';


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
export class HeaderComponent {
  items: MenuItem[];
  name: string = 'Nguyen Van Sung';
  avartar: string = "ajhsdasdasda";
  logined: boolean = true;
  visible: boolean = false;

  constructor(private router: Router) {
    this.items = [
      {
        label: 'Light Mode',
        icon: 'pi pi-power-off',
        command: () => {
          this.backHomePage()
        }
      },
      {
        label: 'Dark Mode',
        icon: 'pi pi-refresh',
        command: () => {
          this.navigateToUpdateInformationPage()
        }
      },
      {
        separator: true,
      },
      {
        label: 'Delete',
        icon: PrimeIcons.BELL,
        command: () => {
          this.displayNotification()
        }
      },
      {
        separator: true,
      },
      {
        label: 'Quit',
        icon: 'pi pi-power-off',
        command: () => {
          this.backHomePage()
        }
      }
    ]
  }

  navigateToSignInPage(){
    this.router.navigateByUrl("/auth/sign-in")
  }

  navigateToSignUpPage(){
    this.router.navigateByUrl("/auth/sign-up")
  }

  navigateToCartPage(){
    this.router.navigateByUrl("/carts")
  }

  navigateToUpdateInformationPage() {
    this.router.navigateByUrl("/my-info");
  }

  displayNotification(){

  }

  backHomePage(){

  }
}