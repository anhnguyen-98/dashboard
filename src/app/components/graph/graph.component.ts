import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { GraphDataApi } from 'src/app/models/sensor-data.models';
import { SensorDataService } from 'src/app/services/sensor-data.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, OnChanges {

  @Input() public selectedStation = 0;
  @Input() public dataType: any;

  temperatureG!: GraphDataApi;
  co2G!: GraphDataApi;
  humidityG!: GraphDataApi;
  brightG!: GraphDataApi;
  pressureG!: GraphDataApi;

  pm25conc!: GraphDataApi;
  pm10conc!: GraphDataApi;
  pm25amountconc!: GraphDataApi;
  pm10amountconc!: GraphDataApi;

  max = 30;
  min = 1;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value1 = 10; value2 = 10;  value3 = 10;  value4 = 10;  value5 = 10;  value6 = 10;  value7 = 10;

  private svg1 : any; svg2 : any; svg3 : any; svg4 : any; svg5 : any; svg6 : any; svg7 : any;
  y1!: any; y2!: any; y3!: any; y4!: any; y5!: any; y6!: any; y7!: any;
  x1!: any; x2!: any; x3!: any; x4!: any; x5!: any; x6!: any; x7!: any;
  xAxisGrid1: any; xAxisGrid2: any; xAxisGrid3: any; xAxisGrid4: any; xAxisGrid5: any; xAxisGrid6: any; xAxisGrid7: any;
  yAxisGrid1: any; yAxisGrid2: any; yAxisGrid3: any; yAxisGrid4: any; yAxisGrid5: any; yAxisGrid6: any; yAxisGrid7: any;
  line1: any; line2: any; line3: any; line4: any; line5: any; line6: any; line7: any;
  // dots1: any; 
  Tooltip1: any; Tooltip2: any; Tooltip3: any; Tooltip4: any; Tooltip5: any; Tooltip6: any; Tooltip7: any; 
  // line2: any; line3: any; line4: any; line5: any; line6: any; line7: any;
  xLine1: any; xLine2: any; xLine3: any; xLine4: any; xLine5: any; xLine6: any; xLine7: any; 
  yLine1: any; yLine2: any; yLine3: any; yLine4: any; yLine5: any; yLine6: any; yLine7: any; 

  private WIDTH        = 640;
  private HEIGHT       = 350;
  private MARGIN       = { top: 0, right: 20, bottom: 20, left: 40 };
  private INNER_WIDTH  = this.WIDTH - this.MARGIN.left - this.MARGIN.right;
  private INNER_HEIGHT = this.HEIGHT - this.MARGIN.top - this.MARGIN.bottom;
  private colors = ['#008080', '#125EB3', '#5C9DE6', '#8D3B23', '#B31E12']

  constructor(private sensorDataService: SensorDataService) { }
 
  ngOnChanges(): void {
    this.callingAPI();
  }

  callingAPI() {
    this.sensorDataService.getGraphData(this.dataType.temperature.slug, this.selectedStation).subscribe(data => {
      this.temperatureG = data;
      this.update1(data, this.value1);
    });
    this.sensorDataService.getGraphData(this.dataType.co2.slug, this.selectedStation).subscribe(data => {
      this.co2G = data;
      this.update2(data, this.value2);
    });
    this.sensorDataService.getGraphData(this.dataType.humidity.slug, this.selectedStation).subscribe(data => {
      this.humidityG = data;
      this.update3(data, this.value3);
    });
    this.sensorDataService.getGraphData(this.dataType.pressure.slug, this.selectedStation).subscribe(data => {
      this.pressureG = data;
      this.update4(data, this.value3);
    });
    this.sensorDataService.getGraphData(this.dataType.bright.slug, this.selectedStation).subscribe(data => {
      this.brightG = data;
      this.update7(data, this.value7);
    });  
    this.sensorDataService.getGraphData(this.dataType.pm25amountconc.slug, this.selectedStation).subscribe(data => {
      this.pm25amountconc = data;
    });
    this.sensorDataService.getGraphData(this.dataType.pm10amountconc.slug, this.selectedStation).subscribe(data => {
      this.pm10amountconc = data;
      setTimeout(() => this.update5(this.pm25amountconc, this.pm10amountconc, this.value5), 0);
    });
    this.sensorDataService.getGraphData(this.dataType.pm25conc.slug, this.selectedStation).subscribe(data => {
      this.pm25conc = data;
    });
    this.sensorDataService.getGraphData(this.dataType.pm10conc.slug, this.selectedStation).subscribe(data => {
      this.pm10conc = data;
      setTimeout(() => this.update6(this.pm25conc, this.pm10conc, this.value6), 0);
    });
  }

  onChange1(change: any) {
    this.value1 = change.value;
    this.update1(this.temperatureG, this.value1)
  }
  onChange2(change: any) {
    this.value2 = change.value;
    this.update2(this.co2G, this.value2)
  }
  onChange3(change: any) {
    this.value3 = change.value;
    this.update3(this.humidityG, this.value3)
  }
  onChange4(change: any) {
    this.value4 = change.value;
    this.update4(this.pressureG, this.value4)
  }
  onChange5(change: any) {
    this.value5 = change.value;
    this.update5(this.pm25amountconc, this.pm10amountconc, this.value5);
  }
  onChange6(change: any) {
    this.value6 = change.value;
    this.update6(this.pm25conc, this.pm10conc, this.value6)
  }
  onChange7(change: any) {
    this.value7 = change.value;
    this.update7(this.brightG, this.value7)
  }

  ngOnInit(): void {
    this.createSvg1();
    this.drawLineChart1();

    this.createSvg2();
    this.drawLineChart2();
    
    this.createSvg3();
    this.drawLineChart3();

    this.createSvg4();
    this.drawLineChart4();

    this.createSvg5();
    this.drawLineChart5();

    this.createSvg6();
    this.drawLineChart6();

    this.createSvg7();
    this.drawLineChart7();
  }

  private createSvg1(): void {
    this.svg1 = d3.select("div#scatter1")
      .append("div")
      .classed("svg-container", true)
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 ${this.WIDTH} ${this.HEIGHT}`)
      .classed("svg-content-responsive", true)
      .append("g")
      .attr("transform", "translate(" + this.MARGIN.left + "," + this.MARGIN.top + ")");
  }
  private createSvg2(): void {
    this.svg2 = d3.select("div#scatter2")
      .append("div")
      .classed("svg-container", true)
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 ${this.WIDTH} ${this.HEIGHT}`)
      .classed("svg-content-responsive", true)
      .append("g")
      .attr("transform", "translate(" + this.MARGIN.left + "," + this.MARGIN.top + ")");
  }
  private createSvg3(): void {
    this.svg3 = d3.select("div#scatter3")
      .append("div")
      .classed("svg-container", true)
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 ${this.WIDTH} ${this.HEIGHT}`)
      .classed("svg-content-responsive", true)
      .append("g")
      .attr("transform", "translate(" + this.MARGIN.left + "," + this.MARGIN.top + ")");
  }
  private createSvg4(): void {
    this.svg4 = d3.select("div#scatter4")
      .append("div")
      .classed("svg-container", true)
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 ${this.WIDTH} ${this.HEIGHT}`)
      .classed("svg-content-responsive", true)
      .append("g")
      .attr("transform", "translate(" + this.MARGIN.left + "," + this.MARGIN.top + ")");
  }
  private createSvg5(): void {
    this.svg5 = d3.select("div#scatter5")
      .append("div")
      .classed("svg-container", true)
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 ${this.WIDTH} ${this.HEIGHT}`)
      .classed("svg-content-responsive", true)
      .append("g")
      .attr("transform", "translate(" + this.MARGIN.left + "," + this.MARGIN.top + ")");
  }
  private createSvg6(): void {
    this.svg6 = d3.select("div#scatter6")
      .append("div")
      .classed("svg-container", true)
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 ${this.WIDTH} ${this.HEIGHT}`)
      .classed("svg-content-responsive", true)
      .append("g")
      .attr("transform", "translate(" + this.MARGIN.left + "," + this.MARGIN.top + ")");
  }
  private createSvg7(): void {
    this.svg7 = d3.select("div#scatter7")
      .append("div")
      .classed("svg-container", true)
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 ${this.WIDTH} ${this.HEIGHT}`)
      .classed("svg-content-responsive", true)
      .append("g")
      .attr("transform", "translate(" + this.MARGIN.left + "," + this.MARGIN.top + ")");
  }

  // Momentan haben wir noch keine Druckdaten, deswegen benutzen 
  // wir jetzt die Humidity Daten (Siehe bei services/sensor-data.service)
  // hier this.perssureData ist nur der Name
  private drawLineChart1(): void {
    // Add X axis
    this.x1 = d3.scaleTime()
      // .domain(d3.extent(this.pressureData, d => new Date(d.time)) as [Date, Date])
      .range([ 0, this.INNER_WIDTH ])
      // .ticks(12);

    // Add Y axis
    this.y1 = d3.scaleLinear()
      // .domain([d3.min(this.pressureData, d => d.data) as number - 10, d3.max(this.pressureData, d => d.data) as number + 10])
      .range([ this.INNER_HEIGHT, 0]);
    this.svg1.append("text")
      .attr("transform", "rotate(-90)")
      .attr("class", "unit")
      .style("fill", "white")
      .style("text-anchor", "middle")
      .attr("x", -this.INNER_WIDTH/3)
      .attr("y", -30);
    // this.svg.append("g")
    // .attr("transform", "translate(0," + this.INNER_HEIGHT + ")")
    // .call(d3.axisBottom(x).ticks(10));

    // this.svg.append("text")
    // .style("text-anchor", "middle")
    // .attr("x", this.INNER_WIDTH/2)
    // .attr("y", this.INNER_HEIGHT + 35)
    // .text("X axis title");

    // this.svg1.append("text")
    //   .attr("transform", "rotate(-90)")
    //   // .style("stroke", "rgb(115, 191, 105)")
    //   .style("fill", "white")
    //   .style("text-anchor", "middle")
    //   .attr("x", -this.INNER_WIDTH/3)
    //   .attr("y", -30)
    // .text(`${this.pressureData[0].units}`);

    // this.svg.append("g")
    // .call(d3.axisLeft(y));

    this.xAxisGrid1 = d3.axisBottom(this.x1)
      .tickSize(-this.INNER_HEIGHT)
      // .tickFormat('')
      .ticks(d3.timeHour.every(2));

    this.yAxisGrid1 = d3.axisLeft(this.y1)
      .tickSize(-this.INNER_WIDTH)
      // .tickFormat('')
      .ticks(9);

    this.svg1.append("g")
      .attr("class", "axis-grid1")
      .attr("transform", "translate(0," + this.INNER_HEIGHT + ")")

    this.svg1.append('g')
      .attr('class', 'axis-grid2')

    this.line1 = d3.line<any>()
      .x( (d: any) => this.x1(d.time))
      .y((d: any) =>  this.y1(d.data))
      .curve(d3.curveLinear);

      
    // Add dots
    // const dots = this.svg.append("g");
    
    // dots.selectAll("line")
    // .data(this.graphData)
    // .enter()
    // .append("circle")
    // .attr("cx", (d: { time: d3.NumberValue; }) => x(d.time))
    // .attr("cy", (d: { data: d3.NumberValue; }) => y(d.data))
    // .attr("r", 7)
    // .style("opacity", .5)
    // .style("fill", "#69b3a2");

    // test comment
    // Add labels
    // dots.selectAll("text")
    // .data(this.data)
    // .enter()
    // .append("text")
    // .text((d: { Framework: any; }) => d.Framework)
    // .attr("x", (d: { Released: d3.NumberValue; }) => x(d.Released))
    // .attr("y", (d: { Stars: d3.NumberValue; }) => y(d.Stars))

    


  //vertikale Linie
  this.xLine1 = this.svg1.append("line")
   .attr("opacity", 0)
   .attr("y1", 0)
   .attr("y2", this.INNER_HEIGHT)
   .style("stroke-dasharray", "3")
   .attr("stroke", "white")
   .attr("stroke-width", 1)
   .attr("pointer-events", "none");

  //horizontale Linie
  this.yLine1 = this.svg1.append("line")
   .attr("opacity", 0)
   .attr("x1", 0)
   .attr("x2", this.INNER_WIDTH)
   .attr("stroke", "white")
   .style("stroke-dasharray", "3")
   .attr("stroke-width", 1)
   .attr("pointer-events", "none");

  this.Tooltip1 = d3.selectAll("div#scatter1")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("position","absolute")
    .style("font", "15px sans-serif")
    .style("background", "#181b1f")
    .style("border", "solid")
    .style("border-width", this.WIDTH)
    .style("border-radius", "2px")
    .style("padding", "5px");
    
    // this.mousemove = (event:any,d:any) => {
    //   if (event.target.nodeName === 'circle') {
    //     const formatTime = d3.timeFormat("%d.%m.%Y %H:%M");
    //     const mouse = d3.pointer(event)
    //     const mousex = mouse[0];
    //     const mousey = mouse[1]; 
    //     xLine.attr("x1", mousex).attr("x2",mousex).attr("opacity", 1);
    //     yLine.attr("y1", mousey).attr("y2",mousey).attr("opacity", 1);
    //     this.Tooltip1
    //       .html("Datum: " + formatTime(d.time)+`<br>${d.name}: ` + Math.round(d.data*100.0)/100+ `${d.unit}`)
    //       .style("left", (event.pageX +10) + "px")             
    //       .style("top", (event.pageY - 60) + "px")
    //       .style("opacity", 1);
    //   }
    // }    
      
   
    // this.mouseleave = (event:any,d:any) => {
    //   console.log('leave');
      
    //   const mouse = d3.pointer(event)
    //   const mousex = mouse[0];
    //   const mousey = mouse[1]; 
    //   this.xLine.attr("x1", mousex).attr("x2",mousex).attr("opacity", 0);
    //   this.yLine.attr("y1", mousey).attr("y2",mousey).attr("opacity", 0);
    //   this.Tooltip1
    //   .style("opacity", 0);
    // }   

   
  }

  private drawLineChart2(): void {
    this.x2 = d3.scaleTime().range([ 0, this.INNER_WIDTH ]);
    this.y2 = d3.scaleLinear().range([ this.INNER_HEIGHT, 0]);
    this.svg2.append("text")
      .attr("transform", "rotate(-90)")
      .attr("class", "unit")
      .style("fill", "white")
      .style("text-anchor", "middle")
      .attr("x", -this.INNER_WIDTH/3)
      .attr("y", -30);
    this.xAxisGrid2 = d3.axisBottom(this.x2)
      .tickSize(-this.INNER_HEIGHT)
      .ticks(d3.timeHour.every(2));

    this.yAxisGrid2 = d3.axisLeft(this.y2)
      .tickSize(-this.INNER_WIDTH)
      .ticks(9);

    this.svg2.append("g")
      .attr("class", "axis-grid1")
      .attr("transform", "translate(0," + this.INNER_HEIGHT + ")")
      // .call(this.xAxisGrid2)

    this.svg2.append('g')
      .attr('class', 'axis-grid2')
      // .call(this.yAxisGrid2);

    this.line2 = d3.line<any>()
      .x( (d: any) => this.x2(d.time))
      .y((d: any) =>  this.y2(d.data))
      .curve(d3.curveLinear);

    // this.svg2
    //   .append("path")
    //   .attr("fill", "none")
    //   .attr("stroke", "white")
    //   .attr("stroke-width", 1.5)
    //   .attr("d", this.line2(this.pmData));
  this.xLine2 = this.svg2.append("line")
   .attr("opacity", 0)
   .attr("y1", 0)
   .attr("y2", this.INNER_HEIGHT)
   .style("stroke-dasharray", "3")
   .attr("stroke", "white")
   .attr("stroke-width", 1)
   .attr("pointer-events", "none");

  //horizontale Linie
  this.yLine2 = this.svg2.append("line")
   .attr("opacity", 0)
   .attr("x1", 0)
   .attr("x2", this.INNER_WIDTH)
   .attr("stroke", "white")
   .style("stroke-dasharray", "3")
   .attr("stroke-width", 1)
   .attr("pointer-events", "none");

  this.Tooltip2 = d3.selectAll("div#scatter2")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("position","absolute")
    .style("font", "15px sans-serif")
    .style("background", "#181b1f")
    .style("border", "solid")
    .style("border-width", this.WIDTH)
    .style("border-radius", "2px")
    .style("padding", "5px");
  
  }
  private drawLineChart3(): void {
    this.x3 = d3.scaleTime().range([ 0, this.INNER_WIDTH ]);
    this.y3 = d3.scaleLinear().range([ this.INNER_HEIGHT, 0]);
    this.svg3.append("text")
      .attr("transform", "rotate(-90)")
      .attr("class", "unit")
      .style("fill", "white")
      .style("text-anchor", "middle")
      .attr("x", -this.INNER_WIDTH/3)
      .attr("y", -30);
    this.xAxisGrid3 = d3.axisBottom(this.x3)
      .tickSize(-this.INNER_HEIGHT)
      .ticks(d3.timeHour.every(2));
    this.yAxisGrid3 = d3.axisLeft(this.y3)
      .tickSize(-this.INNER_WIDTH)
      .ticks(9);
    this.svg3.append("g")
      .attr("class", "axis-grid1")
      .attr("transform", "translate(0," + this.INNER_HEIGHT + ")");
    this.svg3.append('g')
      .attr('class', 'axis-grid2');
    this.line3 = d3.line<any>()
      .x( (d: any) => this.x3(d.time))
      .y((d: any) =>  this.y3(d.data))
      .curve(d3.curveLinear);
      this.xLine3 = this.svg3.append("line")
      .attr("opacity", 0)
      .attr("y1", 0)
      .attr("y2", this.INNER_HEIGHT)
      .style("stroke-dasharray", "3")
      .attr("stroke", "white")
      .attr("stroke-width", 1)
      .attr("pointer-events", "none");
   
     //horizontale Linie
     this.yLine3 = this.svg3.append("line")
      .attr("opacity", 0)
      .attr("x1", 0)
      .attr("x2", this.INNER_WIDTH)
      .attr("stroke", "white")
      .style("stroke-dasharray", "3")
      .attr("stroke-width", 1)
      .attr("pointer-events", "none");
   
     this.Tooltip3 = d3.selectAll("div#scatter3")
       .append("div")
       .style("opacity", 0)
       .attr("class", "tooltip")
       .style("position","absolute")
       .style("font", "15px sans-serif")
       .style("background", "#181b1f")
       .style("border", "solid")
       .style("border-width", this.WIDTH)
       .style("border-radius", "2px")
       .style("padding", "5px");
  }
  private drawLineChart4(): void {
    this.x4 = d3.scaleTime().range([ 0, this.INNER_WIDTH ]);
    this.y4 = d3.scaleLinear().range([ this.INNER_HEIGHT, 0]);
    this.svg4.append("text")
      .attr("transform", "rotate(-90)")
      .attr("class", "unit")
      .style("fill", "white")
      .style("text-anchor", "middle")
      .attr("x", -this.INNER_WIDTH/3)
      .attr("y", -30);
    this.xAxisGrid4 = d3.axisBottom(this.x4)
      .tickSize(-this.INNER_HEIGHT)
      .ticks(d3.timeHour.every(2));
    this.yAxisGrid4 = d3.axisLeft(this.y4)
      .tickSize(-this.INNER_WIDTH)
      .ticks(9);
    this.svg4.append("g")
      .attr("class", "axis-grid1")
      .attr("transform", "translate(0," + this.INNER_HEIGHT + ")");
    this.svg4.append('g')
      .attr('class', 'axis-grid2');
    this.line4 = d3.line<any>()
      .x( (d: any) => this.x4(d.time))
      .y((d: any) =>  this.y4(d.data))
      .curve(d3.curveLinear);
    this.xLine4 = this.svg4.append("line")
      .attr("opacity", 0)
      .attr("y1", 0)
      .attr("y2", this.INNER_HEIGHT)
      .style("stroke-dasharray", "3")
      .attr("stroke", "white")
      .attr("stroke-width", 1)
      .attr("pointer-events", "none");
   
     //horizontale Linie
     this.yLine4 = this.svg4.append("line")
      .attr("opacity", 0)
      .attr("x1", 0)
      .attr("x2", this.INNER_WIDTH)
      .attr("stroke", "white")
      .style("stroke-dasharray", "3")
      .attr("stroke-width", 1)
      .attr("pointer-events", "none");
   
     this.Tooltip4 = d3.selectAll("div#scatter4")
       .append("div")
       .style("opacity", 0)
       .attr("class", "tooltip")
       .style("position","absolute")
       .style("font", "15px sans-serif")
       .style("background", "#181b1f")
       .style("border", "solid")
       .style("border-width", this.WIDTH)
       .style("border-radius", "2px")
       .style("padding", "5px");
  }
  private drawLineChart5(): void {
    this.x5 = d3.scaleTime().range([ 0, this.INNER_WIDTH ]);
    this.y5 = d3.scaleLinear().range([ this.INNER_HEIGHT, 0]);
    this.svg5.append("text")
      .attr("transform", "rotate(-90)")
      .attr("class", "unit")
      .style("fill", "white")
      .style("text-anchor", "middle")
      .attr("x", -this.INNER_WIDTH/3)
      .attr("y", -30);
    this.xAxisGrid5 = d3.axisBottom(this.x5)
      .tickSize(-this.INNER_HEIGHT)
      .ticks(d3.timeHour.every(2));
    this.yAxisGrid5 = d3.axisLeft(this.y5)
      .tickSize(-this.INNER_WIDTH)
      .ticks(9);
    this.svg5.append("g")
      .attr("class", "axis-grid1")
      .attr("transform", "translate(0," + this.INNER_HEIGHT + ")");
    this.svg5.append('g')
      .attr('class', 'axis-grid2');
    this.line5 = d3.line<any>()
      .x( (d: any) => this.x5(d.time))
      .y((d: any) =>  this.y5(d.data))
      .curve(d3.curveLinear);
  this.xLine5 = this.svg5.append("line")
   .attr("opacity", 0)
   .attr("y1", 0)
   .attr("y2", this.INNER_HEIGHT)
   .style("stroke-dasharray", "3")
   .attr("stroke", "white")
   .attr("stroke-width", 1)
   .attr("pointer-events", "none");

  //horizontale Linie
  this.yLine5 = this.svg5.append("line")
   .attr("opacity", 0)
   .attr("x1", 0)
   .attr("x2", this.INNER_WIDTH)
   .attr("stroke", "white")
   .style("stroke-dasharray", "3")
   .attr("stroke-width", 1)
   .attr("pointer-events", "none");

  this.Tooltip5 = d3.selectAll("div#scatter5")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("position","absolute")
    .style("font", "15px sans-serif")
    .style("background", "#181b1f")
    .style("border", "solid")
    .style("border-width", this.WIDTH)
    .style("border-radius", "2px")
    .style("padding", "5px");
  }
  private drawLineChart6(): void {
    this.x6 = d3.scaleTime().range([ 0, this.INNER_WIDTH ]);
    this.y6 = d3.scaleLinear().range([ this.INNER_HEIGHT, 0]);
    this.svg6.append("text")
      .attr("transform", "rotate(-90)")
      .attr("class", "unit")
      .style("fill", "white")
      .style("text-anchor", "middle")
      .attr("x", -this.INNER_WIDTH/3)
      .attr("y", -30);
    this.xAxisGrid6 = d3.axisBottom(this.x6)
      .tickSize(-this.INNER_HEIGHT)
      .ticks(d3.timeHour.every(2));
    this.yAxisGrid6 = d3.axisLeft(this.y6)
      .tickSize(-this.INNER_WIDTH)
      .ticks(9);
    this.svg6.append("g")
      .attr("class", "axis-grid1")
      .attr("transform", "translate(0," + this.INNER_HEIGHT + ")");
    this.svg6.append('g')
      .attr('class', 'axis-grid2');
    this.line6 = d3.line<any>()
      .x( (d: any) => this.x6(d.time))
      .y((d: any) =>  this.y6(d.data))
      .curve(d3.curveLinear);
    this.xLine6 = this.svg6.append("line")
      .attr("opacity", 0)
      .attr("y1", 0)
      .attr("y2", this.INNER_HEIGHT)
      .style("stroke-dasharray", "3")
      .attr("stroke", "white")
      .attr("stroke-width", 1)
      .attr("pointer-events", "none");
   
     //horizontale Linie
     this.yLine6 = this.svg6.append("line")
      .attr("opacity", 0)
      .attr("x1", 0)
      .attr("x2", this.INNER_WIDTH)
      .attr("stroke", "white")
      .style("stroke-dasharray", "3")
      .attr("stroke-width", 1)
      .attr("pointer-events", "none");
   
     this.Tooltip6 = d3.selectAll("div#scatter6")
       .append("div")
       .style("opacity", 0)
       .attr("class", "tooltip")
       .style("position","absolute")
       .style("font", "15px sans-serif")
       .style("background", "#181b1f")
       .style("border", "solid")
       .style("border-width", this.WIDTH)
       .style("border-radius", "2px")
       .style("padding", "5px");
  }
  private drawLineChart7(): void {
    this.x7 = d3.scaleTime().range([ 0, this.INNER_WIDTH ]);
    this.y7 = d3.scaleLinear().range([ this.INNER_HEIGHT, 0]);
    this.svg7.append("text")
      .attr("transform", "rotate(-90)")
      .attr("class", "unit")
      .style("fill", "white")
      .style("text-anchor", "middle")
      .attr("x", -this.INNER_WIDTH/3)
      .attr("y", -30);
    this.xAxisGrid7 = d3.axisBottom(this.x7)
      .tickSize(-this.INNER_HEIGHT)
      .ticks(d3.timeHour.every(2));
    this.yAxisGrid7 = d3.axisLeft(this.y7)
      .tickSize(-this.INNER_WIDTH)
      .ticks(9);
    this.svg7.append("g")
      .attr("class", "axis-grid1")
      .attr("transform", "translate(0," + this.INNER_HEIGHT + ")");
    this.svg7.append('g')
      .attr('class', 'axis-grid2');
    this.line7 = d3.line<any>()
      .x( (d: any) => this.x7(d.time))
      .y((d: any) =>  this.y7(d.data))
      .curve(d3.curveLinear);
      this.xLine7 = this.svg7.append("line")
      .attr("opacity", 0)
      .attr("y1", 0)
      .attr("y2", this.INNER_HEIGHT)
      .style("stroke-dasharray", "3")
      .attr("stroke", "white")
      .attr("stroke-width", 1)
      .attr("pointer-events", "none");
   
     //horizontale Linie
     this.yLine7 = this.svg7.append("line")
      .attr("opacity", 0)
      .attr("x1", 0)
      .attr("x2", this.INNER_WIDTH)
      .attr("stroke", "white")
      .style("stroke-dasharray", "3")
      .attr("stroke-width", 1)
      .attr("pointer-events", "none");
   
     this.Tooltip7 = d3.selectAll("div#scatter7")
       .append("div")
       .style("opacity", 0)
       .attr("class", "tooltip")
       .style("position","absolute")
       .style("font", "15px sans-serif")
       .style("background", "#181b1f")
       .style("border", "solid")
       .style("border-width", this.WIDTH)
       .style("border-radius", "2px")
       .style("padding", "5px");
  }

  public update1(data: GraphDataApi, value: number) { 
    this.svg1.selectAll(".unit").text(`${data.unit}`);
    this.x1.domain(d3.extent(data.dataArray, (d: any) => new Date(d.time)) as [Date, Date]);
    this.svg1.selectAll(".axis-grid1")
      .transition()
      .duration(1000)
      .call(this.xAxisGrid1);
    this.y1.domain([d3.min(data.dataArray, (d: any) => d.data) as unknown as number - value, 
      d3.max(data.dataArray, (d: any) => d.data) as unknown as number + value]);
    this.svg1.selectAll(".axis-grid2")
      .transition()
      .duration(1000)
      .call(this.yAxisGrid1);
  
    // Create a update selection: bind to the new data
    let line1 = this.svg1.selectAll(".line")
      .data([data.dataArray], function(d: any){ return d.data });

      // const length = line1.node().getTotalLength();
  
      // //animation
      // // d3.select("#startLine").on("click", function() {
      //   line1
      //         .attr("stroke-dasharray", length + " " + length)
      //         .attr("stroke-dashoffset", length)
      //         .transition()
      //           .duration(1000)
      //           .ease(d3.easeLinear)
      //     .attr("stroke-dashoffset", 0)
  
    // Updata the line
    line1.enter()
      .append("path")
      .attr("class","line")
      .merge(line1)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
        .x((d: any) => this.x1(d.time))
        .y((d: any) => this.y1(d.data)))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 1.5);

       
  
  
      // const path = this.svg1
      //   .append("path")
      //   .attr("d", this.line1(data.dataArray))
      //   .attr("fill", "none")
      //   .attr("stroke", "rgb(115, 191, 105)")
      //   .attr("stroke-width", 1.5)
        
      //berechnen der Länge 
     
     
        
  
  
        // const mouseover = function(event:any,d:any) {
        //   console.log(event.target.nodeName)
        //   console.log('over')
        //   // const mouse = d3.pointer(event);
        //   // const mousex = mouse[0];
        //   // const mousey = mouse[1]; 
        //   // xLine.attr("x1", mousex).attr("x2",mousex).attr("opacity", 1);
        //   // yLine.attr("y1", mousey).attr("y2",mousey).attr("opacity", 1);
        //   // Tooltip
        //   //   .style("opacity", 1)
            
        // }
  
        
        
      //  let dots = this.svg1.selectAll(".dot")
      //     .data(data.dataArray);

      //  dots.enter().append("circle")
      //  .attr("class","dot")
      //  .merge(dots)
      // //  .transition()
      // //  .duration(1000)
      //  .attr("r", 3.5)
      //  .attr("cx", (d: { time: d3.NumberValue; }) => this.x1(d.time))
      //  .attr("cy", (d: { data: d3.NumberValue; }) => this.y1(d.data))
      //  .style("opacity", 0.5)
      //  .style("fill", "#69b3a2")
      // //  .on("mouseover", mouseover)
      //  .on("mouseleave", mouseleave)
      //  .on("mousemove", mousemove);

      //  xyLine
      //  .on("mousemove", mousemove)
      //  .on("mouseleave", mouseleave);

    // this.svg1.selectAll(".dot")
    //   .data(data.dataArray)
    //   // .enter().append("circle")
    //   .attr("class","dot")
    //    .transition()
    //    .duration(1000)
    //   .attr("r", 3.5)
    //   .attr("cx", (d: { time: d3.NumberValue; }) => this.x1(d.time))
    //   .attr("cy", (d: { data: d3.NumberValue; }) => this.y1(d.data))
    //   .style("opacity", 0.5)
    //   .style("fill", "#69b3a2")

      // .on("mouseleave", (event:any,d:any) => {
      //   console.log('leave');
        
      //   const mouse = d3.pointer(event)
      //   const mousex = mouse[0];
      //   const mousey = mouse[1]; 
      //   // xLine.attr("x1", mousex).attr("x2",mousex).attr("opacity", 0);
      //   // yLine.attr("y1", mousey).attr("y2",mousey).attr("opacity", 0);
      //   this.Tooltip1
      //   .style("opacity", 0);
      // })
      // .on("mousemove", (event:any,d:any) => {
      //   if (event.target.nodeName === 'circle') {
      //     const formatTime = d3.timeFormat("%d.%m.%Y %H:%M");
      //     const mouse = d3.pointer(event)
      //     const mousex = mouse[0];
      //     const mousey = mouse[1]; 
      //     /

      let dots = this.svg1.selectAll(".dot")
      .data(data.dataArray)

      dots
      .enter().append("circle")
      .attr("class","dot")
      .merge(dots)
      .attr("r", 4)
      .attr("cx", (d: any) => this.x1(d.time))
      .attr("cy", (d: any) => this.y1(d.data))
      .style("opacity", 0)
      .style("fill", "#69b3a2")
      .on("mousemove", (event:any,d:any) => {
          const formatTime = d3.timeFormat("%d.%m.%Y %H:%M");
          const mouse = d3.pointer(event);
          const mousex = mouse[0];
          const mousey = mouse[1];
          this.xLine1.attr("x1", mousex).attr("x2",mousex).attr("opacity", 1);
          this.yLine1.attr("y1", mousey).attr("y2",mousey).attr("opacity", 1);
          this.Tooltip1
            .html("Datum: " + formatTime(d.time)+`<br>${data.name}: ` + Math.round(d.data*100.0)/100+ `${data.unit}`)
            .style("left", (event.pageX +10) + "px")             
            .style("top", (event.pageY - 60) + "px")
            .style("opacity", 1)
            
        })
      .on("mouseout", (d: any, event: any) => {
        const mouse = d3.pointer(event);
        const mousex = mouse[0];
        const mousey = mouse[1]; 
        this.xLine1.attr("x1", mousex).attr("x2",mousex).attr("opacity", 0);
        this.yLine1.attr("y1", mousey).attr("y2",mousey).attr("opacity", 0);
        this.Tooltip1.style("opacity", 0);
      });

      dots.exit().remove();

      // const xyLine = this.svg1.append("rect")
      //   .attr("x", 0)
      //   .attr("y", 0)
      //   .attr("width", this.WIDTH)
      //   .attr("height", this.HEIGHT)
      //   .attr("fill", "white")
      //   .style("opacity", 0);
  
      //  xyLine
      //    .on("mousemove", (event:any,d:any) => {
      //     //  console.log(event);
           
      //       if (event.target.nodeName === 'circle') {
      //         const formatTime = d3.timeFormat("%d.%m.%Y %H:%M");
      //         const mouse = d3.pointer(event)
      //         const mousex = mouse[0];
      //         const mousey = mouse[1]; 
      //         this.xLine.attr("x1", mousex).attr("x2",mousex).attr("opacity", 1);
      //         this.yLine.attr("y1", mousey).attr("y2",mousey).attr("opacity", 1);
      //         this.Tooltip1
      //           .html("Datum: " + formatTime(d.time)+`<br>${d.name}: ` + Math.round(d.data*100.0)/100+ `${d.unit}`)
      //           .style("left", (event.pageX +10) + "px")             
      //           .style("top", (event.pageY - 60) + "px")
      //           .style("opacity", 1);
      //       }
      //     } )
        //  .on("mouseout", this.mouseleave);
  }

  public update2(data: GraphDataApi, value: number) {
    this.svg2.selectAll(".unit").text(`${data.unit}`);
    this.x2.domain(d3.extent(data.dataArray, (d: any) => new Date(d.time)) as [Date, Date]);
    this.svg2.selectAll(".axis-grid1")
      .transition()
      .duration(1000)
      .call(this.xAxisGrid2);
    // create the Y axis
    this.y2.domain([d3.min(data.dataArray, (d: any) => d.data) as unknown as number - value, 
      d3.max(data.dataArray, (d: any) => d.data) as unknown as number + value]);
    this.svg2.selectAll(".axis-grid2")
      .transition()
      .duration(1000)
      .call(this.yAxisGrid2);
    // Create a update selection: bind to the new data
    let line2 = this.svg2.selectAll(".line")
      .data([data.dataArray], function(d: any){ return d.data });
  
    // Updata the line
    line2.enter()
      .append("path")
      .attr("class","line")
      .merge(line2)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
        .x((d: any) => this.x2(d.time))
        .y((d: any) => this.y2(d.data)))
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)

    let dots = this.svg2.selectAll(".dot")
      .data(data.dataArray)
  
    dots
    .enter().append("circle")
    .attr("class","dot")
    .merge(dots)
    .attr("r", 4)
    .attr("cx", (d: any) => this.x2(d.time))
    .attr("cy", (d: any) => this.y2(d.data))
    .style("opacity", 0)
    .style("fill", "#69b3a2")
    .on("mousemove", (event:any,d:any) => {
        const formatTime = d3.timeFormat("%d.%m.%Y %H:%M");
        const mouse = d3.pointer(event);
        const mousex = mouse[0];
        const mousey = mouse[1];
        this.xLine2.attr("x1", mousex).attr("x2",mousex).attr("opacity", 1);
        this.yLine2.attr("y1", mousey).attr("y2",mousey).attr("opacity", 1);
        this.Tooltip2
          .html("Datum: " + formatTime(d.time)+`<br>${data.name}: ` + Math.round(d.data*100.0)/100+ `${data.unit}`)
          .style("left", (event.pageX +10) + "px")             
          .style("top", (event.pageY - 60) + "px")
          .style("opacity", 1)
          
      })
    .on("mouseout", (d: any, event: any) => {
      const mouse = d3.pointer(event);
      const mousex = mouse[0];
      const mousey = mouse[1]; 
      this.xLine2.attr("x1", mousex).attr("x2",mousex).attr("opacity", 0);
      this.yLine2.attr("y1", mousey).attr("y2",mousey).attr("opacity", 0);
      this.Tooltip2.style("opacity", 0);
    });

    dots.exit().remove();
  }
  public update3(data: GraphDataApi, value: number) {
    this.svg3.selectAll(".unit").text(`${data.unit}`);
    this.x3.domain(d3.extent(data.dataArray, (d: any) => new Date(d.time)) as [Date, Date]);
    this.svg3.selectAll(".axis-grid1")
      .transition()
      .duration(1000)
      .call(this.xAxisGrid3);
    this.y3.domain([d3.min(data.dataArray, (d: any) => d.data) as unknown as number - value, 
      d3.max(data.dataArray, (d: any) => d.data) as unknown as number + value]);
    this.svg3.selectAll(".axis-grid2")
      .transition()
      .duration(1000)
      .call(this.yAxisGrid3);;
    let line3 = this.svg3.selectAll(".line")
      .data([data.dataArray], function(d: any){ return d.data });
    line3.enter()
      .append("path")
      .attr("class","line")
      .merge(line3)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
        .x((d: any) => this.x3(d.time))
        .y((d: any) => this.y3(d.data)))
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5);

    let dots = this.svg3.selectAll(".dot")
    .data(data.dataArray)

    dots
    .enter().append("circle")
    .attr("class","dot")
    .merge(dots)
    .attr("r", 4)
    .attr("cx", (d: any) => this.x3(d.time))
    .attr("cy", (d: any) => this.y3(d.data))
    .style("opacity", 0)
    .style("fill", "#69b3a2")
    .on("mousemove", (event:any,d:any) => {
        const formatTime = d3.timeFormat("%d.%m.%Y %H:%M");
        const mouse = d3.pointer(event);
        const mousex = mouse[0];
        const mousey = mouse[1];
        this.xLine3.attr("x1", mousex).attr("x2",mousex).attr("opacity", 1);
        this.yLine3.attr("y1", mousey).attr("y2",mousey).attr("opacity", 1);
        this.Tooltip3
          .html("Datum: " + formatTime(d.time)+`<br>${data.name}: ` + Math.round(d.data*100.0)/100+ `${data.unit}`)
          .style("left", (event.pageX +10) + "px")             
          .style("top", (event.pageY - 60) + "px")
          .style("opacity", 1)
          
      })
    .on("mouseout", (d: any, event: any) => {
      const mouse = d3.pointer(event);
      const mousex = mouse[0];
      const mousey = mouse[1]; 
      this.xLine3.attr("x1", mousex).attr("x2",mousex).attr("opacity", 0);
      this.yLine3.attr("y1", mousey).attr("y2",mousey).attr("opacity", 0);
      this.Tooltip3.style("opacity", 0);
    });
  
    dots.exit().remove();
  }
  public update4(data: GraphDataApi, value: number) {
    this.svg4.selectAll(".unit").text(`${data.unit}`);
    this.x4.domain(d3.extent(data.dataArray, (d: any) => new Date(d.time)) as [Date, Date]);
    this.svg4.selectAll(".axis-grid1")
      .transition()
      .duration(1000)
      .call(this.xAxisGrid4);
    this.y4.domain([d3.min(data.dataArray, (d: any) => d.data) as unknown as number - value, 
      d3.max(data.dataArray, (d: any) => d.data) as unknown as number + value]);
    this.svg4.selectAll(".axis-grid2")
      .transition()
      .duration(1000)
      .call(this.yAxisGrid4);
    let line4 = this.svg4.selectAll(".line")
      .data([data.dataArray], function(d: any){ return d.data });
    line4.enter()
      .append("path")
      .attr("class","line")
      .merge(line4)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
        .x((d: any) => this.x4(d.time))
        .y((d: any) => this.y4(d.data)))
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)

    let dots = this.svg4.selectAll(".dot")
    .data(data.dataArray)
    
      dots
      .enter().append("circle")
      .attr("class","dot")
      .merge(dots)
      .attr("r", 4)
      .attr("cx", (d: any) => this.x4(d.time))
      .attr("cy", (d: any) => this.y4(d.data))
      .style("opacity", 0)
      .style("fill", "#69b3a2")
      .on("mousemove", (event:any,d:any) => {
          const formatTime = d3.timeFormat("%d.%m.%Y %H:%M");
          const mouse = d3.pointer(event);
          const mousex = mouse[0];
          const mousey = mouse[1];
          this.xLine4.attr("x1", mousex).attr("x2",mousex).attr("opacity", 1);
          this.yLine4.attr("y1", mousey).attr("y2",mousey).attr("opacity", 1);
          this.Tooltip4
            .html("Datum: " + formatTime(d.time)+`<br>${data.name}: ` + Math.round(d.data*100.0)/100+ `${data.unit}`)
            .style("left", (event.pageX +10) + "px")             
            .style("top", (event.pageY - 60) + "px")
            .style("opacity", 1)
            
        })
      .on("mouseout", (d: any, event: any) => {
        const mouse = d3.pointer(event);
        const mousex = mouse[0];
        const mousey = mouse[1]; 
        this.xLine4.attr("x1", mousex).attr("x2",mousex).attr("opacity", 0);
        this.yLine4.attr("y1", mousey).attr("y2",mousey).attr("opacity", 0);
        this.Tooltip4.style("opacity", 0);
      });
  
      dots.exit().remove();
  }
  public update5(data1: GraphDataApi, data2: GraphDataApi, value: number) {
    this.svg5.selectAll(".unit").text(`${data1.unit}`);
    this.x5.domain(d3.extent(data2.dataArray, (d: any) => new Date(d.time)) as [Date, Date]);
    this.svg5.selectAll(".axis-grid1")
      .transition()
      .duration(1000)
      .call(this.xAxisGrid5);
    this.y5.domain([d3.min(data2.dataArray, (d: any) => d.data) as unknown as number - value, 
      d3.max(data2.dataArray, (d: any) => d.data) as unknown as number + value]);
    this.svg5.selectAll(".axis-grid2")
      .transition()
      .duration(1000)
      .call(this.yAxisGrid5);
    let line51 = this.svg5.selectAll(".line")
      .data([data1.dataArray], function(d: any){ return d.data });
    let line52 = this.svg5.selectAll(".line-1")
      .data([data2.dataArray], function(d: any){ return d.data });
    line51.enter()
      .append("path")
      .attr("class","line")
      .merge(line51)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
        .x((d: any) => this.x5(d.time))
        .y((d: any) => this.y5(d.data)))
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 0.5)
    line52.enter()
      .append("path")
      .attr("class","line-1")
      .merge(line52)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
        .x((d: any) => this.x5(d.time))
        .y((d: any) => this.y5(d.data)))
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 0.5)

    let dots1 = this.svg5.selectAll(".dot1")
        .data(data1.dataArray)
    
      dots1
      .enter().append("circle")
      .attr("class","dot1")
      .merge(dots1)
      .attr("r", 4)
      .attr("cx", (d: any) => this.x5(d.time))
      .attr("cy", (d: any) => this.y5(d.data))
      .style("opacity", 0)
      .style("fill", "#69b3a2")
      .on("mousemove", (event:any,d:any) => {
          const formatTime = d3.timeFormat("%d.%m.%Y %H:%M");
          const mouse = d3.pointer(event);
          const mousex = mouse[0];
          const mousey = mouse[1];
          this.xLine5.attr("x1", mousex).attr("x2",mousex).attr("opacity", 1);
          this.yLine5.attr("y1", mousey).attr("y2",mousey).attr("opacity", 1);
          this.Tooltip5
            .html("Datum: " + formatTime(d.time)+`<br>${data1.name}: ` + Math.round(d.data*100.0)/100+ `${data1.unit}`)
            .style("left", (event.pageX +10) + "px")             
            .style("top", (event.pageY - 60) + "px")
            .style("opacity", 1)
            
        })
      .on("mouseout", (d: any, event: any) => {
        const mouse = d3.pointer(event);
        const mousex = mouse[0];
        const mousey = mouse[1]; 
        this.xLine5.attr("x1", mousex).attr("x2",mousex).attr("opacity", 0);
        this.yLine5.attr("y1", mousey).attr("y2",mousey).attr("opacity", 0);
        this.Tooltip5.style("opacity", 0);
      });
  
      dots1.exit().remove();

    let dots2 = this.svg5.selectAll(".dot2")
      .data(data2.dataArray)
  
    dots2
    .enter().append("circle")
    .attr("class","dot2")
    .merge(dots2)
    .attr("r", 4)
    .attr("cx", (d: any) => this.x5(d.time))
    .attr("cy", (d: any) => this.y5(d.data))
    .style("opacity", 0)
    .style("fill", "#69b3a2")
    .on("mousemove", (event:any,d:any) => {
        const formatTime = d3.timeFormat("%d.%m.%Y %H:%M");
        const mouse = d3.pointer(event);
        const mousex = mouse[0];
        const mousey = mouse[1];
        this.xLine5.attr("x1", mousex).attr("x2",mousex).attr("opacity", 1);
        this.yLine5.attr("y1", mousey).attr("y2",mousey).attr("opacity", 1);
        this.Tooltip5
          .html("Datum: " + formatTime(d.time)+`<br>${data2.name}: ` + Math.round(d.data*100.0)/100+ `${data2.unit}`)
          .style("left", (event.pageX +10) + "px")             
          .style("top", (event.pageY - 60) + "px")
          .style("opacity", 1)
          
      })
    .on("mouseout", (d: any, event: any) => {
      const mouse = d3.pointer(event);
      const mousex = mouse[0];
      const mousey = mouse[1]; 
      this.xLine5.attr("x1", mousex).attr("x2",mousex).attr("opacity", 0);
      this.yLine5.attr("y1", mousey).attr("y2",mousey).attr("opacity", 0);
      this.Tooltip5.style("opacity", 0);
    });

    dots2.exit().remove();
  }
  public update6(data1: GraphDataApi, data2: GraphDataApi, value: number) {
    this.svg6.selectAll(".unit").text(`${data1.unit}`);
    this.x6.domain(d3.extent(data2.dataArray, (d: any) => new Date(d.time)) as [Date, Date]);
    this.svg6.selectAll(".axis-grid1")
      .transition()
      .duration(1000)
      .call(this.xAxisGrid6);
    this.y6.domain([d3.min(data2.dataArray, (d: any) => d.data) as unknown as number - value, 
      d3.max(data2.dataArray, (d: any) => d.data) as unknown as number + value]);
    this.svg6.selectAll(".axis-grid2")
      .transition()
      .duration(1000)
      .call(this.yAxisGrid6);
    let line61 = this.svg6.selectAll(".line")
      .data([data1.dataArray], function(d: any){ return d.data });
    let line62 = this.svg6.selectAll(".line-1")
      .data([data2.dataArray], function(d: any){ return d.data });
  
    // Updata the line
    line61
      .enter()
      .append("path")
      .attr("class","line")
      .merge(line61)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
        .x((d: any) => this.x6(d.time))
        .y((d: any) => this.y6(d.data)))
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
    line62
      .enter()
      .append("path")
      .attr("class","line-1")
      .merge(line62)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
        .x((d: any) => this.x6(d.time))
        .y((d: any) => this.y6(d.data)))
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)

      let dots1 = this.svg6.selectAll(".dot1")
      .data(data1.dataArray)
    
      dots1
      .enter().append("circle")
      .attr("class","dot1")
      .merge(dots1)
      .attr("r", 4)
      .attr("cx", (d: any) => this.x6(d.time))
      .attr("cy", (d: any) => this.y6(d.data))
      .style("opacity", 0)
      .style("fill", "#69b3a2")
      .on("mousemove", (event:any,d:any) => {
          const formatTime = d3.timeFormat("%d.%m.%Y %H:%M");
          const mouse = d3.pointer(event);
          const mousex = mouse[0];
          const mousey = mouse[1];
          this.xLine6.attr("x1", mousex).attr("x2",mousex).attr("opacity", 1);
          this.yLine6.attr("y1", mousey).attr("y2",mousey).attr("opacity", 1);
          this.Tooltip6
            .html("Datum: " + formatTime(d.time)+`<br>${data1.name}: ` + Math.round(d.data*100.0)/100+ `${data1.unit}`)
            .style("left", (event.pageX +10) + "px")             
            .style("top", (event.pageY - 60) + "px")
            .style("opacity", 1)
            
        })
      .on("mouseout", (d: any, event: any) => {
        const mouse = d3.pointer(event);
        const mousex = mouse[0];
        const mousey = mouse[1]; 
        this.xLine6.attr("x1", mousex).attr("x2",mousex).attr("opacity", 0);
        this.yLine6.attr("y1", mousey).attr("y2",mousey).attr("opacity", 0);
        this.Tooltip6.style("opacity", 0);
      });
  
      dots1.exit().remove();

    let dots2 = this.svg6.selectAll(".dot2")
      .data(data2.dataArray)
  
    dots2
    .enter().append("circle")
    .attr("class","dot2")
    .merge(dots2)
    .attr("r", 4)
    .attr("cx", (d: any) => this.x6(d.time))
    .attr("cy", (d: any) => this.y6(d.data))
    .style("opacity", 0)
    .style("fill", "#69b3a2")
    .on("mousemove", (event:any,d:any) => {
        const formatTime = d3.timeFormat("%d.%m.%Y %H:%M");
        const mouse = d3.pointer(event);
        const mousex = mouse[0];
        const mousey = mouse[1];
        this.xLine6.attr("x1", mousex).attr("x2",mousex).attr("opacity", 1);
        this.yLine6.attr("y1", mousey).attr("y2",mousey).attr("opacity", 1);
        this.Tooltip6
          .html("Datum: " + formatTime(d.time)+`<br>${data2.name}: ` + Math.round(d.data*100.0)/100+ `${data2.unit}`)
          .style("left", (event.pageX +10) + "px")             
          .style("top", (event.pageY - 60) + "px")
          .style("opacity", 1)
          
      })
    .on("mouseout", (d: any, event: any) => {
      const mouse = d3.pointer(event);
      const mousex = mouse[0];
      const mousey = mouse[1]; 
      this.xLine6.attr("x1", mousex).attr("x2",mousex).attr("opacity", 0);
      this.yLine6.attr("y1", mousey).attr("y2",mousey).attr("opacity", 0);
      this.Tooltip6.style("opacity", 0);
    });

    dots2.exit().remove();
  }
  public update7(data: GraphDataApi, value: number) {
    this.svg7.selectAll(".unit").text(`${data.unit}`);
    this.x7.domain(d3.extent(data.dataArray, (d: any) => new Date(d.time)) as [Date, Date]);
    this.svg7.selectAll(".axis-grid1")
      .transition()
      .duration(1000)
      .call(this.xAxisGrid7);
    this.y7.domain([d3.min(data.dataArray, (d: any) => d.data) as unknown as number - value, 
      d3.max(data.dataArray, (d: any) => d.data) as unknown as number + value]);
    this.svg7.selectAll(".axis-grid2")
      .transition()
      .duration(1000)
      .call(this.yAxisGrid7);
    let line7 = this.svg7.selectAll(".line")
      .data([data.dataArray], function(d: any){ return d.data });
    line7
      .enter()
      .append("path")
      .attr("class","line")
      .merge(line7)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
        .x((d: any) => this.x7(d.time))
        .y((d: any) => this.y7(d.data)))

    let dots = this.svg7.selectAll(".dot")
    .data(data.dataArray)
    
      dots
      .enter().append("circle")
      .attr("class","dot")
      .merge(dots)
      .attr("r", 4)
      .attr("cx", (d: any) => this.x7(d.time))
      .attr("cy", (d: any) => this.y7(d.data))
      .style("opacity", 0)
      .style("fill", "#69b3a2")
      .on("mousemove", (event:any,d:any) => {
          const formatTime = d3.timeFormat("%d.%m.%Y %H:%M");
          const mouse = d3.pointer(event);
          const mousex = mouse[0];
          const mousey = mouse[1];
          this.xLine7.attr("x1", mousex).attr("x2",mousex).attr("opacity", 1);
          this.yLine7.attr("y1", mousey).attr("y2",mousey).attr("opacity", 1);
          this.Tooltip7
            .html("Datum: " + formatTime(d.time)+`<br>${data.name}: ` + Math.round(d.data*100.0)/100+ `${data.unit}`)
            .style("left", (event.pageX +10) + "px")             
            .style("top", (event.pageY - 60) + "px")
            .style("opacity", 1)
            
        })
      .on("mouseout", (d: any, event: any) => {
        const mouse = d3.pointer(event);
        const mousex = mouse[0];
        const mousey = mouse[1]; 
        this.xLine7.attr("x1", mousex).attr("x2",mousex).attr("opacity", 0);
        this.yLine7.attr("y1", mousey).attr("y2",mousey).attr("opacity", 0);
        this.Tooltip7.style("opacity", 0);
      });
  
      dots.exit().remove();
  }
}
