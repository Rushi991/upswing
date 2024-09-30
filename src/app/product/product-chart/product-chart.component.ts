import { BrowserPlatformLocation } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-product-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './product-chart.component.html',
  styleUrls: ['./product-chart.component.css'],
  
})
export class ProductChartComponent implements OnInit, OnChanges {
  @Input() chartData: any[] = []; // Accept chart data as input
  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  formattedChartData: any[] = []; // Holds the formatted data for the chart

  ngOnInit() {
    // No need to call updateChartData here, as it will be handled in ngOnChanges
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartData'] && this.chartData) {
      this.updateChartData(); // Update the chart when input data changes
    }
  }
  private updateChartData() {
    debugger
    console.log('Raw chart data:', this.chartData); // Debugging
  
    // Update chart data to include name and category in the name
    this.formattedChartData = this.chartData.map(product => ({
      name: `${product.name} (${product.category || 'Uncategorized'})`,  // Combine name and category
      value: Number(product.price) || 0, // Ensure price is a valid number
    }));
  
    console.log('Formatted chart data:', this.formattedChartData); // Debugging
  }
  
  

}
