import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ProductChartComponent } from '../product-chart/product-chart.component';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [TableModule, HttpClientModule, ProductChartComponent, ButtonModule, CommonModule],
  providers: [ProductService],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  animations: [
    trigger('disabled', [
      state('true', style({ opacity: 0.5 })),
      state('false', style({ opacity: 1 })),
      transition('* => *', animate('300ms ease-in-out'))
    ]),
  ]

})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private _productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {

    this._productService.getProducts().subscribe((res: any) => {
      this.products = res;
    })
  }

  addProduct() {

    this.router.navigate(['/products/new']);
  }

  updateProduct(id: number) {

    this.router.navigate(['products/edit/', id])
  }

  deleteProduct(id: number) {
    this._productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }
}
