import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../models/Lesson';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly API_CATEGPRY_URL="http://localhost:8080/api/v1/admin/categories"

  constructor(private httpClient: HttpClient) { }

  getCategories(){
    return this.httpClient.get<Category[]>(this.API_CATEGPRY_URL);
  }
}
