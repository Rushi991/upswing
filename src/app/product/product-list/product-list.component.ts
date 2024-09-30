import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ProductChartComponent } from '../product-chart/product-chart.component';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [TableModule, HttpClientModule, ProductChartComponent, ButtonModule,CommonModule],
  providers: [ProductService],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = []; // Store product data for the table

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.loadProducts(); // Load products when the component initializes
  }

  loadProducts() {
    debugger
    this.productService.getProducts().subscribe(data => {
      this.products = data; // Update product list
    });
  }

  addProduct() {
    debugger
    this.router.navigate(['/products/new']);
  } 

  updateProduct(id: number) {
    debugger
    this.router.navigate(['products/edit/', id])
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts(); // Refresh product list after deletion
    });
  }
}
