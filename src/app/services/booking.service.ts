import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly baseUrl = `${environment.apiBaseUrl}/bookings`;

  constructor(private http: HttpClient) {}

  bookRoom(booking: Booking): Observable<Booking[]> {
    return this.http.post<Booking[]>(`${this.baseUrl}/create`, booking);
  }

getBookingsByUser(userId: number): Observable<ApiResponse<Booking[]>> {
  return this.http.get<ApiResponse<Booking[]>>(
    `${this.baseUrl}/user/${userId}`
  );
}
}