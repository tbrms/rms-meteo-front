import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Meteo} from "../models/meteo";
import {catchError, Observable, of, take, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MeteoService {

  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly baseUrl: string = 'http://localhost:3000/meteo';

  meteoNow: WritableSignal<Partial<Meteo>> = signal({});

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
   * La fonction `getHistoryWithDuration` renvoie un observable de type `Meteo[]` en effectuant une
   * requête HTTP GET vers une URL spécifiée avec une durée donnée.
   * @param {number} duration - Le paramètre de durée est un nombre qui représente la durée pendant
   * laquelle vous souhaitez récupérer l'historique météo. Cela peut être en minutes, heures, jours ou
   * toute autre unité de temps selon la façon dont l'API backend est conçue.
   * @returns un observable de type Meteo[].
   */
  getHistoryWithDuration(duration: number): Observable<Meteo[]> {
    return this.httpClient.get<Meteo[]>(`${this.baseUrl}/history/${duration}`);
  }
}
