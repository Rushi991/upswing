import { Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductFormComponent } from './product/product-form/product-form.component';

export const routes: Routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full' }, // Redirect to products list by default
    { path: 'products', component: ProductListComponent },
    { path: 'products/new', component: ProductFormComponent }, // Route for adding a new product
    { path: 'products/edit/:id', component: ProductFormComponent } // Ro  { path:
];
