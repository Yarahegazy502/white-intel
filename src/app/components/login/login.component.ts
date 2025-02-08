import { FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { RouterModule ,Router} from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
loginForm=this.fb.group({
  email:['daxd404@gmail.com',[Validators.required]],
  password:['0Xdax404#',[Validators.required]]
})

constructor(private fb:FormBuilder,private router:Router){}

login(){
  let form=this.loginForm.value;
  if(form.email=='daxd404@gmail.com'&&form.password=='0Xdax404#'){
    localStorage.setItem('token','mklmknjlknknkl');
    this.router.navigate(['/'])
  }
}

}
