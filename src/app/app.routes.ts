import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import {ListComponent} from './features/list/list.component';
import {CreateComponent} from './features/create/create.component';
import {EditComponent} from './features/edit/edit.component';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ProductsService } from './shared/services/products.service';

export const routes: Routes = [
    {
        path: '',
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
            product: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>{
                const productsService = inject(ProductsService);
                return productsService.get(route.paramMap.get('id') as string);    
            }
        },
        //component: EditComponent //chamada normal
        loadComponent: () => import('./features/edit/edit.component').then(m => m.EditComponent), //chamada usando lazy loading
    }
];
