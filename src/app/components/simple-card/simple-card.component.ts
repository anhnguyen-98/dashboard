import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AverageData } from 'src/app/models/sensor-data.models';
import { SensorDataService } from 'src/app/services/sensor-data.service';

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.css']
})
export class SimpleCardComponent implements OnInit, OnChanges {

  @Input() averageData?: AverageData;
  @Input() dataType: any;
  @Input() selectedStation = 0;

  temperatureA!: AverageData;
  co2A!: AverageData;
  humidityA!: AverageData;
  brightA!: AverageData;
  pressureA!: AverageData;
  pm25amountconc!: AverageData;
  pm10amountconc!: AverageData;
  pm25conc!: AverageData;
  pm10conc!: AverageData;

  constructor(private sensorDataService: SensorDataService) { }

  ngOnChanges(): void {
    this.callingAPI();
  }

  callingAPI() {
    this.sensorDataService.getAverageData(this.dataType.temperature.slug, this.selectedStation).subscribe(data => this.temperatureA = data);
    this.sensorDataService.getAverageData(this.dataType.co2.slug, this.selectedStation).subscribe(data => this.co2A = data);
    this.sensorDataService.getAverageData(this.dataType.humidity.slug, this.selectedStation).subscribe(data => this.humidityA = data);
    this.sensorDataService.getAverageData(this.dataType.pressure.slug, this.selectedStation).subscribe(data => this.pressureA = data);
    this.sensorDataService.getAverageData(this.dataType.bright.slug, this.selectedStation).subscribe(data => this.brightA = data);
    this.sensorDataService.getAverageData(this.dataType.pm25amountconc.slug, this.selectedStation).subscribe(data => this.pm25amountconc = data);
    this.sensorDataService.getAverageData(this.dataType.pm10amountconc.slug, this.selectedStation).subscribe(data => this.pm10amountconc = data);
    this.sensorDataService.getAverageData(this.dataType.pm25conc.slug, this.selectedStation).subscribe(data => this.pm25conc = data);
    this.sensorDataService.getAverageData(this.dataType.pm10conc.slug, this.selectedStation).subscribe(data => this.pm10conc = data);
    
  }
  ngOnInit(): void {
    
  }

}
