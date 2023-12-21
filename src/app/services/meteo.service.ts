import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Meteo} from "../models/meteo";
import {catchError, of, take, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MeteoService {

  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly baseUrl: string = 'http://localhost:3000/meteo';

  meteoNow: WritableSignal<Partial<Meteo>> = signal({});
  meteoHistory: WritableSignal<Partial<Meteo>[]> = signal([]);
  enoughData: WritableSignal<boolean> = signal(false);

  constructor() {
    this.getNow();
  }

  /**
   * La fonction `getNow` effectue une requête HTTP GET pour récupérer les informations météorologiques
   * actuelles et met à jour la variable `meteoNow` avec la réponse.
   */
  getNow(): void {
    this.httpClient.get<Meteo>(`${this.baseUrl}/now`).pipe(
      take(1),
      tap((response: Meteo) => {
        this.meteoNow.set(response)
      }),
      catchError(error => {
        console.error(`an error has occurred: ${error}`);
        return of('an error has occurred');
      })
    ).subscribe();
  }

  /**
   * La fonction récupère les données météorologiques historiques pour une durée spécifiée et les
   * stocke dans une variable.
   * @param {number} duration - Le paramètre de durée est un nombre qui représente la période pour
   * laquelle vous souhaitez récupérer les données de l'historique. Il s'agit du nombre d'heures.
   */
  getHistory(duration: number): void {
    this.httpClient.get<Meteo[]>(`${this.baseUrl}/history/${duration}`).pipe(
      take(1),
      tap((response: Meteo[]) => {
        console.log('response: ', response);
        this.enoughData.set(response.length >= duration);
        this.meteoHistory.set(response);
      }),
      catchError(error => {
        console.error(`an error has occurred: ${error}`);
        return of('an error has occurred');
      })
    ).subscribe();
  }
}
