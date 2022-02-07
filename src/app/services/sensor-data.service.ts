import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AverageData, GraphData, GraphDataApi, Station } from '../models/sensor-data.models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { baseUrl } from '../config/config'

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {
  constructor(private http: HttpClient) { }

   //methods for calling API
  getStations(): Observable<Station[]> {
    return this.http.get<any>(baseUrl + 'stations').pipe(
      map((station) => {
        return station;
      })
    )
  }

  getAverageData(type: string, stationID: number): Observable<AverageData> {
    return this.http.get<any>(baseUrl + type +`/${ stationID }/mean`).pipe(
      map((averageData) => { 
        console.log(averageData);
        return new AverageData(averageData[0].mean, averageData[0].name, averageData[0].unit, averageData[0].time);
      })
    )
  }

  getGraphData(type: string, stationID: number): Observable<GraphDataApi> {
    return this.http.get<GraphDataApi>(baseUrl + type + `/${ stationID }`).pipe(
      map((data: GraphDataApi) => {
        console.log(data);
        return {
          name: data.name, 
          unit: data.unit, 
          dataArray: data.dataArray.map((element: GraphData) => new GraphData(new Date(element.time), 
          element.data, element.sensor, element.station))
        };
      })
    )
  }
  // getTemperatureAverage(stationID: number): Observable<AverageData> {
  //   return this.http.get<AverageData>(baseUrl + `temperature/${ stationID }/mean`).pipe(
  //     map((averageData) => {
  //       return new AverageData(averageData.mean, averageData.name, averageData.units, averageData.time,);
  //     })
  //   )
  // }
  // getCo2Average(stationID: number): Observable<AverageData> {
  //   return this.http.get<AverageData>(baseUrl + `co2/${ stationID }/mean`).pipe(
  //     map((averageData) => {
  //       return new AverageData(averageData.mean, 'CO2-Gehalt', 'ppm', averageData.time);
  //     })
  //   )
  // }
  // getHumidityAverage(stationID: number): Observable<AverageData> {
  //   return this.http.get<AverageData>(baseUrl + `humidity/${ stationID }/mean`).pipe(
  //     map((averageData) => {
  //       return new AverageData(averageData.mean, 'Luftfeuchtigkeit', '%H', averageData.time);
  //     })
  //   )
  // }
  // getBrightAverage(stationID: number): Observable<AverageData> {
  //   return this.http.get<AverageData>(baseUrl + `???` + `/${ stationID }` + '/mean').pipe(
  //     map((averageData) => {
  //       return new AverageData(averageData.mean, 'Helligkeit', 'lm', averageData.time);
  //     })
  //   )
  // }
  // getPressureAverage(stationID: number): Observable<AverageData> {
  //   return this.http.get<AverageData>(baseUrl + `pressure/${ stationID }/mean`).pipe(
  //     map((averageData) => {
  //       return new AverageData(averageData.mean, 'Druck', 'hPa', averageData.time);
  //     })
  //   )
  // }
  // getParticulateMatterAverage(stationID: number): Observable<AverageData> {
  //   return this.http.get<AverageData>(baseUrl + `particulatematter/${ stationID }/mean`).pipe(
  //     map((averageData) => {
  //       return new AverageData(averageData.mean, 'Feinstaub', 'µm/m3', averageData.time);
  //     })
  //   )
  // }

  // getAverageArray(stationID: number) : Observable<AverageData[]> {
  //   let averageDataArray: AverageData[] = [];

  //   this.getTemperatureAverage(stationID).subscribe((averageTemperature) => averageDataArray.push(averageTemperature));
  //   this.getCo2Average(stationID).subscribe((averageCo2) => averageDataArray.push(averageCo2));
  //   this.getHumidityAverage(stationID).subscribe((averageHumidity) => averageDataArray.push(averageHumidity));
  //   this.getBrightAverage(stationID).subscribe((averageBright) => averageDataArray.push(averageBright));
  //   this.getPressureAverage(stationID).subscribe((averagePressure) => averageDataArray.push(averagePressure));
  //   this.getParticulateMatterAverage(stationID).subscribe((averagePM) => averageDataArray.push(averagePM));

  //   return of(averageDataArray);
  // }

  

  // methods for dummy-daten
  getStation(): Observable<Station[]> {
    let stations: Station[] = [];   
    this.locationsData.map((station) => {
      stations.push(new Station(station.name, station.id));
    }) 
    return of(stations);
  }

  getData(stationID: number): Observable<AverageData[]> {
    let averageDataArray: AverageData[] = [];
    // for (const stationID of stationIDs) {
      if (stationID === 0) {
        this.dataLocationA.map((averageData) => {
          averageDataArray.push(new AverageData(averageData.value, averageData.sensor, averageData.unit))
        })   
      } else if (stationID === 1 ) {
        this.dataLocationB.map((averageData) => {
          averageDataArray.push(new AverageData(averageData.value, averageData.sensor, averageData.unit))
        })   
      } else if (stationID === 2) {
        this.dataLocationC.map((averageData) => {
          averageDataArray.push(new AverageData(averageData.value, averageData.sensor, averageData.unit))
        })   
      } 
    // }
    return of(averageDataArray);
  }

  getTemperature(stationID: number): Observable<GraphData[]> {
    let temperatureArray: GraphData[] = [];
    this.dataGraph2.map((humidity) => {
      temperatureArray.push(new GraphData(new Date(humidity.time), humidity.data, humidity.sensor, humidity.station))
        })
    return of(temperatureArray);
  }
  getCo2(stationID: number): Observable<GraphData[]> {
    let humidityArray: GraphData[] = [];
    this.dataGraph2.map((humidity) => {
      humidityArray.push(new GraphData(new Date(humidity.time), humidity.data, humidity.sensor, humidity.station))
        })
    return of(humidityArray);
  }
  getHumidity(stationID: number): Observable<GraphData[]> {
    let humidityArray: GraphData[] = [];
    this.dataGraph2.map((humidity) => {
      humidityArray.push(new GraphData(new Date(humidity.time), humidity.data, humidity.sensor, humidity.station))
        })
    return of(humidityArray);
  }

  getPM(stationID: number): Observable<any> {
    let pmArray: GraphData[] = [];
    this.dataGraph2.map((pm) => {
      pmArray.push(new GraphData(new Date(pm.time), pm.data, pm.sensor, pm.station))
        }) 
    return of({name: 'Feinstaub', pmArray});
  }
  getX(stationID: number): Observable<GraphData[]> {
    let pmArray: GraphData[] = [];
    this.dataGraph3.map((pm) => {
      pmArray.push(new GraphData(new Date(pm.time), pm.data, pm.sensor, pm.station))
        }) 
    return of(pmArray);
  }

  locationsData = [
    {
      'name': 'Station A',
      'id': 0,
    },
    {
      'name': 'Station B',
      'id': 1,
    },
  ]
  
  dataLocationA = [
    { 
      'sensor': 'Temperatur', 
      'value': 23, 
      'timestamp': '12345678',
      'unit': '°C'
    },
    { 
      'sensor': 'CO2-Gehalt', 
      'value': 500, 
      'timestamp': '52345678',
      'unit': 'ppm'
    },
    { 
      'sensor': 'Luftfeuchtigkeit', 
      'value': 37, 
      'timestamp': '92345678',
      'unit': '%H'
    },
    { 
      'sensor': 'Druck', 
      'value': 16.2, 
      'timestamp': '92345678',
      'unit': 'hPa'
    },
    { 
      'sensor': 'Feinstaub PM2.5', 
      'value': 53.9, 
      'timestamp': '92345678',
      'unit': 'µm/m3'
    },
    { 
      'sensor': 'Feinstaub PM10', 
      'value': 70.1, 
      'timestamp': '92345678',
      'unit': 'µm/m3'
    },
  ]
  dataLocationB = [
    { 
      'sensor': 'Temperatur', 
      'value': 30, 
      'timestamp': '12345678',
      'unit': '°C'
    },
    { 
      'sensor': 'CO2-Gehalt', 
      'value': 498.2, 
      'timestamp': '52345678',
      'unit': 'ppm'
    },
    { 
      'sensor': 'Luftfeuchtigkeit', 
      'value': 46.3, 
      'timestamp': '92345678',
      'unit': '%H'
    },
    { 
      'sensor': 'Helligkeit', 
      'value': 93.5, 
      'timestamp': '92345678',
      'unit': 'lm'
    },
    { 
      'sensor': 'Druck', 
      'value': 17.5, 
      'timestamp': '92345678',
      'unit': 'hPa'
    },
    { 
      'sensor': 'Feinstaub', 
      'value': 53.9, 
      'timestamp': '92345678',
      'unit': 'µm/m3'
    },
  ]
  dataLocationC = [
    { 
      'sensor': 'Temperatur', 
      'value': 10.3, 
      'timestamp': '12345678',
      'unit': '°C'
    },
    { 
      'sensor': 'CO2-Gehalt', 
      'value': 502.2, 
      'timestamp': '52345678',
      'unit': 'ppm'
    },
    { 
      'sensor': 'Luftfeuchtigkeit', 
      'value': 39.1, 
      'timestamp': '92345678',
      'unit': '%H'
    },
    { 
      'sensor': 'Helligkeit', 
      'value': 80.5, 
      'timestamp': '92345678',
      'unit': 'lm'
    },
    { 
      'sensor': 'Druck', 
      'value': 19.2, 
      'timestamp': '92345678',
      'unit': 'hPa'
    },
    { 
      'sensor': 'Feinstaub', 
      'value': 52.1, 
      'timestamp': '92345678',
      'unit': 'µm/m3'
    },
  ];

  dataHumidity = {
  unit: "%H",
  name: "Humidity",
  dataArray : [
    {
    "time": "2021-12-11T23:00:22.000Z",
    "data": 50.47963234709777,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-11T23:15:22.000Z",
    "data": 53.47963234709777,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-11T23:30:22.000Z",
    "data": 45.47963234709777,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-11T23:45:30.000Z",
    "data": 46.76583281057673,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T00:00:30.000Z",
    "data": 49.76583281057673,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T00:15:35.000Z",
    "data": 52.8573386303479,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T00:30:35.000Z",
    "data": 51.8573386303479,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T00:45:35.000Z",
    "data": 49.8573386303479,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T01:00:37.000Z",
    "data": 53.46635999878657,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T01:15:38.000Z",
    "data": 46.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T01:30:38.000Z",
    "data": 51.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T01:45:38.000Z",
    "data": 45.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T02:00:38.000Z",
    "data": 41.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T02:15:38.000Z",
    "data": 45.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T02:30:38.000Z",
    "data": 48.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T02:45:38.000Z",
    "data": 47.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T03:00:38.000Z",
    "data": 45.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T03:15:38.000Z",
    "data": 46.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T03:30:38.000Z",
    "data": 45.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T03:45:38.000Z",
    "data": 47.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T04:00:38.000Z",
    "data": 49.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T04:15:38.000Z",
    "data": 50.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T04:31:08.000Z",
    "data": 49.59461523233687,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T04:45:08.000Z",
    "data": 51.59461523233687,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T05:00:28.000Z",
    "data": 45.358119561928454,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T05:15:28.000Z",
    "data": 44.358119561928454,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T05:30:28.000Z",
    "data": 47.358119561928454,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T05:45:28.000Z",
    "data": 46.358119561928454,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T06:00:28.000Z",
    "data": 45.358119561928454,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T06:15:01.000Z",
    "data": 47.93046690274054,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T06:30:01.000Z",
    "data": 46.93046690274054,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T06:45:01.000Z",
    "data": 47.93046690274054,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T07:00:01.000Z",
    "data": 46.93046690274054,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T07:15:01.000Z",
    "data": 47.93046690274054,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T07:30:26.000Z",
    "data": 48.68357520333397,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T07:45:26.000Z",
    "data": 49.68357520333397,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T08:00:59.000Z",
    "data": 52.2746047816262,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T08:15:31.000Z",
    "data": 51.239490712613815,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T08:30:35.000Z",
    "data": 53.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T08:45:35.000Z",
    "data": 51.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T09:00:35.000Z",
    "data": 49.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T09:15:35.000Z",
    "data": 50.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T09:30:35.000Z",
    "data": 47.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T09:45:35.000Z",
    "data": 48.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T10:00:35.000Z",
    "data": 47.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T10:15:35.000Z",
    "data": 51.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T10:30:35.000Z",
    "data": 50.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T10:45:35.000Z",
    "data": 51.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T11:00:35.000Z",
    "data": 50.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T11:15:35.000Z",
    "data": 47.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T11:30:35.000Z",
    "data": 48.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T11:45:35.000Z",
    "data": 46.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T12:00:35.000Z",
    "data": 47.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T12:15:35.000Z",
    "data": 50.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T12:30:35.000Z",
    "data": 51.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T12:45:35.000Z",
    "data": 48.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T13:00:35.000Z",
    "data": 49.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T13:15:43.000Z",
    "data": 49.711473017395676,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T13:30:43.000Z",
    "data": 48.711473017395676,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T13:45:43.000Z",
    "data": 49.711473017395676,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T14:00:43.000Z",
    "data": 47.711473017395676,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T14:15:43.000Z",
    "data": 48.711473017395676,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T14:30:43.000Z",
    "data": 46.711473017395676,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T14:45:43.000Z",
    "data": 48.711473017395676,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T15:00:43.000Z",
    "data": 47.711473017395676,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T15:15:43.000Z",
    "data": 44.711473017395676,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T15:30:43.000Z",
    "data": 47.711473017395676,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T15:45:25.000Z",
    "data": 48.4364690550994,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T16:00:27.000Z",
    "data": 54.31021471541145,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T16:15:10.000Z",
    "data": 51.04051567997523,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T16:30:10.000Z",
    "data": 50.04051567997523,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T16:45:10.000Z",
    "data": 50.04051567997523,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T17:00:10.000Z",
    "data": 51.04051567997523,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T17:15:10.000Z",
    "data": 52.04051567997523,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T17:30:10.000Z",
    "data": 51.04051567997523,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T17:45:10.000Z",
    "data": 49.04051567997523,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T18:00:10.000Z",
    "data": 51.04051567997523,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T18:15:10.000Z",
    "data": 50.04051567997523,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T18:30:10.000Z",
    "data": 51.04051567997523,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T18:45:10.000Z",
    "data": 52.04051567997523,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T19:00:54.000Z",
    "data": 50.9466184960919,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T19:15:54.000Z",
    "data": 51.9466184960919,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T19:30:54.000Z",
    "data": 52.9466184960919,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T19:45:54.000Z",
    "data": 50.9466184960919,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T20:00:31.000Z",
    "data": 47.68647259671427,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T20:15:40.000Z",
    "data": 49.06969484577621,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T20:30:40.000Z",
    "data": 47.06969484577621,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T20:45:40.000Z",
    "data": 50.06969484577621,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T21:00:40.000Z",
    "data": 49.06969484577621,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T21:15:40.000Z",
    "data": 51.06969484577621,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T21:30:40.000Z",
    "data": 52.06969484577621,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T21:45:40.000Z",
    "data": 51.06969484577621,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T22:00:40.000Z",
    "data": 53.06969484577621,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T22:15:40.000Z",
    "data": 51.06969484577621,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T22:30:40.000Z",
    "data": 50.06969484577621,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
    {
    "time": "2021-12-12T22:45:40.000Z",
    "data": 52.06969484577621,
    "sensor": "201",
    "station": "0",
    "units": "%H"
    },
  ]
}

  dataGraph2 = [
    {
    "time": "2021-12-11T23:00:22",
    "data": 45.47963234709777,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-11T23:15:22.000Z",
    "data": 46.47963234709777,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-11T23:30:22.000Z",
    "data": 47.47963234709777,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-11T23:45:30.000Z",
    "data": 46.76583281057673,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T00:00:30.000Z",
    "data": 45.76583281057673,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T00:15:35.000Z",
    "data": 45.8573386303479,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T00:30:35.000Z",
    "data": 44.8573386303479,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T00:45:35.000Z",
    "data": 49.8573386303479,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T01:00:37.000Z",
    "data": 47.46635999878657,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T01:15:38.000Z",
    "data": 46.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T01:30:38.000Z",
    "data": 51.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T01:45:38.000Z",
    "data": 45.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T02:00:38.000Z",
    "data": 41.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T02:15:38.000Z",
    "data": 45.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T02:30:38.000Z",
    "data": 48.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T02:45:38.000Z",
    "data": 51.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T03:00:38.000Z",
    "data": 45.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T03:15:38.000Z",
    "data": 46.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T03:30:38.000Z",
    "data": 45.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T03:45:38.000Z",
    "data": 47.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T04:00:38.000Z",
    "data": 49.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T04:15:38.000Z",
    "data": 44.346140226125556,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T04:31:08.000Z",
    "data": 49.59461523233687,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T04:45:08.000Z",
    "data": 51.59461523233687,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T05:00:28.000Z",
    "data": 45.358119561928454,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T05:15:28.000Z",
    "data": 44.358119561928454,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T05:30:28.000Z",
    "data": 47.358119561928454,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T05:45:28.000Z",
    "data": 46.358119561928454,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T06:00:28.000Z",
    "data": 45.358119561928454,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T06:15:01.000Z",
    "data": 47.93046690274054,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T06:30:01.000Z",
    "data": 46.93046690274054,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T06:45:01.000Z",
    "data": 47.93046690274054,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T07:00:01.000Z",
    "data": 46.93046690274054,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T07:15:01.000Z",
    "data": 47.93046690274054,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T07:30:26.000Z",
    "data": 48.68357520333397,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T07:45:26.000Z",
    "data": 49.68357520333397,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T08:00:59.000Z",
    "data": 43.2746047816262,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T08:15:31.000Z",
    "data": 51.239490712613815,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T08:30:35.000Z",
    "data": 53.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T08:45:35.000Z",
    "data": 51.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T09:00:35.000Z",
    "data": 49.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T09:15:35.000Z",
    "data": 50.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T09:30:35.000Z",
    "data": 53.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T09:45:35.000Z",
    "data": 48.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T10:00:35.000Z",
    "data": 47.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T10:15:35.000Z",
    "data": 51.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T10:30:35.000Z",
    "data": 50.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T10:45:35.000Z",
    "data": 51.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T11:00:35.000Z",
    "data": 50.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T11:15:35.000Z",
    "data": 47.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T11:30:35.000Z",
    "data": 48.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T11:45:35.000Z",
    "data": 46.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T12:00:35.000Z",
    "data": 47.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T12:15:35.000Z",
    "data": 50.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T12:30:35.000Z",
    "data": 51.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T12:45:35.000Z",
    "data": 48.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T13:00:35.000Z",
    "data": 49.772479938658435,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T13:15:43.000Z",
    "data": 49.711473017395676,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T13:30:43.000Z",
    "data": 51.711473017395676,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T13:45:43.000Z",
    "data": 49.711473017395676,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T14:00:43.000Z",
    "data": 52.711473017395676,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T14:15:43.000Z",
    "data": 48.711473017395676,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T14:30:43.000Z",
    "data": 51.711473017395676,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T14:45:43.000Z",
    "data": 48.711473017395676,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T15:00:43.000Z",
    "data": 50.711473017395676,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T15:15:43.000Z",
    "data": 44.711473017395676,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T15:30:43.000Z",
    "data": 47.711473017395676,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T15:45:25.000Z",
    "data": 51.4364690550994,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T16:00:27.000Z",
    "data": 47.31021471541145,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T16:15:10.000Z",
    "data": 51.04051567997523,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T16:30:10.000Z",
    "data": 44.04051567997523,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T16:45:10.000Z",
    "data": 45.04051567997523,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T17:00:10.000Z",
    "data": 47.04051567997523,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T17:15:10.000Z",
    "data": 52.04051567997523,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T17:30:10.000Z",
    "data": 51.04051567997523,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T17:45:10.000Z",
    "data": 49.04051567997523,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T18:00:10.000Z",
    "data": 51.04051567997523,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T18:15:10.000Z",
    "data": 50.04051567997523,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T18:30:10.000Z",
    "data": 51.04051567997523,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T18:45:10.000Z",
    "data": 52.04051567997523,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T19:00:54.000Z",
    "data": 50.9466184960919,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T19:15:54.000Z",
    "data": 51.9466184960919,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T19:30:54.000Z",
    "data": 52.9466184960919,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T19:45:54.000Z",
    "data": 50.9466184960919,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T20:00:31.000Z",
    "data": 47.68647259671427,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T20:15:40.000Z",
    "data": 49.06969484577621,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T20:30:40.000Z",
    "data": 47.06969484577621,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T20:45:40.000Z",
    "data": 46.06969484577621,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T21:00:40.000Z",
    "data": 45.06969484577621,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T21:15:40.000Z",
    "data": 46.06969484577621,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T21:30:40.000Z",
    "data": 44.06969484577621,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T21:45:40.000Z",
    "data": 45.06969484577621,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T22:00:40.000Z",
    "data": 53.06969484577621,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T22:15:40.000Z",
    "data": 51.06969484577621,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T22:30:40.000Z",
    "data": 50.06969484577621,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
    {
    "time": "2021-12-12T22:45:40.000Z",
    "data": 52.06969484577621,
    "sensor": "201",
    "station": "0",
    "units": "µm/m3"
    },
  ];

  dataGraph3 = [
    {
    "time": "2021-12-11T23:00:18.000Z",
    "data": 47.976776592156774,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-11T23:04:28.000Z",
    "data": 52.042099203553775,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-11T23:58:55.000Z",
    "data": 48.11170638839452,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T00:03:05.000Z",
    "data": 49.9101590430957,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T01:03:06.000Z",
    "data": 54.025285448526894,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T01:03:31.000Z",
    "data": 45.80478693311881,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T01:40:56.000Z",
    "data": 52.48468470222107,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T04:37:01.000Z",
    "data": 51.49260869128676,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T05:31:34.000Z",
    "data": 48.42812520057013,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T05:33:08.000Z",
    "data": 47.05221947585801,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T05:41:07.000Z",
    "data": 47.33244762632522,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T06:09:56.000Z",
    "data": 53.476965049490914,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T06:10:33.000Z",
    "data": 47.41031675875326,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T06:51:51.000Z",
    "data": 50.14191560381108,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T07:20:37.000Z",
    "data": 52.791195988603825,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T07:54:42.000Z",
    "data": 51.143506779166714,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T08:33:54.000Z",
    "data": 45.38249234471207,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T08:53:33.000Z",
    "data": 47.33874076225132,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T09:04:10.000Z",
    "data": 46.23895741924818,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T09:14:02.000Z",
    "data": 53.243304539536425,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T10:37:15.000Z",
    "data": 47.9381035929664,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T10:38:46.000Z",
    "data": 46.63022783012801,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T10:53:35.000Z",
    "data": 52.30601440568743,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T12:26:46.000Z",
    "data": 50.80506668766504,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T12:38:16.000Z",
    "data": 49.68724234618072,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T12:38:27.000Z",
    "data": 49.26870876972401,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T12:39:19.000Z",
    "data": 52.52922567331222,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T12:41:50.000Z",
    "data": 47.33486791368825,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T12:57:00.000Z",
    "data": 45.16842891353535,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T13:15:33.000Z",
    "data": 50.346281859219026,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T13:23:04.000Z",
    "data": 54.73733658301015,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T14:59:41.000Z",
    "data": 52.28018689546171,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T15:30:13.000Z",
    "data": 50.088293051761326,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T17:32:22.000Z",
    "data": 54.28622712703327,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T18:36:16.000Z",
    "data": 49.761978586752996,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T20:05:28.000Z",
    "data": 53.97738803441648,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T20:21:11.000Z",
    "data": 50.309698801118714,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T21:20:56.000Z",
    "data": 45.382604468172104,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T22:13:20.000Z",
    "data": 52.608981173446836,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T22:29:34.000Z",
    "data": 51.25869685355215,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T22:41:44.000Z",
    "data": 53.70873710130357,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    },
    {
    "time": "2021-12-12T22:53:10.000Z",
    "data": 54.73789558893531,
    "sensor": "201",
    "station": "1",
    "units": "%H"
    }
  ]
}
