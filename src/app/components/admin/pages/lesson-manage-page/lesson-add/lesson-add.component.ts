import { Component, OnInit } from '@angular/core';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { PrimeNG } from 'primeng/config';
import { MenuItem, MessageService } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { EditorModule } from 'primeng/editor';
import { DatePickerModule } from 'primeng/datepicker';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RouterLink } from '@angular/router';
import { LessonService } from '../../../../../services/lesson/lesson.service';
import { SelectModule } from 'primeng/select';
import { Category, Lesson, Sentence } from '../../../../../models/Lesson';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { CategoryService } from '../../../../../services/category/category.service';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-lesson-add',
  imports: [FileUploadModule, ButtonModule, BadgeModule, FormsModule, CommonModule, TableModule, DialogModule, InputNumber,
    FloatLabelModule, SelectModule, DatePickerModule, RouterLink, ButtonModule, BreadcrumbModule, InputTextModule,
    TextareaModule],
  templateUrl: './lesson-add.component.html',
  styleUrl: './lesson-add.component.css'
})
export class LessonAddComponent {
  totalSize: number = 0;

  selectedFile: File | null = null;

  totalSizePercent: number = 0;

  descriptionVal: string = '';

  dateVal: Date | undefined

  levels: string[] = ['HSK1', 'HSK2', 'HSK3', 'HSK4', 'HSK5', 'HSK6', 'HSK7', 'HSK8', 'HSK9']

  categories!: Category[]

  selectedLevel!: number;

  lesson: Lesson = {
    id: 0, titleChinese: '', titleVietnamese: '', description: '', audioFilePath: '', level: '', displayOrder: 0,
    totalSentences: 0, estimatedDurationSeconds: 0, sentences: [], categoryId: 0
  }

  newSentence: Sentence = {
    id: 0, sentenceOrder: this.lesson.sentences.length, chineseText: '', pinyinText: '',
    vietnameseTranslation: '', startTimeSeconds: 0, endTimeSeconds: 0
  }

  loading: boolean = false;

  items?: MenuItem[];

  visibleSentenceDialog = false

  constructor(private config: PrimeNG, private messageService: MessageService, private lessonService: LessonService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.items = [{ icon: 'pi pi-home', route: '/admin' }, { label: 'Quản lý' }, { label: 'Sản phẩm' }, { label: 'Thêm mới', route: '/admin/products/add' }];
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  load() {
    if (this.selectedFile != null) {
      const formData = new FormData();
      formData.append('lesson', JSON.stringify(this.lesson))
      formData.append('file', this.selectedFile, this.selectedFile.name)
      this.loading = true;

      this.lessonService.createLesson(formData).subscribe(les => {
        this.loading = false
        this.lesson = {
          id: 0, titleChinese: '', titleVietnamese: '', description: '', audioFilePath: '', level: '', displayOrder: 0,
          totalSentences: 0, estimatedDurationSeconds: 0, sentences: [], categoryId: 0
        }
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Bài học được thêm thành công!' });
      })    
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Lỗi', detail: 'File audio không hợp lệ!' });
    }
  }

  deleteSentence(order: number) {
    this.lesson.sentences = this.lesson.sentences.filter(s => s.sentenceOrder !== order);
  }

  addNewSentence() {
    this.visibleSentenceDialog = true
  }

  deleteAllSentence() {
    this.lesson.sentences = []
  }

  confirmAddNewSentence() {
    this.lesson.sentences = [...this.lesson.sentences, this.newSentence];
    this.visibleSentenceDialog = true
    this.newSentence = {
      id: 0, sentenceOrder: this.lesson.sentences.length, chineseText: '', pinyinText: '',
      vietnameseTranslation: '', startTimeSeconds: 0, endTimeSeconds: 0
    }
  }

  // Chỉ lưu file đầu tiên
  onFileSelect(event: any) {
    if (event.files && event.files.length > 0) {
      this.selectedFile = event.files[0];
      console.log('Selected file:', this.selectedFile);
    }
  }
}
