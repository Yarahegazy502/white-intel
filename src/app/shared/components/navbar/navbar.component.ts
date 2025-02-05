import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { SearchComponent } from './search/search.component';
import { Router } from '@angular/router';
import { PublicService } from '../../../services/public.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonComponent, SearchComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  showSearch: boolean = false;
  toggleMenu: boolean = false;
  url: string = '';
  constructor(
    private readonly publicService: PublicService,
    private router: Router
  ) { }


  ngDoCheck(): void {
    if (this.router.url == '/') {
      this.showSearch = true;
    } else {
      this.showSearch = false;
    }

    this.url = this.router.url.split('/')[1];
  }

  toggle(): void {
    this.toggleMenu = !this.toggleMenu;
    this.publicService.toggleAsideMenu.next(this.toggleMenu)
  }
}
