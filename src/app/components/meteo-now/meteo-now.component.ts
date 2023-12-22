import {Component, OnInit, Signal, inject} from '@angular/core';
import {MeteoService} from "../../services/meteo.service";
import {Meteo} from "../../models/meteo";
import { DatePipe, TitleCasePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTemperatureHalf, faCloudSunRain, faDroplet, faRotateRight } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-meteo-now',
  standalone: true,
  imports: [DatePipe, TitleCasePipe, FontAwesomeModule],
  templateUrl: './meteo-now.component.html',
  styleUrl: './meteo-now.component.css'
})
export class MeteoNowComponent implements OnInit {

  private readonly meteoService: MeteoService = inject(MeteoService);

  protected meteoNow: Signal<Partial<Meteo>> = this.meteoService.meteoNow;

  // Fontawesome Icons
  faTemperatureHalf = faTemperatureHalf;
  faCloudSunRain = faCloudSunRain;
  faDroplet = faDroplet;
  faRotateRight = faRotateRight;

  ngOnInit(): void {
    this.refresh();
  }

  /**
   * La fonction "refresh" appelle la fonction "getNow" du service "meteoService".
   */
  refresh(): void {
    this.meteoService.getNow();
  }
}
