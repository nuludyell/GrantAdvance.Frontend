import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/api/models/products/product.model';
import { AuthService } from 'src/app/api/services/auth.service';
import { ProductService } from 'src/app/api/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'creationDate'];
  dataSource: ProductModel[];

  constructor(
    private readonly productService: ProductService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar)
  {
  }
  
  ngOnInit(): void {
    this.productService
      .get()
      .subscribe(res => {
        this.dataSource = res;
      },
      err => {
        console.log(err);
      });
  }

  public logout() : void
  {
    this.authService.logout()
      .subscribe(() => {
        this.snackBar.open('Logout successful', 'close', {
          duration: 2000
        });
        this.router.navigate(['login']);
      });
  }
}
