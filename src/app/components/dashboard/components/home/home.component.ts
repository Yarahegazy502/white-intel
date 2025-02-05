import { EarthStatisticsComponent } from './earth-statistics/earth-statistics.component';
import { Component } from '@angular/core';
import { DashboardService } from '../../../../services/dashboard.service';
import { AlertsService } from '../../../../services/alerts.service';
import { SkeletonModule } from 'primeng/skeleton';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, EarthStatisticsComponent,SkeletonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  isLoading: boolean = false;
  details: any;

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly alertsService: AlertsService,
  ) { }

  ngOnInit(): void {
    this.getDashboardDetails();
  }

  getDashboardDetails(): void {
    this.isLoading = true;
    this.dashboardService.getDashboardDetails().subscribe({
      next: (res: any) => {
        this.details = res;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.alertsService.openToast('error', 'Error', err.message);
      }
    })

  }
}
