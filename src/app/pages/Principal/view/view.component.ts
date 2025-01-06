import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { TransferenciaService } from '../../../core/service/transferData/transferencia.service';
import { ConsumoResponse } from '../../../types/consumo/Consumo';
import { Router } from '@angular/router';
import { ResponseConsumo } from '../../../types/consumo/Consumo.request';
import { ResponseData } from '../../../core/models/response';
import { PdfService } from '../../../core/service/pdf/pdf.service';
import { EChartsOption, LineSeriesOption } from 'echarts';
import * as echarts from 'echarts'; 


@Component({
  selector: 'app-view',
  standalone: false,
  
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit, OnDestroy {

  
  @ViewChild('scorechart') chartElement!: ElementRef;
  @ViewChild('otherChart') otherChartElement!: ElementRef;
  @ViewChild('tendenciaDeudaChart') tendenciaDeudaChartElement!: ElementRef;


  private subscription!: Subscription;
  tipoIdentificacion: string = "";
  identificacion: string = ""
  nombreCompleto: string = "";
  score!:number;
  clientesPeorScore!:number;
  tasaMalos:string=""
  consumoData: ConsumoResponse | null = null;  
 

  chartOptions: EChartsOption = {};
  otherChartOptions: EChartsOption = {};
  otherTendenciaOptions: EChartsOption = {};

  constructor(
    private dataSharingService: TransferenciaService,
    private router: Router,
    private pdfService: PdfService
    
  
  ) { }

  ngOnInit() {
    if (!this.dataSharingService.hasData()) {
      this.router.navigate(['/home']);
      return;
    }
  
    // Primero inicializamos el gráfico
    this.initChart();
    this.initChartsemaforoMaximoDiasVencido()
    this.initChartTendenciaDeuda()
  
    this.subscription = this.dataSharingService.consumoData$.subscribe(
      (response: ConsumoResponse | null) => {
        if (response && response.result) {
          this.consumoData = response;
          this.cargarDatos();
          // Luego actualizamos los datos
          this.actualizarDatos(this.consumoData);
          this.actualizarDatossemaforoMaximoDiasVencido(this.consumoData)
          this.actualizarTendenciaDeuda(this.consumoData)
        }
      }
    );
  }

  initChart() {
    this.chartOptions = {
      tooltip: {
        trigger: 'axis',
        formatter: function(params: any) {
          const data = params[0];
          return `Fecha: ${data.name}<br/>Score: ${data.value}<br/>`;
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '8%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: [],
        axisLabel: {
          rotate: 45,
          interval: 0
        }
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 1000,
        interval: 200
      },
      series: [{
        name: 'Score Financiero',
        type: 'line',
        data: [],
        symbol: 'circle',
        symbolSize: 15, // Usando el radio que viene en los datos
        lineStyle: {
          width: 3
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}'
        }
      }]
    };
  }

  actualizarDatos(data: ConsumoResponse) {
    if (data?.result?.evolucionScoreFinanciero?.length) {
      const datosFormateados = data.result.evolucionScoreFinanciero.map(item => ({
        value: item.ejeY,
        name: item.fechaCorte,
        itemStyle: {
          color: item.color, 
          borderWidth: 2
        },
        diasVencido: item.diasVencido,
        symbolSize: item.radio 
      }));

      console.log('Datos formateados:', datosFormateados);

      const seriesOption: LineSeriesOption = {
        type: 'line',
        data: datosFormateados,
        name: 'Score Financiero',
        symbol: 'circle',
        lineStyle: {
          color: '#8884d8',
          width: 3
        },
        label: {
          show: true,
          position: 'top'
        }
      };

      this.chartOptions = {
        ...this.chartOptions,
        xAxis: {
          type: 'category',
          data: data.result.evolucionScoreFinanciero.map(item => item.fechaCorte),
          axisLabel: {
            rotate: 45,
            interval: 0
          }
        },
        series: [seriesOption]
      };
    }
  }
  getOtherChartImage(): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const chartDiv = this.otherChartElement.nativeElement.querySelector('div'); // Cambiamos el elemento
        if (chartDiv) {
          // Guardar dimensiones originales
          const originalWidth = chartDiv.style.width;
          const originalHeight = chartDiv.style.height;
  
          // Forzar dimensiones específicas para la captura
          chartDiv.style.width = '800px';
          chartDiv.style.height = '400px';
  
          const echartInstance = echarts.getInstanceByDom(chartDiv);
          if (echartInstance) {
            echartInstance.resize();
  
            // Usar solo las opciones permitidas
            const base64 = echartInstance.getDataURL({
              type: 'png',
              pixelRatio: 2,
              backgroundColor: '#fff'
            });
  
            // Restaurar dimensiones originales
            chartDiv.style.width = originalWidth;
            chartDiv.style.height = originalHeight;
            echartInstance.resize();
  
            resolve(base64);
          } else {
            reject('No se pudo inicializar la instancia del gráfico');
          }
        } else {
          reject('No se encontró el elemento del gráfico');
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  

  initChartsemaforoMaximoDiasVencido() {
    this.otherChartOptions = {
      tooltip: {
        trigger: 'axis',
        formatter: function(params: any) {
          const data = params[0];
          return `Fecha: ${data.name}<br/`;
        }
      },
      grid: {
        left: '5%',  // Reducido para mover el gráfico más a la izquierda
        right: '4%',
        bottom: '8%',
        top: '10%',  // Opcional: ajusta el espacio superior del gráfico
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: [],
        axisLabel: {
          rotate: 45,
          interval: 0
        }
      },
      yAxis: {
        type: 'category',
        data: ['Sin Info', '60 o más', '1 a 59', '0'],
        name: 'Rango de Días Vencido',
        nameLocation: 'middle',
        nameGap: 80,
        axisLabel: {
          formatter: '{value}',
          align: 'right'
        }
      },
      series: [{
        name: 'Semaforo de Días Vencidos',
        type: 'line',
        data: [],
        symbol: 'circle',
        symbolSize: 15,
        lineStyle: {
          width: 3
        },
        label: {
          show: false // Esto desactiva los números "0"
        }
      }]
    };
  }
  
  
  
actualizarDatossemaforoMaximoDiasVencido(data: ConsumoResponse) {
  if (data?.result?.semaforoMaximoDiasVencido?.length) {
    const datosFormateados = data.result.semaforoMaximoDiasVencido.map(item => {
      // Convertir diasVencido a número y determinar categoría
      const diasVencido = Number(item.diasVencido);
      let categoria;
      
      if (isNaN(diasVencido)) {
        categoria = 'Sin Info';
      } else if (diasVencido === 0) {
        categoria = '0';
      } else if (diasVencido >= 1 && diasVencido <= 59) {
        categoria = '1 a 59';
      } else if (diasVencido >= 60) {
        categoria = '60 o más';
      } else {
        categoria = 'Sin Info';
      }

      return {
        value: [item.fechaCorte, categoria],
        name: item.fechaCorte,
        itemStyle: {
          color: item.color,
          borderWidth: 2
        },
        diasVencido: item.diasVencido,
        symbolSize: item.radio
      };
    });

    const seriesOption: LineSeriesOption = {
      type: 'line',
      data: datosFormateados,
      name: 'Semaforo de Días Vencidos',
      symbol: 'circle',
      lineStyle: {
        color: '#8884d8',
        width: 3
      },
      label: {
        show: false,
        position: 'right',
        formatter: function(params: any) {
          return params.data.diasVencido;
        }
      }
    };

    this.otherChartOptions = {
      ...this.otherChartOptions,
      xAxis: {
        type: 'category',
        data: data.result.semaforoMaximoDiasVencido.map(item => item.fechaCorte),
        axisLabel: {
          rotate: 45,
          interval: 0
        }
      },
      series: [seriesOption]
    };
  }
}


initChartTendenciaDeuda() {
  this.otherTendenciaOptions = {
    tooltip: {
      trigger: 'axis',
      formatter: function(params: any) {
        const data = params[0];
        return `Fecha: ${data.name}<br/>`;
      }
    },
    grid: {
      left: '5%',
      right: '4%',
      bottom: '8%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: [],
      axisLabel: {
        rotate: 45,
        interval: 0
      }
    },
    yAxis: {
      type: 'value',
      name: 'Valor Deuda / Vencido',
      nameLocation: 'middle',
      nameGap: 80,
      axisLabel: {
        formatter: '{value}',
        align: 'right'
      }
    },
    series: [{
      name: 'Tendencia de Deuda',
      type: 'line',
      data: [],
      smooth: true, // Habilita la suavización de la línea (curvatura)
      areaStyle: {
        color: 'rgba(173, 216, 230, 0.3)' // Celeste transparente
      },
      lineStyle: {
        width: 3,
        color: 'rgba(173, 216, 230, 1)' // Celeste
      },
      symbol: 'circle',
      symbolSize: 8,
      label: {
        show: false
      }
    }]
  };
}
actualizarTendenciaDeuda(data: ConsumoResponse) {
  if (data?.result?.tendenciaDeuda?.length) {
    const registrosRecientes = data.result.tendenciaDeuda
      .sort((a: any, b: any) => new Date(b.fechaCorte).getTime() - new Date(a.fechaCorte).getTime())
      .slice(0, 24);  

    const datosFormateados = registrosRecientes.map((item: any) => item.totalDeuda);
    console.log(datosFormateados);

    this.otherTendenciaOptions = {
      ...this.otherTendenciaOptions,
      xAxis: {
        type: 'category',
        data: registrosRecientes.map((item: any) => item.fechaCorte),
        axisLabel: {
          rotate: 45,
          interval: 0
        }
      },
      series: [{
        name: 'Tendencia de Deuda',
        type: 'line',
        data: datosFormateados,
        smooth: true, 
        areaStyle: {
          color: 'rgba(173, 216, 230, 0.3)'
        },
        lineStyle: {
          width: 3,
          color: 'rgba(173, 216, 230, 1)' // Celeste
        },
        symbol: 'circle',
        symbolSize: 8,
        label: {
          show: false
        }
      }]
    };
  }
}

getTendenciaDeudaChartImage(): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const chartDiv = this.tendenciaDeudaChartElement.nativeElement.querySelector('div'); // Referencia al div de tendenciaDeuda
      if (chartDiv) {
        // Guardar dimensiones originales
        const originalWidth = chartDiv.style.width;
        const originalHeight = chartDiv.style.height;

        // Forzar dimensiones específicas para la captura
        chartDiv.style.width = '800px';
        chartDiv.style.height = '400px';

        const echartInstance = echarts.getInstanceByDom(chartDiv);
        if (echartInstance) {
          echartInstance.resize();

          // Usar solo las opciones permitidas para la captura
          const base64 = echartInstance.getDataURL({
            type: 'png',
            pixelRatio: 2,
            backgroundColor: '#fff'
          });

          // Restaurar dimensiones originales
          chartDiv.style.width = originalWidth;
          chartDiv.style.height = originalHeight;
          echartInstance.resize();

          resolve(base64);
        } else {
          reject('No se pudo inicializar la instancia del gráfico');
        }
      } else {
        reject('No se encontró el elemento del gráfico');
      }
    } catch (error) {
      reject(error);
    }
  });
}



