import { Injectable } from '@angular/core';
import { ConsumoResponse } from '../../../types/consumo/Consumo';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {
  private consumoData = new BehaviorSubject<ConsumoResponse | null>(this.getStoredData());
  consumoData$ = this.consumoData.asObservable();

  private getStoredData(): ConsumoResponse | null {
    const storedData = sessionStorage.getItem('consumoData');
    return storedData ? JSON.parse(storedData) : null;
  }

  updateConsumoData(data: ConsumoResponse) {
    sessionStorage.setItem('consumoData', JSON.stringify(data));
    this.consumoData.next(data);
  }

  clearConsumoData() {
    sessionStorage.removeItem('consumoData');
    this.consumoData.next(null);
  }


  hasData(): boolean {
    return this.getStoredData() !== null;
  }
}
