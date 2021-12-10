import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SensorData } from '../models/sensor-data.models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { baseUrl } from '../config/config'

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {

  constructor(private http: HttpClient) { }

  getData(): Observable<SensorData[]> {
    return this.http.get<SensorData[]>(baseUrl + '/sensor').pipe(
      map((sensorData) => {
        let array: SensorData[] = [];
        for (const item of sensorData) {
          array.push(item)
        }
        return array;
      })
    )
    // let sensorDataArray: SensorData[] = [];
    // this.demoData.map((sensorData) => {
    //   sensorDataArray.push(new SensorData(sensorData.sensor, sensorData.value, sensorData.timestamp, sensorData.unit))
    // })    
    // return of(sensorDataArray);
  }

  
  // demoData = [
  //   { 
  //     'sensor': 'Temperature', 
  //     'value': '23', 
  //     'timestamp': '12345678',
  //     'unit': '°C'
  //   },
  //   { 
  //     'sensor': 'CO2', 
  //     'value': '500', 
  //     'timestamp': '52345678',
  //     'unit': 'ppm'
  //   },
  //   { 
  //     'sensor': 'Humidity', 
  //     'value': '37', 
  //     'timestamp': '92345678',
  //     'unit': '%H'

  //   },
  // ]
}
