import { Component, inject } from '@angular/core';
import {ProductsService} from '../../shared/services/products.service';
import {CardComponent} from './components/card/card.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Router, RouterLink} from '@angular/router';
import { Product } from '../../shared/interfaces/product.interface';
import { filter } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Excluir produto</h2>
    <mat-dialog-content>
      Tem certeza que você quer excluir esse produto?</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-raised-button (click)="onNo()">Não</button>
      <button mat-raised-button color="accent" (click)="onYes()" cdkFocusInitial>Sim</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule]
})


export class ConfirmationDialogComponent {
  matDialogRef = inject(MatDialogRef);

  onNo(){
    this.matDialogRef.close(false);
  }

  onYes(){
    this.matDialogRef.close(true);
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
    this.matDoalog
      .open(ConfirmationDialogComponent)
      .afterClosed()
      .pipe(filter((answer) => answer === true ))
      .subscribe(() => {
        this.productsService.delete(product.id).subscribe(() => { 
          this.productsService.getAll().subscribe((products) => {
            this.products = products;
          });
        });
      });
  }
}
