import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  constructor(private http: HttpClient) { }
  baseUrl = "/api/candidates";

  saveCandidates(data) {
    return this.http.post(`${this.baseUrl}/save`, data);
  }

  getAllCandidates(){
    return this.http.get(this.baseUrl+"/all");
  }
}
