import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonMenuButton,
    IonTextarea,
    IonTitle,
    IonToolbar,
    TranslateModule,
  ],
  templateUrl: './edit-profile.page.html',
  styleUrl: './edit-profile.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProfilePage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);

  readonly saving = signal(false);
  readonly form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: [''],
    city: [''],
    bio: [''],
  });

  async ngOnInit(): Promise<void> {
    const profile = await this.userService.loadProfile();
    this.form.patchValue({
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone ?? '',
      city: profile.city ?? '',
      bio: profile.bio ?? '',
    });
  }

  async save(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);

    try {
      await this.userService.updateProfile(this.form.getRawValue());
      await this.router.navigateByUrl('/profile');
    } finally {
      this.saving.set(false);
    }
  }
}
