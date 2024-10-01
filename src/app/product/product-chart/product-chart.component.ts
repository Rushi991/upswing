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
  @Input() chartData: any[] = [];
  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  formattedChartData: any[] = [];

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartData'] && this.chartData) {
      this.updateChartData();
    }
  }
  private updateChartData() {
    debugger
    console.log('Raw chart data:', this.chartData);

    this.formattedChartData = this.chartData.map(product => ({
      name: `${product.name} (${product.category || 'Uncategorized'})`,
      value: Number(product.price) || 0,
    }));

    console.log('Formatted chart data:', this.formattedChartData);
  }



}
