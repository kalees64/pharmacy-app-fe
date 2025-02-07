import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrugService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  getDrugs() {
    const url = `${this.apiUrl}/drugs`;
    return firstValueFrom(this.http.get(url));
  }

  addDrug(data: any) {
    const url = `${this.apiUrl}/drugs`;
    return firstValueFrom(this.http.post(url, data));
  }
}
