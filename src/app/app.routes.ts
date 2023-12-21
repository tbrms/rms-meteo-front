import { Routes } from '@angular/router';
import { MeteoNowComponent } from './components/meteo-now/meteo-now.component';
import { HistoryComponent } from './components/history/history.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MeteoNowComponent, title: 'Accueil' },
  { path: 'history/:hour', component: HistoryComponent, title: 'Historique' },
];
