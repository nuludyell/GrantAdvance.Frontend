import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/api/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);

  if (!authService.isTokenExpired()) {
    return true;
  }

  return of(createUrlTreeFromSnapshot(route, ['/login']));
};