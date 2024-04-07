import { Routes } from '@angular/router';
import {ListComponent} from './features/list/list.component';
import {CreateComponent} from './features/create/create.component';

export const routes: Routes = [
    {
        path: '',
        component: ListComponent
    },
    {
        path: 'create-product',
        //component: CreateComponent //chamada normal
        loadComponent: () => import('./features/create/create.component').then(m => m.CreateComponent), //chamada usando lazy loading
    }
];
