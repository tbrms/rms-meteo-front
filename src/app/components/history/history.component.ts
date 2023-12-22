import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MeteoService } from '../../services/meteo.service';
import { Meteo } from '../../models/meteo';
import { OopsComponent } from '../oops/oops.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { CommonService } from '../../services/common.service';
import { catchError, concatMap, of, take, tap } from 'rxjs';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [OopsComponent, NgChartsModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly meteoService: MeteoService = inject(MeteoService);
  private readonly commonService: CommonService = inject(CommonService);

  protected enoughData: WritableSignal<boolean> = signal(false);

  protected chartsLabels: string[] = [];
  protected temperatureData: number[] = [];
  protected pressionData: number[] = [];
  protected humidityData: number[] = [];

  ngOnInit(): void {


    /* L'extrait de code utilise les « params » observables à partir de « ActivatedRoute » pour obtenir
    les paramètres de route. Il utilise ensuite l'opérateur `concatMap` pour le chaîner avec la
    méthode `getHistoryWithDuration` du `meteoService`. */
    this.route.params.pipe(
      concatMap((params: Params) => this.meteoService.getHistoryWithDuration(params['duration']).pipe(
        take(1),
        tap((result: Meteo[]) => {
          this.enoughData.set(result.length >= params['duration']);
          result.forEach((element: Partial<Meteo>) => {
            // MAJ charts data
            const date = new Date(element.createdAt as Date);
            this.chartsLabels.unshift(
              `${this.commonService.hourOrMinuteWithTwoDigits(date.getHours())}h${this.commonService.hourOrMinuteWithTwoDigits(date.getMinutes())}`
            );
            this.temperatureData.unshift(element.temperature as number);
            this.pressionData.unshift(element.pression as number);
            this.humidityData.unshift(element.humidite as number);
          });
          this.resetCharts();
        }),
        catchError(error => {
          console.error(`an error has occurred: ${error}`);
          return of('an error has occurred');
        })
      ))
    ).subscribe();
  }

  protected temperatureChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.chartsLabels,
    datasets: [
      {
        data: this.temperatureData,
        label: 'Température °C',
        fill: true,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.8)'
      }
    ]
  };

  protected pressionChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.chartsLabels,
    datasets: [
      {
        data: this.pressionData,
        label: 'Presion hPa',
        fill: true,
        borderColor: 'black',
        backgroundColor: 'rgba(0,0,0,0.3)'
      }
    ]
  };

  protected humidityChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.chartsLabels,
    yLabels: [0,10,20,30,40,50,60,70,80,90,100],
    datasets: [
      {
        data: this.humidityData,
        label: 'Humidité %',
        fill: true,
        borderColor: 'black',
        backgroundColor: 'rgba(0,0,255,0.7)'
      }
    ]
  };

  protected lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };

  protected lineChartLegend = true;

  /**
   * La fonction réinitialise les tableaux de données utilisés pour les graphiques de température, de
   * pression et d'humidité.
   */
  private resetCharts(): void {
    this.chartsLabels = [];
    this.temperatureData = [];
    this.pressionData = [];
    this.humidityData = [];
  }
}
