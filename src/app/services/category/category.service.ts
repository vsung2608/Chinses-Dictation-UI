import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, CategoryStatistics } from '../../models/Lesson';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly API_CATEGORY_URL="http://localhost:8080/api/v1/admin/categories"
  private readonly API_CATEGORY_STATISTIC_URL="http://localhost:8080/api/v1/user/categories"

  private categoriesSubject = new BehaviorSubject<CategoryStatistics[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor(private httpClient: HttpClient) { 
    this.getCategoriesStatistic()
  }

  getCategories(){
    return this.httpClient.get<Category[]>(this.API_CATEGORY_URL);
  }

  getCategoriesStatistic(){
    this.httpClient.get<CategoryStatistics[]>(this.API_CATEGORY_STATISTIC_URL).subscribe(data => {
      this.categoriesSubject.next(data)
    })
  }
}
