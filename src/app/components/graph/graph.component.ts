import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { color } from 'd3';

//dddgfgg
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  @Input() public pressureData!: {time: Date, data: number, sensor: string, station: string, units: string}[];
  @Input() public pmData!: {time: Date, data: number, sensor: string, station: string, units: string}[];
  @Input() public changeStation: any;
  max = 30;
  min = 1;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 1;

  private svg1 : any;
  private svg2 : any;
  public y1!: any;
  public x1!: any;
  public y2!: any;
  public x2!: any;
  public xAxisGrid1: any;
  public yAxisGrid1: any;
  public xAxisGrid2: any;
  public yAxisGrid2: any;
  public line1: any;
  public line2: any;

  private WIDTH        = 640;
  private HEIGHT       = 460;
  private MARGIN       = { top: 0, right: 20, bottom: 20, left: 40 };
  private INNER_WIDTH  = this.WIDTH - this.MARGIN.left - this.MARGIN.right;
  private INNER_HEIGHT = this.HEIGHT - this.MARGIN.top - this.MARGIN.bottom;
  private colors = ['#008080', '#125EB3', '#5C9DE6', '#8D3B23', '#B31E12']

  constructor() { }

  // onChange(change: any) {
  //   this.value = change.value;
  //   console.log(change.value);
  // }

  ngOnInit(): void {
    console.log('on init');

    this.createSvg1();
    this.drawLineChartPressure();
    this.update1(this.pressureData);

    this.createSvg2();
    this.drawLineChartParticulateMatter();
    this.update2(this.pmData);

  }

  private createSvg1(): void {
    this.svg1 = d3.select("div#scatter1")
    .append("div")
    .classed("svg-container", true)
    .append("svg")
    // .attr("width", this.WIDTH)
    // .attr("height", this.HEIGHT)
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
    // .attr("width", this.WIDTH)
    // .attr("height", this.HEIGHT)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", `0 0 ${this.WIDTH} ${this.HEIGHT}`)
    .classed("svg-content-responsive", true)
    .append("g")
    .attr("transform", "translate(" + this.MARGIN.left + "," + this.MARGIN.top + ")");
  }

  // Momentan haben wir noch keine Druckdaten, deswegen benutzen 
  // wir jetzt die Humidity Daten (Siehe bei services/sensor-data.service)
  // hier this.perssureData ist nur der Name
  private drawLineChartPressure(): void {
    // Add X axis
    this.x1 = d3.scaleTime()
      // .domain(d3.extent(this.pressureData, d => new Date(d.time)) as [Date, Date])
      .range([ 0, this.INNER_WIDTH ])
      // .ticks(12);

    // Add Y axis
    this.y1 = d3.scaleLinear()
      // .domain([d3.min(this.pressureData, d => d.data) as number - 10, d3.max(this.pressureData, d => d.data) as number + 10])
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
    
  }
  private drawLineChartParticulateMatter(): void {
    // Add X axis
    this.x2 = d3.scaleTime()
      // .domain(d3.extent(this.pmData, d => new Date(d.time)) as [Date, Date])
      .range([ 0, this.INNER_WIDTH ])

    // Add Y axis
    this.y2 = d3.scaleLinear()
      // .domain([d3.min(this.pmData, d => d.data) as number - 10, d3.max(this.pmData, d => d.data) as number + 10])
      .range([ this.INNER_HEIGHT, 0]);

    this.svg2.append("text")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .style("text-anchor", "middle")
    .attr("x", -this.INNER_WIDTH/3)
    .attr("y", -30)
    .text(`${this.pmData[0].units}`);

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
  
  }

  public update1(data: any) {
    // for (let i = 0; i < data.length; i++) {
    //   console.log('loop ' + i);
      
    //   this.x1.domain(d3.extent(data[i], (d: any) => new Date(d.time)) as [Date, Date]);
    //   this.svg1.selectAll(".axis-grid1")
    //     .transition()
    //     .duration(1000)
    //     .call(this.xAxisGrid1);
  
    // // create the Y axis
    // // .domain([d3.min(this.pmData, d => d.data) as number - 10, d3.max(this.pmData, d => d.data) as number + 10])
    // this.y1.domain([d3.min(data[i], (d: any) => d.data) as unknown as number - 10, d3.max(data[i], (d: any) => d.data) as unknown as number + 10]);
    // this.svg1.selectAll(".axis-grid2")
    //   .transition()
    //   .duration(1000)
    //   .call(this.yAxisGrid1);

    //   // Create a update selection: bind to the new data
    // let linex = this.svg1.selectAll(".linee" + i)
    //   .data([data[i]], function(d: any){ return d.data });
  
    // // Updata the line
    // // linex
    // //   .enter()
    // //   .append("path")
    // //   .attr("class","linee" + i)
    // //   .merge(linex)
    // //   .transition()
    // //   .duration(1000)
    // //   .attr("d", d3.line()
    // //     .x((d: any) => this.x1(d.time))
    // //     .y((d: any) => this.y1(d.data)))
    // //     .attr("fill", "none")
    // //     .attr("stroke", "white")
    // //     .attr("stroke-width", 1.5)

    // linex
    //   .enter()
    //   .append("path")
    //   .attr("class","linee" + i)
    //   .merge(linex)
    //   .transition()
    //   .duration(1000)
    //   .attr("d", d3.line()
    //     .x((d: any) => this.x1(d.time))
    //     .y((d: any) => this.y1(d.data)))
    //     .attr("fill", "none")
    //     .attr("stroke", this.colors[i])
    //     .attr("stroke-width", 1.5)
    // linex
    //   .enter()
    //   .append("path")
    //   .attr("class","linee")
    //   .merge(linex)
    //   .transition()
    //   .duration(1000)
    //   .attr("d", d3.line()
    //     .x((d: any) => this.x1(d.time))
    //     .y((d: any) => this.y1(d.data)))
    //     .attr("fill", "none")
    //     .attr("stroke", this.colors[i])
    //     .attr("stroke-width", 1.5)

    // }
    
    // Create the X axis:
    // .domain(d3.extent(this.pmData, d => new Date(d.time)) as [Date, Date])
    this.x1.domain(d3.extent(data, (d: any) => new Date(d.time)) as [Date, Date]);
    this.svg1.selectAll(".axis-grid1")
      .transition()
      .duration(1000)
      .call(this.xAxisGrid1);
  
    // create the Y axis
    // .domain([d3.min(this.pmData, d => d.data) as number - 10, d3.max(this.pmData, d => d.data) as number + 10])
    this.y1.domain([d3.min(data, (d: any) => d.data) as unknown as number - 10, d3.max(data, (d: any) => d.data) as unknown as number + 10]);
    this.svg1.selectAll(".axis-grid2")
      .transition()
      .duration(1000)
      .call(this.yAxisGrid1);


  //   var sumstat = d3.nest() 
  //     .key(d => d.media)
  //     .entries(data);
  
  // console.log(sumstat)
  
    // Create a update selection: bind to the new data
    let line1 = this.svg1.selectAll(".line")
      .data([data], function(d: any){ return d.data });
  
    // Updata the line
    line1
      .enter()
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
        .attr("stroke-width", 1.5)

        // this.svg1
        // .append("path")
        // .attr("fill", "none")
        // .attr("stroke", "rgb(115, 191, 105)")
        // .attr("stroke-width", 1.5)
        // .attr("d", this.line1(data));


        // this.line2 = d3.line<any>()
        // .x( (d: any) => this.x2(d.time))
        // .y((d: any) =>  this.y2(d.data))
        // .curve(d3.curveLinear);

        // let lines = this.svg1.append('g')
        //   .attr('class', 'lines');

        // lines.selectAll('.line-group')
        // .data(data).enter()
        // .append('g')
        // .attr('class', 'line-group')  
        // .on("mouseover", (d: any, i: any) => {
        //     this.svg1.append("text")
        //       .attr("class", "title-text")
        //       .style("fill", color(i))        
        //       // .text(d.name)
        //       .attr("text-anchor", "middle")
        //       .attr("x", (this.WIDTH-this.HEIGHT)/2)
        //       .attr("y", 5);
        //   })
        // .on("mouseout", (d: any) {
        //     this.svg1.select(".title-text").remove();ß
        //   })
        // .append('path')
        // .attr('class', 'line')  
        // .attr('d', (d: any) => d3.line(d.values))
        // .style('stroke', (d: any, i: any) => color(i))
        // .style('opacity', 0.25)
        // .on("mouseover", function(d: any) {
        //     d3.selectAll('.line')
        //         .style('opacity', 0.1);
        //     d3.selectAll('.circle')
        //         .style('opacity', 0.25);
        //     d3.select(this)
        //       .style('opacity', 0.85)
        //       .style("stroke-width", lineStrokeHover)
        //       .style("cursor", "pointer");
        //   })
        // .on("mouseout", function(d) {
        //     d3.selectAll(".line")
        //         .style('opacity', lineOpacity);
        //     d3.selectAll('.circle')
        //         .style('opacity', circleOpacity);
        //     d3.select(this)
        //       .style("stroke-width", lineStroke)
        //       .style("cursor", "none");
        //   });
  }

  public update2(data: any) {
    this.x2.domain(d3.extent(data, (d: any) => new Date(d.time)) as [Date, Date]);
    this.svg2.selectAll(".axis-grid1")
      .transition()
      .duration(1000)
      .call(this.xAxisGrid2);
  
    // create the Y axis
    // .domain([d3.min(this.pmData, d => d.data) as number - 10, d3.max(this.pmData, d => d.data) as number + 10])
    this.y2.domain([d3.min(data, (d: any) => d.data) as unknown as number - 10, d3.max(data, (d: any) => d.data) as unknown as number + 10]);
    this.svg2.selectAll(".axis-grid2")
      .transition()
      .duration(1000)
      .call(this.yAxisGrid2);
  
    // Create a update selection: bind to the new data
    let line2 = this.svg2.selectAll(".line")
      .data([data], function(d: any){ return d.data });
  
    // Updata the line
    line2
      .enter()
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
  }
}
