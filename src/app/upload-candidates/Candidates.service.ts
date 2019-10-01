import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  constructor(private http: HttpClient) { }
  baseUrl = "/api/";

  saveCandidates(data, type) {
    return this.http.post(`${this.baseUrl}${type}/save`, data);
  }

  getAllCandidates() {
    return this.http.get(this.baseUrl + "/all");
  }
}
