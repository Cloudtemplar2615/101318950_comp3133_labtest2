import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HpApiService } from '../../services/hp-api.service';
import { Character } from '../../models/character';
import { CharacterfilterComponent } from '../characterfilter/characterfilter.component';

@Component({
  selector: 'app-characterlist',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CharacterfilterComponent
  ],
  templateUrl: './characterlist.component.html',
  styleUrl: './characterlist.component.css'
})
export class CharacterlistComponent {
  private hpApiService = inject(HpApiService);

  characters = signal<Character[]>([]);
  loading = signal<boolean>(true);
  errorMessage = signal<string>('');
  selectedHouse = signal<string>('');

  displayedCharacters = computed(() => this.characters());

  constructor() {
    this.loadAllCharacters();
  }

  loadAllCharacters(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.hpApiService.getCharacters().subscribe({
      next: (data: Character[]) => {
        this.characters.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Failed to load characters.');
        this.loading.set(false);
      }
    });
  }

  onHouseChanged(house: string): void {
    this.selectedHouse.set(house);

    if (!house) {
      this.loadAllCharacters();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    this.hpApiService.getCharactersByHouse(house).subscribe({
      next: (data: Character[]) => {
        this.characters.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Failed to load characters for that house.');
        this.loading.set(false);
      }
    });
  }
}