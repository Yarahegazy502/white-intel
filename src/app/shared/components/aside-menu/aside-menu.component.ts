import { Component } from '@angular/core';
import { menu } from './menu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-aside-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.scss'
})
export class AsideMenuComponent {
  menu = menu;

}
