import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HpApiService } from '../../services/hp-api.service';
import { Character } from '../../models/character';

@Component({
  selector: 'app-characterdetails',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './characterdetails.component.html',
  styleUrl: './characterdetails.component.css'
})
export class CharacterdetailsComponent {
  private route = inject(ActivatedRoute);
  private hpApiService = inject(HpApiService);

  character = signal<Character | null>(null);
  loading = signal<boolean>(true);
  errorMessage = signal<string>('');

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage.set('Character id not found.');
      this.loading.set(false);
      return;
    }

    this.hpApiService.getCharacterById(id).subscribe({
      next: (data: Character[]) => {
        this.character.set(data[0] ?? null);
        if (!data.length) {
          this.errorMessage.set('Character not found.');
        }
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Failed to load character details.');
        this.loading.set(false);
      }
    });
  }
}