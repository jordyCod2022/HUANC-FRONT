import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { RequestConsumo, ResponseConsumo } from '../../../types/consumo/Consumo.request';
import { catchError, map, Observable } from 'rxjs';
import { ConsumoResponse } from '../../../types/consumo/Consumo';
@Injectable({
  providedIn: 'root'
})
export class ConsumoService {
 private apiUrl = environment.apiUrl; 


  constructor(private http: HttpClient) { 
    
  }

  getConsumo(request:RequestConsumo): Observable<ConsumoResponse>{
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.http.post<ConsumoResponse>(`${this.apiUrl}/getDatos`, request,{headers})
    .pipe(
      map(response=>{
        if(response.statusCode===200){
          return response;
        }else{
          throw new Error(`Error en la petición: ${response.statusCode}`);
        }
      }),
      catchError(error => {
        console.error('Error en el servicio:', error);
        throw error;
      })
    )

  }

}
