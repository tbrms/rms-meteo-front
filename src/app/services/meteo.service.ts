import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Meteo} from "../models/meteo";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MeteoService {

  private readonly baseUrl: string = 'http://localhost:3000/meteo';
  private readonly httpClient: HttpClient = inject(HttpClient);
  meteoNow: WritableSignal<Meteo | null> = signal(null);

  constructor() {
    this.getNow();
  }

  getNow(): void {
    this.httpClient.get<Meteo>(`${this.baseUrl}/now`).pipe(
      tap((response: Meteo) => {
        console.log('Response getNow()', response);
        this.meteoNow.set(response)
      })
    ).subscribe();
  }
}
