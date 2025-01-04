import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TransferenciaService } from '../../../core/service/transferData/transferencia.service';
import { ConsumoResponse } from '../../../types/consumo/Consumo';
import { Router } from '@angular/router';
import { ResponseConsumo } from '../../../types/consumo/Consumo.request';
import { ResponseData } from '../../../core/models/response';

@Component({
  selector: 'app-view',
  standalone: false,
  
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  tipoIdentificacion: string = "";
  identificacion: string = ""
  nombreCompleto: string = "";
  score!:number;
  clientesPeorScore!:number;
  tasaMalos:string=""
  consumoData: ConsumoResponse | null = null;  

  constructor(
    private dataSharingService: TransferenciaService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.dataSharingService.hasData()) {
      this.router.navigate(['/home']);
      return;
    }

    this.subscription = this.dataSharingService.consumoData$.subscribe(
      (response: ConsumoResponse | null) => {
        if (response && response.result) {
          this.consumoData = response;
          this.cargarDatos();
          
        }
      }
    );
  }


  cargarDatos() {

    this.cargarIdentificacionTitular()
    this.cargarScoreFinanciero()
    this.cargarfactoresScore()

    
  }

  cargarIdentificacionTitular(){
    this.tipoIdentificacion= (this.consumoData?.result.identificacionTitular?.[0]?.tipoIdentificacionSujetoDescripcion) || '';
    this.identificacion=(this.consumoData?.result.identificacionTitular?.[0]?.identificacionSujeto) || '';
    this.nombreCompleto=(this.consumoData?.result.identificacionTitular?.[0]?.nombreRazonSocial) || '';

  }

  cargarScoreFinanciero(){
    this.score=(this.consumoData?.result.scoreFinanciero?.[0]?.score) || 0;
    this.clientesPeorScore=(this.consumoData?.result.scoreFinanciero?.[0]?.clientesPeorScore) || 0;
    this.tasaMalos=(this.consumoData?.result.scoreFinanciero?.[0]?.tasaMalos) || "";

  }

  get factores() {
    return this.consumoData?.result?.factoresScore || [];
  }

  cargarfactoresScore() {
    const factores = this.factores;
    factores.forEach(factor => {
      console.log(`Factor: ${factor.factor}, Valor: ${factor.valor}, Efecto: ${factor.efecto}`);
    });
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
