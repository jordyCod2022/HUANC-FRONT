import { Component } from '@angular/core';
import { LoginService } from '../../../core/service/login/login.service';
import { Router } from '@angular/router';
import { RequestLogin } from '../../../types/login.response';
import { delay } from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: false,
  
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  email: string = "";
  password: string = "";
  loading: boolean = false;  

  constructor(
    private authservice: LoginService,
    private router: Router
  ) { }

  onLogin(email: string, password: string) {
    const credentials: RequestLogin = {
      email: email,
      password: password
    };


    this.loading = true;

  
    this.authservice.login(credentials)
      .pipe(
    
        delay(1000)
      )
      .subscribe({
        next: (response) => {
          console.log('Login exitoso');
          console.log(response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.loading = false;
          console.error('Error en login:', error);
        },
       
        complete: () => {
          this.loading = false;
        }
      });
  }

  onLogout() {
    this.authservice.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      }
    });
  }
}
