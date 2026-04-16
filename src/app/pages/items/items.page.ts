import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { ItemService } from '../../core/services/item.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    IonBadge,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    TranslateModule,
  ],
  templateUrl: './items.page.html',
  styleUrl: './items.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsPage implements OnInit {
  private readonly itemService = inject(ItemService);
  private readonly authService = inject(AuthService);

  readonly items = this.itemService.items;
  readonly loading = this.itemService.isLoading;

  async ngOnInit(): Promise<void> {
    await this.itemService.loadItems();
    await this.itemService.connectToUpdates();
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }
}
