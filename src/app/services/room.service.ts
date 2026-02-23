import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private readonly baseUrl = `${environment.apiBaseUrl}/rooms`;

  constructor(private http: HttpClient) {}

  getAllRooms(): Observable<ApiResponse<Room[]>> {
  return this.http.get<ApiResponse<Room[]>>(
    `${this.baseUrl}/get`
  );
}

  addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.baseUrl}/create`, room);
  }

  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateRoom(room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.baseUrl}/${room.id}`, room);
  }

 getRoomById(id: number): Observable<ApiResponse<Room>> {
  return this.http.get<ApiResponse<Room>>(`${this.baseUrl}/${id}`);
}
}