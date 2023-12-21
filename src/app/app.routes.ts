import { Routes } from '@angular/router';
import { MeteoNowComponent } from './components/meteo-now/meteo-now.component';
import { HistoryComponent } from './components/history/history.component';
import { OopsComponent } from './components/oops/oops.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MeteoNowComponent, title: 'Accueil' },
  { path: 'history/:duration', component: HistoryComponent, title: 'Historique' },
  { path: '**', component: OopsComponent, title: 'Oops'}
];
