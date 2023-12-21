import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MeteoNowComponent } from "./components/meteo-now/meteo-now.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MeteoNowComponent, FontAwesomeModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // Fontawesome Icons
  faHome = faHome;
  faClock = faClock;
}
