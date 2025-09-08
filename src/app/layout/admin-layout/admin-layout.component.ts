import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/admin/header/header/header.component';
import { SidebarComponent } from '../../components/admin/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-admin-layout',
    imports: [HeaderComponent, SidebarComponent, RouterOutlet],
    templateUrl: './admin-layout.component.html',
    styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
