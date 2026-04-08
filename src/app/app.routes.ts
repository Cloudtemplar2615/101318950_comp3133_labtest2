import { Routes } from '@angular/router';
import { CharacterlistComponent } from './components/characterlist/characterlist.component';
import { CharacterdetailsComponent } from './components/characterdetails/characterdetails.component';

export const routes: Routes = [
  { path: '', component: CharacterlistComponent },
  { path: 'character/:id', component: CharacterdetailsComponent },
  { path: '**', redirectTo: '' }
];