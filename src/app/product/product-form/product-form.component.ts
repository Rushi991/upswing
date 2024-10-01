import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, ButtonModule],
  providers: [ProductService],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  productForm: FormGroup;
  productId: any;

  constructor(
    private _productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });
    this.fetchProductById();
  }


  fetchProductById() {
    debugger
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this._productService.getProducts().subscribe((products: any[]) => {
        const product = products.find((p: { id: number | null; }) => p.id === this.productId);
        if (product) {
          this.productForm.patchValue(product);
        }

      });
    }
  }
  saveProduct() {
    if (this.productForm.valid) {
      const productData = { ...this.productForm.value };

      if (this.productId) {
        productData.id = this.productId;
        this._productService.updateProduct(productData).subscribe(() => {
          this.router.navigate(['/products']);
        });
      } else {
        this._productService.addProduct(productData).subscribe(() => {
          this.router.navigate(['/products']);
        });
      }
    }
  }


}
