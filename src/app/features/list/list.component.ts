import { Component, inject } from '@angular/core';
import {ProductsService} from '../../shared/services/products.service';
import {CardComponent} from './components/card/card.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {Router, RouterLink} from '@angular/router';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Delete File</h2>
    <mat-dialog-content>Are you sure you want to delete this product?</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>No</button>
      <button mat-button mat-dialog-close cdkFocusInitial>Ok</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule]
})


export class ConfirmationDialogComponent {
  constructor() {

  }
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  products: Product[] = []
  
  productsService = inject(ProductsService);
  router = inject(Router);
  matDoalog = inject(MatDialog);
  
  ngOnInit(){
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
    });
  }
  
  onEdit(product: Product){
    this.router.navigate(['/edit-product', product.id]);
  }
  
  onDelete(product: Product){ 
    this.matDoalog.open(ConfirmationDialogComponent)
      .afterClosed()
      .subscribe(
        (data) => {
          console.log('afterClosed', data);
        }
      );
    this.router.navigate(['/delete-product', product.id]);
  }
}
