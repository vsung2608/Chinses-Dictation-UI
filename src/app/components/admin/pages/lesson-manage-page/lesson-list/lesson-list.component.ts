import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { InputIconModule } from 'primeng/inputicon';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Router, RouterLink } from '@angular/router';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Lesson } from '../../../../../models/Lesson';
import { LessonService } from '../../../../../services/lesson/lesson.service';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-lesson-list',
  imports: [ConfirmDialogModule, ButtonModule, FormsModule, SelectModule, DialogModule,
    TableModule, ToolbarModule, ToastModule, RadioButtonModule, TagModule, FloatLabelModule,
    RatingModule, InputIconModule, IconFieldModule, FileUploadModule, InputTextModule,
    CommonModule, BreadcrumbModule, RouterLink, PaginatorModule],
  templateUrl: './lesson-list.component.html',
  styleUrl: './lesson-list.component.css'
})
export class LessonListComponent {
  items?: MenuItem[];

  lessons!: Lesson[];

  lesson!: Lesson;

  selectedLessons!: Lesson[] | null;

  submitted: boolean = false;

  first: number = 0;

  rows: number = 10;

  page: number = 0;

  totalRecords?: number;

  @ViewChild('dt') dt!: Table;

  cols!: Column[];

  isPlaying: boolean = false;

  exportColumns!: ExportColumn[];

  visibleLessonDialog = false;

  levels: string[] = ['HSK1', 'HSK2', 'HSK3', 'HSK4', 'HSK5', 'HSK6', 'HSK7', 'HSK8', 'HSK9']

  selectedLevel: string = ''

  loading: boolean = true;

  value2 = ''

  constructor(
    private lessonService: LessonService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef,
    private route: Router
  ) {
  }

  ngOnInit(): void {
    this.loadDemoData();
    this.items = [{ icon: 'pi pi-home', route: '/admin' }, { label: 'Quản lý' }, { label: 'Sản phẩm' }, { label: 'Danh sách', route: '/admin/products' }];
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.page = event.page ?? 0;
    this.lessonService.getLessonPaged(this.page + 1, this.rows).subscribe(page => {
      this.lessons = page.data
      this.totalRecords = page.totalElements
      this.cd.markForCheck()
    })
  }

  exportCSV(event: Event) {
    this.dt.exportCSV();
  }

  loadDemoData() {
    this.lessonService.getLessonPaged(this.first + 1, this.rows).subscribe(page => {
      this.loading = false
      this.lessons = page.data
      this.totalRecords = page.totalElements
      this.cd.markForCheck()
    })

    this.cols = [
      { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
      { field: 'name', header: 'Name' },
      { field: 'image', header: 'Image' },
      { field: 'price', header: 'Price' },
      { field: 'category', header: 'Category' }
    ];

    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  navigateNewLessonPage() {
    this.route.navigateByUrl("/admin/products/add")
  }

  editLesson(id: number) {
    this.lessonService.getDetailLessonById(id)
      .subscribe(les => this.lesson = les);
    this.visibleLessonDialog = true;
  }

  deleteSelectedLessons() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.lessons = this.lessons.filter((val) => !this.selectedLessons?.includes(val));
        this.selectedLessons = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000
        });
      }
    });
  }

  hideDialog() {
    this.visibleLessonDialog = false;
    this.submitted = false;
  }

  deleteLesson(lesson: Lesson) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + this.lesson.titleChinese + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.lessons = this.lessons.filter((val) => val.id !== lesson.id);
        this.lesson = {} as Lesson;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000
        });
      }
    });
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.lessons.length; i++) {
      if (this.lessons[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  getSeverity(quantity: number) {
    if (quantity == 0) return 'danger';
    else if (quantity <= 20) return 'warn';
    else return 'success';
  }

  getStatus(quantity: number) {
    if (quantity == 0) return 'Hết hàng (' + quantity + ')';
    else if (quantity <= 20) return 'Sắp hết (' + quantity + ')';
    else return 'Còn hàng (' + quantity + ')';
  }

  saveLesson() {
    this.submitted = true;

    if (this.lesson.titleChinese?.trim()) {
      if (this.lesson.id) {
        // const productTmp: ProductLimitedFields = {id: this.product.id, image: this.product.image, price: this.product.price, evaluate: this.product.evaluate,
        // name: this.product.name, quantity: this.product.quantity, categoryName: this.product.categoryName, discount: this.product.discount}
        this.lessons[this.findIndexById(this.lesson.id)] = this.lesson;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000
        });
      }

      this.lessons = [...this.lessons];
      this.visibleLessonDialog = false;
      this.lesson = {} as Lesson;
    }
  }

  onGlobalFilter(event: any) {
    const value = (event.target as HTMLInputElement).value;
    this.dt?.filterGlobal(value, 'contains');
  }

  onUpload(event: UploadEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }
}
