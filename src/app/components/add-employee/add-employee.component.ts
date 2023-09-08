import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {


  public employee: Employee = new Employee();
  employeeFormGroup: FormGroup;// employeeFormGroup = null;

  empId: number = this.activateRoute.snapshot.params['id'];

  departments: Array<any> = [
    { id: 1, name: "Full-Stack", value: "Full-Stack", checked: false },
    { id: 2, name: "Sales", value: "Sales", checked: false },
    { id: 3, name: "HR", value: "HR", checked: false },
    { id: 4, name: "BackEnd", value: "BackEnd", checked: false },
    { id: 5, name: "FrontEnd", value: "FrontEnd", checked: false }
  ]
  /*  FormArray = This the collection of form elements and it's exists in formgroup. 
      FormBuilder = This is the feature of Angular libaray and it's help to build and manage the form.
      FormControl = This is individual control of element form, like input filed, and stored the specific value.
      FormGroup = This is the group of from element and it's manageing the multiple form-control together.
  */
  constructor(private formBuilder: FormBuilder,
    private httpservice: HttpService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.employeeFormGroup = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z\\s]{2,}$")]),
      lastName: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z\\s]{2,}$")]),
      email: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      profilePic: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      department: this.formBuilder.array([], [Validators.required]),
      notes: new FormControl('', [Validators.required]),
    })
  }


  ngOnInit(): void {
    if (this.empId != undefined) {
      console.log(this.employee);
      this.httpservice.getEmployeeId(this.empId).subscribe(response => {
        console.log(response.data.gender)
        this.employeeFormGroup.get('firstName')?.setValue(response.data.firstName);
        this.employeeFormGroup.get('lastName')?.setValue(response.data.lastName);
        this.employeeFormGroup.get('profilePic')?.setValue(response.data.profilePic);
        this.employeeFormGroup.get('gender')?.setValue(response.data.gender);
        this.employeeFormGroup.get('salary')?.setValue(response.data.salary);
        this.employeeFormGroup.get('startDate')?.setValue(response.data.startDate);
        this.employeeFormGroup.get('phoneNumber')?.setValue(response.data.phoneNumber);
        this.employeeFormGroup.get('notes')?.setValue(response.data.notes);
        this.employeeFormGroup.get('address')?.setValue(response.data.address);
        this.employeeFormGroup.get('email')?.setValue(response.data.email);
        const department = this.employeeFormGroup.get('department') as FormArray;
        response.data.department.forEach((DEPT: any) => {
          for (let i = 0; i < this.departments.length; i++) {
            if (this.departments[i].name === DEPT) {
              this.departments[i].checked = true;
              department.push(new FormControl(this.departments[i].value))
            }
          }
          console.log(this.employeeFormGroup);
        });
      });
    }
  }


  onCheckboxChange(event: MatCheckboxChange) {
    const department: FormArray = this.employeeFormGroup.get('department') as FormArray;

    if (event.checked) {
      department.push(new FormControl(event.source.value));
    } else {
      const index = department.controls.findIndex(x => x.value === event.source.value);
      department.removeAt(index);
    }
  }

  // To read Salary Value from slider
  salary: any = 400000
  updateSetting(event: any) {
    this.salary = event.value;
  }

  onSubmit() {
    if (this.employeeFormGroup.valid) {
      if (this.empId != undefined) {
        this.httpservice.updateEmployeeData(this.empId, this.employeeFormGroup.value).subscribe(response => {
          console.log(response.data);
        })
        this.router.navigateByUrl("/home");
      } else {
        console.log(this.employeeFormGroup.value)
        this.httpservice.addEmployeeData(this.employeeFormGroup.value).subscribe(response => {
          console.log(response.data);
          // this.router.navigate(['home'])
          this.router.navigateByUrl("/home");
        })
      }
    }
  }
}


