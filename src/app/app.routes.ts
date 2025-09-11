import { Routes } from '@angular/router';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { HomePageComponent } from './components/user/pages/home-page/home-page.component';
import { LessonPageComponent } from './components/user/pages/lesson-page/lesson-page.component';
import { DetailLessonPageComponent } from './components/user/pages/detail-lesson-page/detail-lesson-page.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginPageComponent } from './components/auth/login-page/login-page.component';
import { RegisterPageComponent } from './components/auth/register-page/register-page.component';
import { DashboardPageComponent } from './components/admin/pages/dashboard-page/dashboard-page.component';
import { UserManagePageComponent } from './components/admin/pages/user-manage-page/user-manage-page.component';
import { LessonAddComponent } from './components/admin/pages/lesson-manage-page/lesson-add/lesson-add.component';
import { LessonListComponent } from './components/admin/pages/lesson-manage-page/lesson-list/lesson-list.component';
import { CategoryPageComponent } from './components/user/pages/category-page/category-page.component';
import { CommentManagePageComponent } from './components/admin/pages/comment-manage-page/comment-manage-page.component';
import { RoleGuard } from './config/RoleGuard';
import { ReportManagePageComponent } from './components/admin/pages/report-manage-page/report-manage-page.component';

export const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'categories/:id', component: LessonPageComponent, canActivate: [RoleGuard], data: { role: 'USER' } },
      { path: 'lessons/:id', component: DetailLessonPageComponent, canActivate: [RoleGuard], data: { role: 'USER' } },
      { path: 'categories', component: CategoryPageComponent, canActivate: [RoleGuard], data: { role: 'USER' } }
    ]
  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [RoleGuard], data: { role: 'ADMIN' },
    children: [
      { path: '', component: DashboardPageComponent },
      { path: 'lessons/list', component: LessonListComponent },
      { path: 'lessons/add', component: LessonAddComponent },
      { path: 'users', component: UserManagePageComponent },
      { path: 'comments', component: CommentManagePageComponent },
      { path: 'reports', component: ReportManagePageComponent }
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
