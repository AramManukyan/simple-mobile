import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private static readonly tokenStorageKey = 'dhomie.access_token';
  private readonly oauthService = inject(OAuthService);
  private readonly router = inject(Router);
  private readonly accessTokenState = signal<string | null>(null);

  readonly accessToken = computed(() => this.accessTokenState());
  readonly isAuthenticated = computed(() => Boolean(this.accessTokenState()));

  constructor() {
    this.oauthService.configure(environment.oauth);
    this.oauthService.setupAutomaticSilentRefresh();

    const token =
      this.oauthService.getAccessToken() || localStorage.getItem(AuthService.tokenStorageKey);
    if (token) {
      this.accessTokenState.set(token);
    }
  }

  async login(email: string, password: string): Promise<void> {
    const mockToken = btoa(`${email}:${password}`);
    this.accessTokenState.set(mockToken);
    localStorage.setItem(AuthService.tokenStorageKey, mockToken);
    await this.router.navigateByUrl('/items');
  }

  logout(): Promise<boolean> {
    this.accessTokenState.set(null);
    localStorage.removeItem(AuthService.tokenStorageKey);
    this.oauthService.logOut();
    return this.router.navigateByUrl('/login');
  }
}
