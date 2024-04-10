import { Routes } from '@angular/router';
import {ListComponent} from './features/list/list.component';
import {CreateComponent} from './features/create/create.component';
import {EditComponent} from './features/edit/edit.component';

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
        path: 'edit-product',
        //component: EditComponent //chamada normal
        loadComponent: () => import('./features/edit/edit.component').then(m => m.EditComponent), //chamada usando lazy loading
    }
];
