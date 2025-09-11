import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Event, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { IconFieldModule } from 'primeng/iconfield';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../../../services/comment/comment.service';
import { CommentResponse } from '../../../../models/Comment';

@Component({
  selector: 'app-comment-manage-page',
  imports: [BreadcrumbModule, RouterLink, CommonModule, ToastModule, TableModule, ButtonModule, ProgressBarModule,
    TagModule, InputIconModule, SliderModule, DropdownModule, MultiSelectModule, IconFieldModule, FormsModule],
  templateUrl: './comment-manage-page.component.html',
  styleUrl: './comment-manage-page.component.css'
})
export class CommentManagePageComponent {
  comments!: CommentResponse[]

  selectedComments!: CommentResponse[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  items?: MenuItem[];

  totalRecords?: number;

  first: number = 0;

  rows: number = 10;

  page: number = 0;

  @ViewChild('dt') dt!: Table;

  constructor(private commentService: CommentService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.commentService.loadCommentOrderByDate(this.first + 1, this.rows)
      .subscribe(pageData => {
        this.comments = pageData.data
        this.loading = false
        this.totalRecords = pageData.totalElements
        this.cd.markForCheck()
      })

    this.items = [{ icon: 'pi pi-home', route: '/admin' }, { label: 'Quản lý' }, { label: 'Khách hàng' }, { label: 'Danh sách', route: '/admin/customers' }];
  }

  getSeverity(status: string) {
    switch (status) {
      case 'DELETED':
        return 'danger';

      case 'ACTIVE':
        return 'success';

      case 'INACTIVE':
        return 'info';

      case 'LOCKED':
        return 'warn';

      case 'BANNED':
        return undefined;

      default:
        return undefined;
    }
  }

  onGlobalFilter(event: any) {
    const value = (event.target as HTMLInputElement).value;
    this.dt?.filterGlobal(value, 'contains');
  }

  clear(event: Event) {

  }
}
