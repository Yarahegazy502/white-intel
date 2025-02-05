import { Component, DoCheck } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AsideMenuComponent } from '../../shared/components/aside-menu/aside-menu.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, AsideMenuComponent, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements DoCheck {
  shouldRender: boolean = false;
  toggleMenu: boolean = false;

  constructor(
    private readonly publicService: PublicService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.publicService.toggleAsideMenu.subscribe((res: any) => {
      this.toggleMenu = res;
    })
  }

  ngDoCheck(): void {
    if (this.router.url == '/') {
      this.shouldRender = false;
    } else {
      this.shouldRender = true;
    }
  }
}
