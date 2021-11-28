import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SensorData } from '../models/sensor-data.models';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {

  constructor() { }

  getData(): Observable<SensorData[]> {
    let sensorDataArray: SensorData[] = [];
    this.demoData.map((sensorData) => {
      sensorDataArray.push(new SensorData(sensorData.sensor, sensorData.value, sensorData.timestamp, sensorData.unit))
    })    
    return of(sensorDataArray);
  }

  demoData = [
    { 
      'sensor': 'Temperature', 
      'value': '23', 
      'timestamp': '12345678',
      'unit': '°C'
    },
    { 
      'sensor': 'CO2', 
      'value': '500', 
      'timestamp': '52345678',
      'unit': 'ppm'
    },
    { 
      'sensor': 'Humidity', 
      'value': '37', 
      'timestamp': '92345678',
      'unit': '%H'

    },
  ]
}
