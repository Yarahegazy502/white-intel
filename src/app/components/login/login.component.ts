import { AlertsService } from './../../services/alerts.service';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Title } from '@angular/platform-browser'; // For SEO purposes
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder, private alertsService: AlertsService, private router: Router, private title: Title// For SEO
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Login');
  }

  login() {
    let form = this.loginForm.value;
    if (this.loginForm.valid) {
      if (form.email == 'daxd404@gmail.com' && form.password == '0Xdax404#') {
        localStorage.setItem('token', 'mklmknjlknknkl');
        this.router.navigate(['/'])
      } else {
        this.alertsService.openToast('error', 'Error', 'Email or Password not correct')
      }
    } else {
      this.alertsService.openToast('error', 'Error', 'Email and Password is Required')
    }
  }

}
