import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AverageData, GraphData, Humidity, PM, SensorData, Station } from '../models/sensor-data.models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { baseUrl } from '../config/config'

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {
  
  // 'http:localhost:3000/api/humidity/0/mean'
  // 'http:localhost:3000/api/humidity/0/mean'

  dataType = 
  [
    {
      'name': 'Temparatur',
      'slug': 'temparature'
    },
    { 
      'name': 'CO2-Gehalt',
      'slug': 'co2'
    }, 
    { 
      'name': 'Feuchtigkeit',
      'slug': 'humidity'
    }, 
    // {
    //   'name': 'Helligkeit',
    //   'slug': ''
    // }, 
    {
      'name': 'Druck',
      'slug': 'pressure'
    }, 
    // {
    //   'name': 'Feinstaub',
    //   'slug': ''
    // }
  ]

  constructor(private http: HttpClient) { }

  //methods for calling API
  getStations(): Observable<Station[]> {
    let stations: Station[] = [];   
    this.locationsData.map((station) => {
      stations.push(new Station(station.name, station.id));
    }) 
    return of(stations);
  }

  getAverageData(stationID: number): Observable<AverageData[]> {
    return this.http.get<AverageData>(baseUrl + `temperature` + `${ stationID }` + '/mean').pipe(
      map((averageData) => {
        let averageDataArray : AverageData[] = [];
        averageDataArray.push(new AverageData(averageData.time, averageData.mean, 'Temparature'))
        return averageDataArray;
      })
    )
  }

  getPressure(stationID: string): Observable<GraphData[]> {
    let pressureArray: GraphData[] = [];
    this.http.get<GraphData>(baseUrl + 'pressure' + `${ stationID }`).pipe(
      map((averageData) => {
        pressureArray.push(new GraphData(averageData.time, averageData.data, averageData.sensor, averageData.station, averageData.units));
      })
    )
    return of(pressureArray);
  }
  getParticulateMatter(stationID: string): Observable<GraphData[]> {
    let pmArray: GraphData[] = [];
    this.http.get<GraphData>(baseUrl + 'particulatematter' + `${ stationID }`).pipe(
      map((averageData) => {
        pmArray.push(new GraphData(averageData.time, averageData.data, averageData.sensor, averageData.station, averageData.units))
      })
    )   
    return of(pmArray);
  }
  
  // methods for dummy-daten
  getData(stationID: number): Observable<SensorData[]> {
    let sensorDataArray: SensorData[] = [];
    // for (const stationID of stationIDs) {
      if (stationID === 0) {
        this.dataLocationA.map((sensorData) => {
          sensorDataArray.push(new SensorData(sensorData.sensor, sensorData.value, sensorData.timestamp, sensorData.unit))
        })   
      } else if (stationID === 1 ) {
        this.dataLocationB.map((sensorData) => {
          sensorDataArray.push(new SensorData(sensorData.sensor, sensorData.value, sensorData.timestamp, sensorData.unit))
        })   
      } else if (stationID === 2) {
        this.dataLocationC.map((sensorData) => {
          sensorDataArray.push(new SensorData(sensorData.sensor, sensorData.value, sensorData.timestamp, sensorData.unit))
        })   
      } 
    // }
    return of(sensorDataArray);
  }

  getHumidity(stationID: number): Observable<Humidity[]> {
    let humidityArray: Humidity[] = [];
    this.dataHumidity.map((humidity) => {
      humidityArray.push(new Humidity(new Date(humidity.time), humidity.data, humidity.sensor, humidity.station, humidity.units))
        }) 
    // if (location === 'Location A') {
    //   this.dataLocationA.map((sensorData) => {
    //     sensorDataArray.push(new SensorData(sensorData.sensor, sensorData.value, sensorData.timestamp, sensorData.unit))
    //   })   
    // } else if (location === 'Location B') {
    //   this.dataLocationB.map((sensorData) => {
    //     sensorDataArray.push(new SensorData(sensorData.sensor, sensorData.value, sensorData.timestamp, sensorData.unit))
    //   })   
    // } else if (location === 'Location C') {
    //   this.dataLocationC.map((sensorData) => {
    //     sensorDataArray.push(new SensorData(sensorData.sensor, sensorData.value, sensorData.timestamp, sensorData.unit))
    //   })   
    // } 
    return of(humidityArray);
  }

  getPM(stationID: number): Observable<PM[]> {
    let pmArray: PM[] = [];
    this.dataPM.map((pm) => {
      pmArray.push(new PM(new Date(pm.time), pm.data, pm.sensor, pm.station, pm.units))
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
    {
      'name': 'Station C',
      'id': 2,
    },
  ]
  
  dataLocationA = [
    { 
      'sensor': 'Temperatur', 
      'value': '23', 
      'timestamp': '12345678',
      'unit': '°C'
    },
    { 
      'sensor': 'CO2-Gehalt', 
      'value': '500', 
      'timestamp': '52345678',
      'unit': 'ppm'
    },
    { 
      'sensor': 'Luftfeuchtigkeit', 
      'value': '37', 
      'timestamp': '92345678',
      'unit': '%H'
    },
    { 
      'sensor': 'Helligkeit', 
      'value': '99', 
      'timestamp': '92345678',
      'unit': 'lm'
    },
    { 
      'sensor': 'Druck', 
      'value': '16.2', 
      'timestamp': '92345678',
      'unit': 'hPa'
    },
    { 
      'sensor': 'Feinstaub', 
      'value': '53.1', 
      'timestamp': '92345678',
      'unit': 'µm/m3'
    },
  ]
  dataLocationB = [
    { 
      'sensor': 'Temperatur', 
      'value': '30', 
      'timestamp': '12345678',
      'unit': '°C'
    },
    { 
      'sensor': 'CO2-Gehalt', 
      'value': '498', 
      'timestamp': '52345678',
      'unit': 'ppm'
    },
    { 
      'sensor': 'Luftfeuchtigkeit', 
      'value': '46', 
      'timestamp': '92345678',
      'unit': '%H'
    },
    { 
      'sensor': 'Helligkeit', 
      'value': '93', 
      'timestamp': '92345678',
      'unit': 'lm'
    },
    { 
      'sensor': 'Druck', 
      'value': '17.5', 
      'timestamp': '92345678',
      'unit': 'hPa'
    },
    { 
      'sensor': 'Feinstaub', 
      'value': '53.9', 
      'timestamp': '92345678',
      'unit': 'µm/m3'
    },
  ]
  dataLocationC = [
    { 
      'sensor': 'Temperatur', 
      'value': '10', 
      'timestamp': '12345678',
      'unit': '°C'
    },
    { 
      'sensor': 'CO2-Gehalt', 
      'value': '502', 
      'timestamp': '52345678',
      'unit': 'ppm'
    },
    { 
      'sensor': 'Luftfeuchtigkeit', 
      'value': '39', 
      'timestamp': '92345678',
      'unit': '%H'
    },
    { 
      'sensor': 'Helligkeit', 
      'value': '80', 
      'timestamp': '92345678',
      'unit': 'lm'
    },
    { 
      'sensor': 'Druck', 
      'value': '19.2', 
      'timestamp': '92345678',
      'unit': 'hPa'
    },
    { 
      'sensor': 'Feinstaub', 
      'value': '52.1', 
      'timestamp': '92345678',
      'unit': 'µm/m3'
    },
  ];

  dataHumidity = [
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
  ];


  dataPM = [
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
}
