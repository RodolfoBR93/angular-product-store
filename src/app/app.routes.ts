import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import {ListComponent} from './features/list/list.component';
import { inject } from '@angular/core';
import { getProduct } from './shared/resolvers/get-product.resolver';
import { getProducts } from './shared/resolvers/get-products.resolver';

export const routes: Routes = [
    {
        path: '',
        resolve: {  
            products: getProducts
        },
        component: ListComponent
    },

    {
        path: 'create-product',
        //component: CreateComponent //chamada normal
        loadComponent: () => import('./features/create/create.component').then(m => m.CreateComponent), //chamada usando lazy loading
    },
    {
        path: 'edit-product/:id',
        resolve: {
            product: getProduct
        },
        //component: EditComponent //chamada normal
        loadComponent: () => import('./features/edit/edit.component').then(m => m.EditComponent), //chamada usando lazy loading
    }
];
