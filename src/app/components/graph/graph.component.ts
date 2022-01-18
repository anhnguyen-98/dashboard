import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  @Input() public pressureData!: {time: Date, data: number, sensor: string, station: string, units: string}[];
  @Input() public pmData!: {time: Date, data: number, sensor: string, station: string, units: string}[];
  max = 30;
  min = 1;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 1;

  private svg1 : any;
  private svg2 : any;

  private WIDTH        = 750;
  private HEIGHT       = 500;
  private MARGIN       = { top: 0, right: 20, bottom: 20, left: 40 };
  private INNER_WIDTH  = this.WIDTH - this.MARGIN.left - this.MARGIN.right;
  private INNER_HEIGHT = this.HEIGHT - this.MARGIN.top - this.MARGIN.bottom;

  constructor() { }

  // onChange(change: any) {
  //   this.value = change.value;
  //   console.log(change.value);
  // }

  ngOnInit(): void {
    this.createSvg1();
    this.drawLineChartPressure();

    this.createSvg2();
    this.drawLineChartParticulateMatter();
  }

  private createSvg1(): void {
    this.svg1 = d3.select("figure#scatter1")
    .append("svg")
    .attr("width", this.WIDTH)
    .attr("height", this.HEIGHT)
    .append("g")
    .attr("transform", "translate(" + this.MARGIN.left + "," + this.MARGIN.top + ")");
  }
  private createSvg2(): void {
    this.svg2 = d3.select("figure#scatter2")
    .append("svg")
    .attr("width", this.WIDTH)
    .attr("height", this.HEIGHT)
    .append("g")
    .attr("transform", "translate(" + this.MARGIN.left + "," + this.MARGIN.top + ")");
  }

  // Momentan haben wir noch keine Druckdaten, deswegen benutzen 
  // wir jetzt die Humidity Daten (Siehe bei services/sensor-data.service)
  // hier this.perssureData ist nur der Name
  private drawLineChartPressure(): void {
    // Add X axis
    const x = d3.scaleTime()
      .domain(d3.extent(this.pressureData, d => new Date(d.time)) as [Date, Date])
      .range([ 0, this.INNER_WIDTH ])
      // .ticks(12);

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([d3.min(this.pressureData, d => d.data) as number - 10, d3.max(this.pressureData, d => d.data) as number + 10])
      .range([ this.INNER_HEIGHT, 0]);

    // this.svg.append("g")
    // .attr("transform", "translate(0," + this.INNER_HEIGHT + ")")
    // .call(d3.axisBottom(x).ticks(10));

    // this.svg.append("text")
    // .style("text-anchor", "middle")
    // .attr("x", this.INNER_WIDTH/2)
    // .attr("y", this.INNER_HEIGHT + 35)
    // .text("X axis title");

    this.svg1.append("text")
    .attr("transform", "rotate(-90)")
    // .style("stroke", "rgb(115, 191, 105)")
    .style("fill", "white")
    .style("text-anchor", "middle")
    .attr("x", -this.INNER_WIDTH/3)
    .attr("y", -30)
    .text(`${this.pressureData[0].units}`);

    // this.svg.append("g")
    // .call(d3.axisLeft(y));

    const xAxisGrid = d3.axisBottom(x)
      .tickSize(-this.INNER_HEIGHT)
      // .tickFormat('')
      .ticks(d3.timeHour.every(2));

    const yAxisGrid = d3.axisLeft(y)
      .tickSize(-this.INNER_WIDTH)
      // .tickFormat('')
      .ticks(9);

    this.svg1.append("g")
      .attr("class", "axis-grid")
      .attr("transform", "translate(0," + this.INNER_HEIGHT + ")")
      .call(xAxisGrid)

    this.svg1.append('g')
      .attr('class', 'axis-grid')
      .call(yAxisGrid);

      const line = d3.line<any>()
      .x( (d: any) => x(d.time))
      .y((d: any) =>  y(d.data))
      .curve(d3.curveLinear);

      this.svg1
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "rgb(115, 191, 105)")
      .attr("stroke-width", 1.5)
      .attr("d", line(this.pressureData));

      
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

    // Add labels
    // dots.selectAll("text")
    // .data(this.data)
    // .enter()
    // .append("text")
    // .text((d: { Framework: any; }) => d.Framework)
    // .attr("x", (d: { Released: d3.NumberValue; }) => x(d.Released))
    // .attr("y", (d: { Stars: d3.NumberValue; }) => y(d.Stars))
  }
  private drawLineChartParticulateMatter(): void {
    // Add X axis
    const x = d3.scaleTime()
      .domain(d3.extent(this.pmData, d => new Date(d.time)) as [Date, Date])
      .range([ 0, this.INNER_WIDTH ])

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([d3.min(this.pmData, d => d.data) as number - 10, d3.max(this.pmData, d => d.data) as number + 10])
      .range([ this.INNER_HEIGHT, 0]);

    this.svg2.append("text")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .style("text-anchor", "middle")
    .attr("x", -this.INNER_WIDTH/3)
    .attr("y", -30)
    .text(`${this.pmData[0].units}`);

    const xAxisGrid = d3.axisBottom(x)
      .tickSize(-this.INNER_HEIGHT)
      .ticks(d3.timeHour.every(2));

    const yAxisGrid = d3.axisLeft(y)
      .tickSize(-this.INNER_WIDTH)
      .ticks(9);

    this.svg2.append("g")
      .attr("class", "axis-grid")
      .attr("transform", "translate(0," + this.INNER_HEIGHT + ")")
      .call(xAxisGrid)

    this.svg2.append('g')
      .attr('class', 'axis-grid')
      .call(yAxisGrid);

    const line = d3.line<any>()
      .x( (d: any) => x(d.time))
      .y((d: any) =>  y(d.data))
      .curve(d3.curveLinear);

    this.svg2
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 1.5)
      .attr("d", line(this.pmData));
  }
}
