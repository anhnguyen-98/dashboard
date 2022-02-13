import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AverageData, GraphData, GraphDataApi, Station } from '../models/models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { baseUrl } from '../config/config'

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {
  constructor(private http: HttpClient) { }

  getStations(): Observable<Station[]> { 
    return this.http.get<any>(baseUrl + 'stations').pipe(
      map((stations) => {
        return stations;
      })
    )
  }

  getAverageData(type: string, stationID: number): Observable<AverageData> {
    return this.http.get<any>(baseUrl + type +`/${ stationID }/mean`).pipe(
      map((averageData) => { 
        return new AverageData(averageData.name, averageData.unit, averageData.mean)
      })
    )
  }

  getGraphData(type: string, stationID: number): Observable<GraphDataApi> {
    return this.http.get<GraphDataApi>(baseUrl + type + `/${ stationID }`).pipe(
      map((data: GraphDataApi) => {
        return {
          name: data.name, 
          unit: data.unit, 
          dataArray: data.dataArray.map((element: GraphData) => new GraphData(new Date(element.time), 
          element.data, element.sensor, element.station))
        };
      })
    )
  }
}