async descargarPDF() {
  if (this.consumoData) {
    try {
      // Obtener ambas imágenes
      const chartImage = await this.getChartImage();
      const semaforoGraf = await this.getOtherChartImage();
      const deudaGraf= await this.getTendenciaDeudaChartImage();

      // Generar el PDF con las imágenes
      this.pdfService.generatePDF(this.consumoData, chartImage, semaforoGraf,deudaGraf);
    } catch (error) {
      console.error('Error al generar el PDF con gráfico:', error);
    }
  }
}


  
  getChartImage(): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const chartDiv = this.chartElement.nativeElement.querySelector('div');
        if (chartDiv) {
          // Guardar dimensiones originales
          const originalWidth = chartDiv.style.width;
          const originalHeight = chartDiv.style.height;
  
          // Forzar dimensiones específicas para la captura
          chartDiv.style.width = '800px';
          chartDiv.style.height = '400px';
  
          const echartInstance = echarts.getInstanceByDom(chartDiv);
          if (echartInstance) {
            echartInstance.resize();
            
            // Usar solo las opciones permitidas
            const base64 = echartInstance.getDataURL({
              type: 'png',
              pixelRatio: 2,
              backgroundColor: '#fff'
            });
  
            // Restaurar dimensiones originales
            chartDiv.style.width = originalWidth;
            chartDiv.style.height = originalHeight;
            echartInstance.resize();
  
            resolve(base64);
          } else {
            reject('No se pudo inicializar la instancia del gráfico');
          }
        } else {
          reject('No se encontró el elemento del gráfico');
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  cargarDatos() {

    this.cargarIdentificacionTitular()
    this.cargarScoreFinanciero()
    this.cargarfactoresScore()

    
  }

  // persona Natural
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


  //persona juridica






  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
