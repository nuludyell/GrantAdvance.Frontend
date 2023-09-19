import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/api/services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);

  if (!authService.isLoggedIn()) {
    return true;
  }

  return of(createUrlTreeFromSnapshot(route, ['']));
};
