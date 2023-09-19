import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../models/products/product.model';
import { Observable } from 'rxjs';
import appConfig from '../../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly url = appConfig.url + 'products';

  constructor(private readonly httpClient: HttpClient) { }
  
  public get(): Observable<ProductModel[]> {
    return this.httpClient
      .get<ProductModel[]>(this.url);
  }
}
