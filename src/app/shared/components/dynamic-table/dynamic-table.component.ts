import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { NoDataComponent } from '../no-data/no-data.component';
import { SkeletonModule } from 'primeng/skeleton';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, NoDataComponent, SkeletonModule, PaginatorModule],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss'
})
export class DynamicTableComponent {
  @Input() tableData: any = [];
  @Input() tableHeaders: any = [];
  @Input() row: number = 10;
  @Input() showActions: boolean = true;
  @Input() showPagination: boolean = true;
  @Input() isLoading: boolean = false;

  @Input() paginatorRows: number = 10;
  @Input() totalRecords: number = 0;

  searchItems: any = [];
  @Output() paginateOptionsHandler: EventEmitter<any> = new EventEmitter();

  private searchSubject = new Subject();
  private searchSubjectUrl = new Subject();
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() searchUrl: EventEmitter<any> = new EventEmitter();

  @ViewChild('paginator') paginator: Paginator | undefined;

  ngOnInit(): void {
    this.tableHeaders?.forEach((item: any) => {
      this.searchItems?.push(item?.field);
    });

    this.searchHandle();
    this.searchHandleUrl();
  }

  searchHandle(): void {
    this.searchSubject
      ?.pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      ?.subscribe((val: any) => {
        if (val) {
          this.search.emit(val);
        } else {
          this.search.emit(null);
        }
        this.paginator?.changePage(0);
      });
  }

  searchHandleUrl(): void {
    this.searchSubjectUrl
      ?.pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      ?.subscribe((val: any) => {
        if (val) {
          this.searchUrl.emit(val);
        } else {
          this.searchUrl.emit(null);
        }
        this.paginator?.changePage(0);
      });
  }

  clear(table: any): void {
    table?.clear();
  }
  clearSearchValue(search: any): void {
    search.value = '';
    this.search.emit(null);
    this.paginator?.changePage(0);
  }

  clearSearchValueUrl(search: any): void {
    search.value = '';
    this.searchUrl.emit(null);
    this.paginator?.changePage(0);
  }

  paginate(e: any): void {
    this.paginateOptionsHandler?.emit(e);
  }

  filterGlobal(val: any): void {
    this.searchSubject.next(val);
  }

  filterGlobalUrl(val: any): void {
    this.searchSubjectUrl.next(val);
  }

  maskPassword(text: string): string {
    if (text.length <= 3) {
      return text;
    }

    const firstThree = text.slice(0, 3);

    const maskedPart = '*'.repeat(text.length - 3);

    return firstThree + maskedPart;
  }
}
