import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import * as d3 from 'd3';


@Component({
  selector: 'app-bar-chart',
  imports: [FormsModule,MatCardModule,MatInputModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements AfterViewInit {
  inputData: string = '';
  colors = d3.schemeCategory10.slice(0, 5); // Five distinct colors

  ngAfterViewInit() {
    this.createChart([]);
  }
 
  updateChart() {
    const data = this.inputData.split(',').map(d => parseInt(d.trim())).filter(d => !isNaN(d));
    this.createChart(data);
  }

  createChart(data: number[]) {
    d3.select('#chart').selectAll('*').remove();
  
  const width = 500, height = 300;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const svg = d3.select('#chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height);
  
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data) || 1])
    .range([0, width - margin.right - margin.left]);

  const yScale = d3.scaleBand()
    .domain(data.map((_, i) => i.toString()))
    .range([0, height - margin.top - margin.bottom])
    .padding(0.2);

  const bars = svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', margin.left)
    .attr('y', (_, i) => yScale(i.toString())!)
    .attr('width', d => xScale(d))
    .attr('height', yScale.bandwidth())
    .attr('fill', (_, i) => this.colors[i % this.colors.length]);

  // Agregar etiquetas dentro de las barras
  svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('x', d => margin.left + xScale(d) - 10) // Posicionar al final de la barra
    .attr('y', (_, i) => yScale(i.toString())! + yScale.bandwidth() / 2 + 5)
    .attr('fill', 'white')
    .attr('text-anchor', 'end')
    .attr('font-size', '12px')
    .text(d => d.toString());
  }
}
