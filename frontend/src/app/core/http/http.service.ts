import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiURL = "http://3.122.113.193:3000";
  public accidentablididad = new BehaviorSubject<any>([]);

  constructor(private httpClient: HttpClient) {
  }

  public getAccidentabilidad() {
    return this.httpClient.get(this.apiURL + '/accidentabilidad');
  }

  public getAutobuses() {
    return this.httpClient.get(this.apiURL + '/autobuses');
  }

  public getCercanias() {
    return this.httpClient.get(this.apiURL + '/cercanias');
  }

  public getContacus() {
    return this.httpClient.get(this.apiURL + '/contacus');
  }

  public getInterurbano() {
    return this.httpClient.get(this.apiURL + '/interurbano');
  }

  public getMetro() {
    return this.httpClient.get(this.apiURL + '/metro');
  }

  public getMetroLigero() {
    return this.httpClient.get(this.apiURL + '/metroligero');
  }

  public getPatines() {
    return this.httpClient.get(this.apiURL + '/patinetes');
  }

  public getTaxi() {
    return this.httpClient.get(this.apiURL + '/taxi');
  }

  public getTrafico() {
    return this.httpClient.get(this.apiURL + '/trafico');
  }

  public getUbiAcustica() {
    return this.httpClient.get(this.apiURL + 'ubiacustica');
  }
}
