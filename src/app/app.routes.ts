import { Routes } from '@angular/router';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { HomePageComponent } from './components/user/pages/home-page/home-page.component';
import { LessonPageComponent } from './components/user/pages/lesson-page/lesson-page.component';
import { DetailLessonPageComponent } from './components/user/pages/detail-lesson-page/detail-lesson-page.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginPageComponent } from './components/auth/login-page/login-page.component';
import { RegisterPageComponent } from './components/auth/register-page/register-page.component';

export const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'lessons', component: LessonPageComponent },
      { path: 'lessons/:id', component: DetailLessonPageComponent }
    ]
  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
    ]
  },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent }
    ]
  }
];
