import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  [x: string]: any;
  // private baseUrl: string="http://localhost:6666/getall"

  constructor(private httpClient: HttpClient) { }


  getEmployeeData(): Observable<any> {
    return this.httpClient.get("http://localhost:8089/employee/getall");
  }
  getEmployeeId(id: number): Observable<any> {
    return this.httpClient.get("http://localhost:8089/employee/getbyid/" + id)
  }

  addEmployeeData(body: any): Observable<any> {
    return this.httpClient.post("http://localhost:8089/employee/add", body);
  }
  updateEmployeeData(id: number, body: any): Observable<any> {
    return this.httpClient.put("http://localhost:8089/employee/update/" + id, body)
  }

  removeEmployeeData(id: number): Observable<any> {
    return this.httpClient.delete("http://localhost:8089/employee/deletebyid/" + id)
  }
}


