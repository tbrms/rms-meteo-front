import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  /**
   * La fonction "hourOrMinuteWithTwoDigits" prend un nombre en entrée et renvoie une représentation
   * sous forme de chaîne de ce nombre avec deux chiffres, en ajoutant un zéro non significatif si
   * nécessaire.
   * @param {number} hourOrMinute - Le paramètre « hourOrMinute » est un nombre représentant soit une
   * valeur d'heure, soit une valeur de minute.
   * @returns une représentation sous forme de chaîne du numéro saisi, avec deux chiffres. Si le numéro
   * saisi ne comporte qu’un seul chiffre, un zéro non significatif est ajouté à la chaîne.
   */
  hourOrMinuteWithTwoDigits(hourOrMinute: number): string {
    return hourOrMinute.toString().length === 1 ? `0${hourOrMinute}` : `${hourOrMinute}`;
  }
}
