import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ContextService } from '../Services/context.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
 context = inject(ContextService);
 router = inject(Router)

  canActivate(): boolean {

    if (this.context.isLoggedIn()) {
        return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
