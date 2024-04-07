import { Component, inject } from '@angular/core';
import {ProductsService} from '../../shared/services/products.service';
import {CardComponent} from './components/card/card.component';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  products: any[] = []

  productsService = inject(ProductsService);

  ngOnInit(){
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
    });
  }
}
