import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AverageData, Humidity, PM, SensorData, Station } from 'src/app/models/sensor-data.models';
import { SensorDataService } from 'src/app/services/sensor-data.service';
import { GraphComponent } from '../graph/graph.component';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  sensorData!: SensorData[];
  averageDataArray!: AverageData[];
  graphData!: any[];
  humidityData!: Humidity[];
  pmData!: PM[];
  stations!: Station[];
  selectedLocation!: number;

  @Output() changeStationEmitter = new EventEmitter();
  @ViewChild(GraphComponent) private graphComponent?: GraphComponent;

  constructor(private sensorDataService: SensorDataService) { }

  ngOnInit(): void {
    this.sensorDataService.getStations().subscribe(station => this.stations = station);
    this.selectedLocation = this.stations[0].id;

    this.sensorDataService.getAverageData(this.selectedLocation).subscribe((averageArray) => this.averageDataArray = averageArray);
    console.log(this.averageDataArray);
    
    this.sensorDataService.getData(this.selectedLocation).subscribe(data => this.sensorData = data);
    this.sensorDataService.getHumidity(this.selectedLocation).subscribe(humidity => this.humidityData = humidity);
    this.sensorDataService.getPM(this.selectedLocation).subscribe(pm => this.pmData = pm);
  }

  onSelectLocation(event: any) {
    // console.log(event.value);
    
      this.sensorDataService.getData(event.value).subscribe(data => this.sensorData = data);
    
    // this.sensorDataService.getHumidity(this.selectedLocation[0]).subscribe(humidity => this.pmData = humidity);
    // this.sensorDataService.getPM(this.selectedLocation[0]).subscribe(pm => this.humidityData = pm);
    // this.graphComponent?.update(this.pmData);
    // console.log(this.sensorData);
    if (event.value === 0) {
      this.graphComponent?.update1(this.humidityData);
      this.graphComponent?.update2(this.pmData);
    } else if (event.value === 1) {
      this.graphComponent?.update1(this.pmData);
      this.graphComponent?.update2(this.humidityData);
    } else if (event.value === 2) {
      this.graphComponent?.update1(this.humidityData);
      this.graphComponent?.update2(this.pmData);
    }
  }

}
