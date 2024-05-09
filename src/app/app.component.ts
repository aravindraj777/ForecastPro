import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './services/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            CommonModule,
            HttpClientModule,
            FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  weatherData?:any;
  cityName:string = 'Trivandrum';

constructor(private weatherService:WeatherService){

}

  ngOnInit(): void {
   
   this.getWeatherData(this.cityName);
   this.cityName = '';
  }

  onSubmit(){
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }
 
  private getWeatherData(cityName:string){
    this.weatherService.getWeatherData(cityName)
    .subscribe({
      next: (response)=> {
        this.weatherData = response;
        this.weatherData.main.temp = this.convertToFahrenheit(this.weatherData.main.temp);
        this.weatherData.main.temp_min = this.convertToFahrenheit(this.weatherData.main.temp_min);
        this.weatherData.main.temp_max = this.convertToFahrenheit(this.weatherData.main.temp_max);
        console.log(response);
        
      }
    });
  }

  convertToFahrenheit(temp: number): number {
    return (temp - 32) * (5 / 9);
  }
}
