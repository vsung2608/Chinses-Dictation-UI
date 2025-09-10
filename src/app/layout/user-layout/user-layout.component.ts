import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/user/header/header.component';
import { FooterComponent } from '../../components/user/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-user-layout',
    imports: [HeaderComponent, FooterComponent, RouterOutlet, ToastModule],
    templateUrl: './user-layout.component.html',
    styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

}
