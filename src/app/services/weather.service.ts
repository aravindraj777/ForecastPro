import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http:HttpClient) { }

  getWeatherData(cityName:string):Observable<any>{
   return this._http.get(environment.weatherApiBaseUrl,{
      headers: new HttpHeaders ()
      .set(environment.XRapidAPIHostHeaderName,environment.XRapidAPIHostHeaderValue)
      .set(environment.XRapidAPIKeyHeaderName,environment.XRapidAPIKeyHeaderValue),
      params: new HttpParams()
      .set('city',cityName)
      .set('units','metric')
      .set('mode','json')
    })
  }
}
