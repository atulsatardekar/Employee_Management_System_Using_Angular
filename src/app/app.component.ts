import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpServiceService } from './employeeServ/emp-service.service';
import { Employees } from './Models/employee.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Emp_Management';
  EmpModalObj: Employees = new Employees();
  employeesTODisplay: Employees[] = [];
  searchItem: string = '';
  employeeForm!: FormGroup;
  employees: Employees[] = [];
  selectedFile:File|null=null
  imageSrc:string|ArrayBuffer|null=null

  @ViewChild('fileInput') fileInput!:ElementRef;

  educationOptions = [
    '10th pass',
    'diploma',
    'graduate',
    'post graduate',
    'Phd'
  ];

  constructor(private fb: FormBuilder, private empServe: EmpServiceService) {}

  ngOnInit() {
    this.employeeForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      birthday: [''],
      gender: [''],
      education: ['default'],
      company: [''],
      jobExperience: [''],
      salary: ['']
    });
    this.createEmployee();
  }

  ngAfterViewInit() {
    // You can perform DOM-related tasks here after the view has been initialized
    console.log(this.fileInput);
    this.fileInput.nativeElement.click()
    
  }

  addEmployees() {
    this.EmpModalObj.firstname = this.employeeForm.value.firstName;
    this.EmpModalObj.lastname = this.employeeForm.value.lastName;
    this.EmpModalObj.birthday = this.employeeForm.value.birthday;
    this.EmpModalObj.gender = this.employeeForm.value.gender;
    this.EmpModalObj.education = this.employeeForm.value.education;
    this.EmpModalObj.company = this.employeeForm.value.company;
    this.EmpModalObj.jobExperience = this.employeeForm.value.jobExperience;
    this.EmpModalObj.salary = this.employeeForm.value.salary;
    this.EmpModalObj.profile = this.fileInput?.nativeElement.files[0]?.name || '';

    this.empServe.postEmployees(this.EmpModalObj).subscribe((res: any) => {
      console.log(res);
      this.employees.unshift(res);
      alert("employee added Successfully");
      this.createEmployee();
      this.resetForm();
    });
  }

  createEmployee(): void {
    this.empServe.getEmployees().subscribe((res: any) => {
      this.employees=[]

      for (let emp of res){
        this.employees.unshift(emp)
      }
     
      this.employeesTODisplay = this.employees;
      console.log(this.employeesTODisplay);
    });
  }

  resetForm() {
    this.employeeForm.reset();
  }

  deleteEmployee(employee: any) {
    this.empServe.deleteEmployee(employee.id).subscribe((res: any) => {
      alert("emp deletd successfully");
      this.createEmployee();
    });
  }

  onEdit(emp: any) {
    this.employeeForm.controls['firstName'].setValue(emp.firstname);
    this.employeeForm.controls['lastName'].setValue(emp.lastname);
    this.employeeForm.controls['birthday'].setValue(emp.birthday);
    this.employeeForm.controls['gender'].setValue(emp.gender);
    this.employeeForm.controls['education'].setValue(emp.education);
    this.employeeForm.controls['company'].setValue(emp.company);
    this.employeeForm.controls['jobExperience'].setValue(emp.jobExperience);
    this.employeeForm.controls['salary'].setValue(emp.salary);
    this.employeeForm.patchValue({ profile: emp.profile });
    this.empServe.deleteEmployee(emp.id).subscribe((res: any) => {
      console.log('existing data deleted and updated data inserted');
    });
  }

  editEmployees(emp: any) {
    this.EmpModalObj.id = emp.id;
    this.EmpModalObj.firstname = this.employeeForm.value.firstName;
    this.EmpModalObj.lastname = this.employeeForm.value.lastName;
    this.EmpModalObj.birthday = this.employeeForm.value.birthday;
    this.EmpModalObj.gender = this.employeeForm.value.gender;
    this.EmpModalObj.education = this.employeeForm.value.education;
    this.EmpModalObj.company = this.employeeForm.value.company;
    this.EmpModalObj.jobExperience = this.employeeForm.value.jobExperience;
    this.EmpModalObj.salary = this.employeeForm.value.salary;
    this.EmpModalObj.profile = this.employeeForm.value.profile;

    this.empServe.editEmployee(this.EmpModalObj).subscribe((res: any) => {
      console.log(res);
      this.createEmployee();
      this.resetForm();
      
    });
  }

  searchEmployees() {
    if (this.searchItem === '') {
      this.createEmployee();
    } else {
      const searchKey = this.searchItem.toLowerCase();
      this.employeesTODisplay = this.employees.filter((employee) => {
        const targetKey = (employee.firstname + ' ' + employee.lastname).toLowerCase();
        return targetKey.includes(searchKey);
      });
    }
  }

  triggerFileInput(){
    const fileInput=document.getElementById('fileInput')
    if(fileInput){
      fileInput.click()
    }
  }
  fileSelect(event:any){
    const selectedFile: File = event.target.files[0];
    const reader=new FileReader();
    reader.onload=()=>{
      this.imageSrc=reader.result as string;
    
    }
    reader.readAsDataURL(selectedFile)
  }

}
