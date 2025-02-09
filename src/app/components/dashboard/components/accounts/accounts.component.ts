import { DynamicTableComponent } from '../../../../shared/components/dynamic-table/dynamic-table.component';
import { DashboardService } from '../../../../services/dashboard.service';
import { AlertsService } from '../../../../services/alerts.service';
import { Title } from '@angular/platform-browser'; // For SEO purposes
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [DynamicTableComponent],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent {
  private subscriptions: Subscription[] = [];

  accounts: { Username: string, URL: string, Password: string }[] = [];
  isLoading: boolean = false;
  total: number = 0;
  limit: number = 10;
  page: number = 1;
  username: any = null;
  url: any = null;

  headers: any = [
    { field: 'URL', header: 'Url', type: 'url' },
    { field: 'Username', header: 'Username', type: 'text' },
    { field: 'Password', header: 'Password', type: 'password' },
  ]

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly alertsService: AlertsService,
    private title: Title// For SEO
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Accounts');
    this.getAccounts();
  }

  getAccounts(): void {
    this.isLoading = true;
    let sub: Subscription = this.dashboardService.getAccounts(this.page, this.limit, this.username, this.url).subscribe({
      next: (res: any) => {
        this.accounts = res?.data;
        this.total = res?.meta?.total;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.alertsService.openToast('error', 'Error', err.message);
      }
    })
    this.subscriptions.push(sub);
  }

  paginate(e: any): void {
    this.page = e?.page + 1;
    this.getAccounts();
  }

  search(val: any): void {
    this.page = 1;
    this.username = val;
    if (val == null) {
      this.getAccounts();
    }
  }
  searchUrl(val: any): void {
    this.page = 1;
    this.url = val;
    if (val == null) {
      this.getAccounts();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }
}
