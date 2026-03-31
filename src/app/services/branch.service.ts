import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Branch } from '../models/branch.model';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private readonly baseUrl = `${environment.apiBaseUrl}/branches`;

  constructor(private http: HttpClient) {}

  getAllBranches(): Observable<ApiResponse<Branch[]>> {
  return this.http.get<ApiResponse<Branch[]>>(`${this.baseUrl}/get`);
}

  getBranchById(id: number): Observable<Branch> {
    return this.http.get<Branch>(`${this.baseUrl}/${id}`);
  }

  addBranch(branch: Branch): Observable<Branch> {
    return this.http.post<Branch>(`${this.baseUrl}/create`, branch);
  }

  updateBranch(branch: Branch): Observable<Branch> {
    return this.http.put<Branch>(`${this.baseUrl}/${branch.id}`, branch);
  }

  deleteBranch(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}