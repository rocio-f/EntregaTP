import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../index.ts/auth.service";
import { map } from "rxjs";
import { inject } from "@angular/core";

export const authenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.verifyToken().pipe(
    map((authUser) => {
      if (authUser) {
        return true;
      } else {
        router.navigate(['/auth/login']);
        return false;
      }
    })
  );
};
