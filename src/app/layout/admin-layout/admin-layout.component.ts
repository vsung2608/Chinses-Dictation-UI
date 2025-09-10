import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/admin/header/header/header.component';
import { SidebarComponent } from '../../components/admin/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-admin-layout',
    imports: [HeaderComponent, SidebarComponent, RouterOutlet, ToastModule],
    templateUrl: './admin-layout.component.html',
    styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
