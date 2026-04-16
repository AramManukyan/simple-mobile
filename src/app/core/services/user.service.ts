import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserProfile, UserProfilePatch } from '../models/user.model';
import { environment } from '../../../environments/environment';

const fallbackProfile: UserProfile = {
  id: 'me',
  email: 'alex@dhomie.app',
  firstName: 'Alex',
  lastName: 'Taylor',
  phone: '+1 555 0147',
  city: 'San Diego',
  bio: 'Pet lover and active DHomie community member.',
  avatarUrl: '',
};

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly profileState = signal<UserProfile | null>(null);
  private readonly loadingState = signal(false);

  readonly profile = computed(() => this.profileState());
  readonly isLoading = computed(() => this.loadingState());

  async loadProfile(): Promise<UserProfile> {
    this.loadingState.set(true);

    try {
      const profile = await firstValueFrom(
        this.http.get<UserProfile>(`${environment.apiBaseUrl}/users/me`).pipe(
          catchError(() => of(fallbackProfile)),
          tap((user) => this.profileState.set(user)),
        ),
      );

      return profile;
    } finally {
      this.loadingState.set(false);
    }
  }

  async updateProfile(patch: UserProfilePatch): Promise<UserProfile> {
    const currentProfile = this.profileState() ?? fallbackProfile;
    const nextProfile = { ...currentProfile, ...patch };

    const profile = await firstValueFrom(
      this.http.patch<UserProfile>(`${environment.apiBaseUrl}/users/me`, patch).pipe(
        catchError(() => of(nextProfile)),
        tap((user) => this.profileState.set(user)),
      ),
    );

    return profile;
  }
}
