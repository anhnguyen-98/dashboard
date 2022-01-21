import { Component, Input, OnInit } from '@angular/core';
import { AverageData, SensorData } from 'src/app/models/sensor-data.models';

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.css']
})
export class SimpleCardComponent implements OnInit {

  @Input() sensorData?: SensorData;
  @Input() averageData?: AverageData;
  constructor() { }

  ngOnInit(): void {
    
  }

}
