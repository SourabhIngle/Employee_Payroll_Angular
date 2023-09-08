import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  employeeList: Employee[] = []
  employeeCount: any = this.employeeList.length;

  constructor(private httpService: HttpService,
    private router: Router,) { }

  ngOnInit(): void {
    this.httpService.getEmployeeData().subscribe(response => {
      this.employeeList = response;
      this.employeeCount = this.employeeList.length;
      console.log(response);
    });
  }

  
// This is clicke event
  remove(id: number): void {
    this.httpService.removeEmployeeData(id).subscribe(reponse => {
      console.log(reponse);
      this.ngOnInit();
    });
  }
}