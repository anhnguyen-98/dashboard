import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AverageData, GraphData, Station } from 'src/app/models/sensor-data.models';
import { SensorDataService } from 'src/app/services/sensor-data.service';
import { GraphComponent } from '../graph/graph.component';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  averageDataArray: AverageData[] = [];
  tempAverage?: AverageData;;
  graphData!: any[];
  humidityData!: GraphData[];
  pressureData!: GraphData[];
  pmData!: GraphData[];
  xData!: GraphData[];
  stations!: Station[];
  selectedStation!: number;

  @Output() changeStationEmitter = new EventEmitter();
  @ViewChild(GraphComponent) private graphComponent?: GraphComponent;

  constructor(private sensorDataService: SensorDataService) { }

  ngOnInit(): void {
    this.sensorDataService.getStation().subscribe(station => this.stations = station);
    this.selectedStation = this.stations[0].id;

    this.sensorDataService.getTemparatureAverage(this.selectedStation).subscribe(tempAverage => this.tempAverage = tempAverage);
    this.sensorDataService.getPressure(this.selectedStation).subscribe(pressureData => this.pressureData = pressureData);
    // this.callAPI(this.selectedStation);
    // console.log(this.selectedStation);
    
    this.sensorDataService.getData(this.selectedStation).subscribe(data => this.averageDataArray = data);
    this.sensorDataService.getHumidity(this.selectedStation).subscribe(humidity => this.humidityData = humidity);
    this.sensorDataService.getPM(this.selectedStation).subscribe(pm => this.pmData = pm);
    this.sensorDataService.getX(this.selectedStation).subscribe(x => this.xData = x);
  }

  onSelectStation(event: any) {
    this.selectedStation = event.value;
    // console.log(this.selectedStation);
    
    // this.callAPI(this.selectedStation);
    this.sensorDataService.getData(this.selectedStation).subscribe(data => this.averageDataArray = data);
    
    // this.sensorDataService.getHumidity(this.selectedStation[0]).subscribe(humidity => this.pmData = humidity);
    // this.sensorDataService.getPM(this.selectedStation[0]).subscribe(pm => this.humidityData = pm);
    // this.graphComponent?.update(this.pmData);
    // console.log(this.sensorData);
    if (this.selectedStation === 0) {
      this.graphComponent?.update1(this.humidityData);
      this.graphComponent?.update2(this.pmData);
    } else if (this.selectedStation === 1) {
      this.graphComponent?.update1(this.pmData);
      this.graphComponent?.update2(this.xData);
    } else if (this.selectedStation === 2) {
      this.graphComponent?.update1(this.xData);
      this.graphComponent?.update2(this.humidityData);
    }
  }


  // callAPI(stationID: number) {
  //   this.sensorDataService.getTemparatureAverage(stationID).subscribe((averageTemparature) => this.averageDataArray.push(averageTemparature));
  //   this.sensorDataService.getCo2Average(stationID).subscribe((averageCo2) => this.averageDataArray.push(averageCo2));
  //   this.sensorDataService.getHumidityAverage(stationID).subscribe((averageHumidity) => this.averageDataArray.push(averageHumidity));
  //   this.sensorDataService.getBrightAverage(stationID).subscribe((averageBright) => this.averageDataArray.push(averageBright));
  //   this.sensorDataService.getPressureAverage(stationID).subscribe((averagePressure) => this.averageDataArray.push(averagePressure));
  //   this.sensorDataService.getParticulateMatterAverage(stationID).subscribe((averagePM) => this.averageDataArray.push(averagePM));
  // }

}
