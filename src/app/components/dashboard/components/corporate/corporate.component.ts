import { DynamicTableComponent } from '../../../../shared/components/dynamic-table/dynamic-table.component';
import { DashboardService } from '../../../../services/dashboard.service';
import { AlertsService } from '../../../../services/alerts.service';
import { Title } from '@angular/platform-browser'; // For SEO purposes
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-corporate',
  standalone: true,
  imports: [DynamicTableComponent],
  templateUrl: './corporate.component.html',
  styleUrl: './corporate.component.scss'
})
export class CorporateComponent {
  private subscriptions: Subscription[] = [];

  corporateList: { Username: string, URL: string, Password: string }[] = [];
  isLoading: boolean = false;
  total: number = 0;
  limit: number = 10;
  page: number = 1;
  username: any = null;
  url: any = null;

  headers: any = [
    // { field: 'ID', header: 'ID', type: 'text' },
    { field: 'URL', header: 'Url', type: 'url' },
    { field: 'Username', header: 'Username', type: 'text' },
    { field: 'Password', header: 'Password', type: 'password' },
    { field: 'OS', header: 'OS', type: 'text' },
    { field: 'Path', header: 'Path', type: 'text' },
    { field: 'InstallDate', header: 'InstallDate', type: 'date' },
    { field: 'Hostname', header: 'Hostname', type: 'text' },
    { field: 'Antivirus', header: 'Antivirus', type: 'text' },
    { field: 'HWID', header: 'HWID', type: 'text' },
    { field: 'IPAddress', header: 'IP Address', type: 'text' },
    { field: 'Country', header: 'Country', type: 'text' },
    { field: 'LeakedDate', header: 'Leaked Date', type: 'date' },
  ]

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly alertsService: AlertsService,
    private title: Title,// For SEO
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Corporate');
    this.getCorporateList();
  }

  getCorporateList(): void {
    this.isLoading = true;
    let sub: Subscription = this.dashboardService.getCorporateList(this.page, this.limit, this.username, this.url).subscribe({
      next: (res: any) => {
        let data: any[] = [];
        res?.data?.forEach((item: any) => {
          {
            data.push({
              "ID": item?.system?.ID,
              "OS": item?.system?.OS,
              "Path": item?.system?.Path,
              "InstallDate": item?.system?.InstallDate,
              "Hostname": item?.system?.Hostname,
              "Antivirus": item?.system?.Antivirus,
              "HWID": item?.system?.HWID,
              "IPAddress": item?.system?.IPAddress,
              "LeakedDate": item?.system?.LeakedDate,
              "Country": item?.system?.Country,
              "URL": item?.credentials?.URL,
              "Username": item?.credentials?.Username,
              "Password": item?.credentials?.Password,
            })
          }
        })
        this.corporateList = data;
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
    this.getCorporateList();
  }

  search(val: any): void {
    this.page = 1;
    this.username = val?.username;
    this.url = val?.url;
    if (this.corporateList?.length == 0) {
      this.getCorporateList();
    }
  }
  searchUrl(val: any): void {
    this.page = 1;
    this.url = val;
    if (val == null) {
      this.getCorporateList();
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
