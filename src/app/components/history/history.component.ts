import { Component, OnInit, Signal, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MeteoService } from '../../services/meteo.service';
import { Meteo } from '../../models/meteo';
import { OopsComponent } from '../oops/oops.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [OopsComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly meteoService: MeteoService = inject(MeteoService);

  protected meteoHistory: Signal<Partial<Meteo>[]> = this.meteoService.meteoHistory;
  protected enoughData: Signal<boolean> = this.meteoService.enoughData;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.meteoService.getHistory(params['duration']);
    })
  }

}
