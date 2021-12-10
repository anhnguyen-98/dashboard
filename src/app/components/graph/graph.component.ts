import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  private data = [
    {"Framework": "Vue", "Stars": "166443", "Released": "01.01.2022"},
    {"Framework": "React", "Stars": "150793", "Released": "02.01.2022"},
    {"Framework": "Angular", "Stars": "62342", "Released": "03.01.2022"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "04.01.2022"},
    {"Framework": "Ember", "Stars": "21471", "Released": "05.01.2022"},
  ];
  private svg : any;
  private margin = 40;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.drawPlot();
  }

  private createSvg(): void {
    this.svg = d3.select("figure#scatter")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawPlot(): void {
    // Add X axis
    const x = d3.scaleLinear()
    .domain([2009, 2017])
    .range([ 0, this.width ]);
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([0, 200000])
    .range([ this.height, 0]);
    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Add dots
    const dots = this.svg.append('g');
    // dots.selectAll("dot")
    // .data(this.data)
    // .enter()
    // .append("circle")
    // .attr("cx", (d: { Released: d3.NumberValue; }) => x(d.Released))
    // .attr("cy", (d: { Stars: d3.NumberValue; }) => y(d.Stars))
    // .attr("r", 7)
    // .style("opacity", .5)
    // .style("fill", "#69b3a2");

    // Add labels
    dots.selectAll("text")
    .data(this.data)
    .enter()
    .append("text")
    // .text((d: { Framework: any; }) => d.Framework)
    .attr("x", (d: { Released: d3.NumberValue; }) => x(d.Released))
    .attr("y", (d: { Stars: d3.NumberValue; }) => y(d.Stars))
  }
}
