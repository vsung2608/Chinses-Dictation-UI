import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Route, Router } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'] as string;
    if (this.authService.hasRole(expectedRole)) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}