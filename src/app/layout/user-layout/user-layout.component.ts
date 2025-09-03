import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/user/header/header.component';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

}
