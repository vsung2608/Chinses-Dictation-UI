import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../services/category/category.service';
import { CategoryStatistics } from '../../../../models/Lesson';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-page',
  imports: [CommonModule],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.css'
})
export class CategoryPageComponent implements OnInit{
  categories$!: Observable<CategoryStatistics[]>;

  constructor(private categoryService: CategoryService, private router: Router){

  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.categories$
  }

  navigateToLessonPage(id: number){
    this.router.navigate(['/categories', id]);
  }
}
