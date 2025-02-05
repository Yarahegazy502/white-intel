import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() icon: string = '';
  @Input() color: 'btn-solid-main' | 'btn-outline-main' | 'btn-solid-black' | 'btn-outline-black' | 'btn-solid-white' | 'btn-outline-white' | 'btn-solid-dark-main' = 'btn-solid-main';
  @Input() type: 'lg' | 'sm' = 'lg';
  @Input() pill: boolean = false;
  @Input() showIcon: boolean = false;
  @Input() onlyIcon: boolean = false;
  @Input() isDisabled: boolean = false;
}
