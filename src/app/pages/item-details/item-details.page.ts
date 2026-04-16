import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonBackButton,
  IonBadge,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonNote,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { Item } from '../../core/models/item.model';
import { ItemService } from '../../core/services/item.service';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [
    DatePipe,
    IonBackButton,
    IonBadge,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonNote,
    IonTitle,
    IonToolbar,
    TranslateModule,
  ],
  templateUrl: './item-details.page.html',
  styleUrl: './item-details.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDetailsPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly itemService = inject(ItemService);

  readonly item = signal<Item | null>(null);
  readonly loading = signal(true);

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.loading.set(false);
      return;
    }

    const item = await this.itemService.getItemById(id);
    this.item.set(item ?? null);
    this.loading.set(false);
  }
}
