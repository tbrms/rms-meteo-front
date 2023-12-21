import { Component, OnInit, Signal, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MeteoService } from '../../services/meteo.service';
import { Meteo } from '../../models/meteo';
import { OopsComponent } from '../oops/oops.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { CommonService } from '../../services/common.service';

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

  protected meteoHistory: Signal<Partial<Meteo>[]> = this.meteoService.meteoHistory;
  protected enoughData: Signal<boolean> = this.meteoService.enoughData;

  protected chartsLabels: string[] = [];
  protected temperatureData: number[] = [];
  protected pressionData: number[] = [];
  protected humidityData: number[] = [];


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.meteoService.getHistory(params['duration']);
      this.meteoHistory().forEach((element: Partial<Meteo>) => {
        const date = new Date(element.createdAt as Date);
        this.chartsLabels.unshift(
          `${this.commonService.hourOrMinuteWithTwoDigits(date.getHours())}h${this.commonService.hourOrMinuteWithTwoDigits(date.getMinutes())}`
        );
        this.temperatureData.unshift(element.temperature as number);
        this.pressionData.unshift(element.pression as number);
        this.humidityData.unshift(element.humidite as number);
      });
      this.chartsLabels = [];
      this.temperatureData = [];
      this.pressionData = [];
      this.humidityData = [];
    });
  }


  protected temperatureChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.chartsLabels,
    datasets: [
      {
        data: this.temperatureData,
        label: 'Température °C',
        fill: true,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
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
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };

  protected humidityChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.chartsLabels,
    datasets: [
      {
        data: this.humidityData,
        label: 'Humidité %',
        fill: true,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };

  protected lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  protected lineChartLegend = true;

}
