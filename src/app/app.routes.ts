import { Routes } from '@angular/router';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { HomePageComponent } from './components/user/pages/home-page/home-page.component';
import { LessonPageComponent } from './components/user/pages/lesson-page/lesson-page.component';

export const routes: Routes = [
    {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'lessons', component: LessonPageComponent}
    ]
  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
    ]
  }
];
