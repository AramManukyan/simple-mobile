import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { firstValueFrom, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Item } from '../models/item.model';
import { environment } from '../../../environments/environment';

const fallbackItems: Item[] = [
  {
    id: '1',
    title: 'Luna',
    description: 'Playful husky looking for a foster match.',
    category: 'Dog',
    status: 'available',
    updatedAt: new Date().toISOString(),
    location: 'San Diego, CA',
    notes: 'Friendly with children and loves long outdoor walks.',
  },
  {
    id: '2',
    title: 'Milo',
    description: 'Calm tabby cat ready for a new home.',
    category: 'Cat',
    status: 'reserved',
    updatedAt: new Date().toISOString(),
    location: 'Austin, TX',
    notes: 'Indoor cat with a gentle routine and easy temperament.',
  },
];

@Injectable({ providedIn: 'root' })
export class ItemService {
  private readonly http = inject(HttpClient);
  private readonly itemsState = signal<Item[]>([]);
  private readonly loadingState = signal(false);
  private hubConnection?: signalR.HubConnection;

  readonly items = computed(() => this.itemsState());
  readonly isLoading = computed(() => this.loadingState());

  async loadItems(): Promise<Item[]> {
    this.loadingState.set(true);

    try {
      const items = await firstValueFrom(
        this.http.get<Item[]>(`${environment.apiBaseUrl}/items`).pipe(
          catchError(() => of(fallbackItems)),
          tap((value) => this.itemsState.set(value)),
        ),
      );

      return items;
    } finally {
      this.loadingState.set(false);
    }
  }

  async getItemById(id: string): Promise<Item | undefined> {
    const existingItems = this.itemsState();
    if (!existingItems.length) {
      await this.loadItems();
    }

    return this.itemsState().find((item) => item.id === id);
  }

  async connectToUpdates(): Promise<void> {
    if (!environment.signalRHubUrl || this.hubConnection) {
      return;
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.signalRHubUrl)
      .withAutomaticReconnect()
      .build();

    this.hubConnection.on('itemsUpdated', (items: Item[]) => {
      this.itemsState.set(items);
    });

    try {
      await this.hubConnection.start();
    } catch {
      this.hubConnection = undefined;
    }
  }
}
