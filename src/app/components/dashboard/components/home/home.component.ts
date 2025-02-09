import { EarthStatisticsComponent } from './earth-statistics/earth-statistics.component';
import { DashboardService } from '../../../../services/dashboard.service';
import { AlertsService } from '../../../../services/alerts.service';
import { Title } from '@angular/platform-browser'; // For SEO purposes
import { SkeletonModule } from 'primeng/skeleton';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, EarthStatisticsComponent, SkeletonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private subscriptions: Subscription[] = [];

  isLoading: boolean = false;
  details: any;

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly alertsService: AlertsService,
    private title: Title// For SEO
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Dashboard');

    this.getDashboardDetails();
  }

  getDashboardDetails(): void {
    this.isLoading = true;
    let sub: Subscription = this.dashboardService.getDashboardDetails().subscribe({
      next: (res: any) => {
        this.details = res;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.alertsService.openToast('error', 'Error', err.message);
      }
    })
    this.subscriptions.push(sub);

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }
}
