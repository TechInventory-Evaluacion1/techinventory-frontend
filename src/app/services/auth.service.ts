import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private msalService: MsalService) {}

  login(): void {
    this.msalService.loginRedirect({
      scopes: [...environment.msal.scopes]
    });
  }

  logout(): void {
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: environment.msal.redirectUri
    });
  }

  getAccount() {
    return this.msalService.instance.getAllAccounts()[0] ?? null;
  }

  isLoggedIn(): boolean {
    return this.msalService.instance.getAllAccounts().length > 0;
  }
}
