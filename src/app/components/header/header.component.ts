import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../core/service/login/login.service';

interface CustomWindow extends Window {
  HSOverlay: {
    open: (element: HTMLElement) => void;
    close: (element: HTMLElement) => void;
  }
}
@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  mensajeModal: string = '¿Está seguro que desea cerrar sesión?';
  isLoggingOut: boolean = false
  showModal: boolean = false;
  constructor(private router: Router, private loginService: LoginService){
    
  }

 

  abrirModalCerrarSesion() {
    console.log('Abriendo modal, showModal antes:', this.showModal);
    this.showModal = true;
    console.log('showModal después:', this.showModal);
  }

  cancelarCerrarSesion() {
    this.showModal = false;
  }

  confirmarCerrarSesion() {
    this.loginService.logout().subscribe({
      next: () => {
        this.showModal = false; 
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
        this.showModal = false;
      }
    });
  }
  
}
