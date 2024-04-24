import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { ProductsService } from '../services/products.service';

export const getProduct = (route: ActivatedRouteSnapshot) =>{
    const productsService = inject(ProductsService);
    return productsService.get(route.paramMap.get('id') as string);    
};