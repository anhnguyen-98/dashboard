import { Component, OnInit } from '@angular/core';
import { AverageData, Station } from 'src/app/models/models';
import { SensorDataService } from 'src/app/services/sensor-data.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  averageDataArray: AverageData[] = [];
  tempAverage?: AverageData;
  graphData!: any[];
  pmData!: any;
  humidityData!: any;
  xData!: any;

  stations!: Station[];
  selectedStation = 0;

  public dataType = 
  {
    temperature : {
      'name': 'Temperatur',
      'slug': 'temperature'
    },
    co2 : { 
      'name': 'CO2-Gehalt',
      'slug': 'co2'
    }, 
    humidity : { 
      'name': 'Feuchtigkeit',
      'slug': 'humidity'
    }, 
    bright : {
      'name': 'Helligkeit',
      'slug': 'bright'
    }, 
    pressure : {
      'name': 'Druck',
      'slug': 'pressure'
    }, 
    pm25amountconc : {
      'name': 'Feinstaub PM2.5 Amount Concentration',
      'slug': 'pm2_5amountconc'
    },
    pm10amountconc : {
      'name': 'Feinstaub PM10 Amount Concentration',
      'slug': 'pm10amountconc'
    },
    pm25conc : {
      'name': 'Feinstaub PM2.5 Mass Concentration',
      'slug': 'pm2_5conc'
    },
    pm10conc : {
      'name': 'Feinstaub PM10 Mass Concentration',
      'slug': 'pm10conc'
    }
  }

  constructor(private sensorDataService: SensorDataService) { }

  ngOnInit(): void {
    this.sensorDataService.getStations().subscribe(station => {
      this.stations = station; 
      this.selectedStation = station[0].id;
    });
  }

  onSelectStation(event: any) {
    this.selectedStation = event.value;
  }
}
