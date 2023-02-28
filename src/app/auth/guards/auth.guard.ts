import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.verificarAutenticacion().pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          console.log('CanActivate');
          this.router.navigate(['./auth/login']);
        }
      })
    );
    // if (Object.values(this.authService.auth).length > 0) {
    //   return true;
    // }
    // console.log('CanActivate');
    // return false;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.verificarAutenticacion().pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          console.log('CanLoad');
          this.router.navigate(['./auth/login']);
        }
      })
    );
    // if (Object.values(this.authService.auth).length > 0) {
    //   return true;
    // }
    // console.log('CanLoad');
    // return false;
  }
}
