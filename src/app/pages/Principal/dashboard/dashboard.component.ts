import { Component } from '@angular/core';
import { ConsumoService } from '../../../core/service/consumo/consumo.service';
import { RequestConsumo } from '../../../types/consumo/Consumo.request';
import { ConsumoResponse } from '../../../types/consumo/Consumo';
import { TransferenciaService } from '../../../core/service/transferData/transferencia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  tipoIdentificacion:string='';
  identificacion:string='';
  loading:boolean=false;
  maxLength: number = 0;
  minLength: number = 0;
  pattern: string = '';
  constructor(private consumoService:ConsumoService,private dataSharingService:TransferenciaService, private router:Router){

  }

  updateValidation() {
    switch (this.tipoIdentificacion) {
      case 'C': // Cédula
        this.maxLength = 10;
        this.minLength = 10;
        this.pattern = '^[0-9]{10}$';
        break;
      case 'R': // RUC
        this.maxLength = 13;
        this.minLength = 13;
        this.pattern = '^[0-9]{13}$';
        break;
      case 'P': // Pasaporte
        this.maxLength = 10;
        this.minLength = 6;
        this.pattern = '^[A-Za-z0-9]{6,10}$';
        break;
      case 'E': // Extranjero
        this.maxLength = 15;
        this.minLength = 3;
        this.pattern = '^[A-Za-z0-9]{3,15}$';
        break;
      case 'F': // Refugiado
        this.maxLength = 10;
        this.minLength = 4;
        this.pattern = '^[0-9]{4,10}$';
        break;
      default:
        this.maxLength = 0;
        this.minLength = 0;
        this.pattern = '';
    }
  
    this.identificacion = '';
  }

  isIdentificacionValida(): boolean {
    if (!this.tipoIdentificacion || !this.identificacion) {
      return false;
    }

    const regexp = new RegExp(this.pattern);
    const cumpleLongitud = this.identificacion.length >= this.minLength && 
                          this.identificacion.length <= this.maxLength;
    const cumplePatron = regexp.test(this.identificacion);

    return cumpleLongitud && cumplePatron;
  }

  getDataConsumo (tipoIdentificacion:string, identificacion:string){
    const request: RequestConsumo={
      tipoIdentificacion:tipoIdentificacion,
      identificacion:identificacion
      
    };
    this.loading = true;
    this.consumoService.getConsumo(request).subscribe({
      next: (response: ConsumoResponse) => {
        this.dataSharingService.updateConsumoData(response);
        this.router.navigate(['/viewData']);

      },error:(error)=>{
        this.loading=false;
        console.error('Error en la consulta:', error);
        this.dataSharingService.clearConsumoData();
        console.error(error.error.result)
      },
      complete: ()=>{
        this.loading=false;
      }
    }
    );
  }



  
}
