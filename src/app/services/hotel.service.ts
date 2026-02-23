import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel.model';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private readonly baseUrl = `${environment.apiBaseUrl}/hotels`;

  constructor(private http: HttpClient) {}

  getAllHotels(): Observable<ApiResponse<Hotel[]>> {
  return this.http.get<ApiResponse<Hotel[]>>(
    `${this.baseUrl}/get`
  );
}

  getHotelById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.baseUrl}/${id}`); // Added method to fetch hotel by ID 
  }

  addHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(`${this.baseUrl}/create`, hotel); // here <Hotel> is the expected response type from the backend after adding a hotel
  }

  updateHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.put<Hotel>(`${this.baseUrl}/${hotel.id}`, hotel); // 
  }

  deleteHotel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}