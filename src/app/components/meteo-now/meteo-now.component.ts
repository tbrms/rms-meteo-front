import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {MeteoService} from "../../services/meteo.service";
import {Meteo} from "../../models/meteo";
import {async} from "rxjs";

@Component({
  selector: 'app-meteo-now',
  standalone: true,
  imports: [],
  templateUrl: './meteo-now.component.html',
  styleUrl: './meteo-now.component.css'
})
export class MeteoNowComponent implements OnInit {

  protected meteoNow: WritableSignal<Meteo | null> = signal(null);
  private readonly meteoService: MeteoService = inject(MeteoService);

  ngOnInit(): void {
    this.getNow();
  }

  getNow() {
    this.meteoNow.update(this.meteoService.meteoNow);
    console.log('meteoNow in component', this.meteoNow())
  }
}
