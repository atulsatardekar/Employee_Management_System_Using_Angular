import { Component, EventEmitter, Input, Output } from '@angular/core';
import { last } from 'rxjs';
import { Employees } from '../Models/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  @Input() employee: Employees;
@Output () deleteClicked=new EventEmitter<Employees>()
 @Output() editClicked=new EventEmitter <Employees>()

  constructor() {
    this.employee = new Employees
   
  

}
ngOnInit(){
  console.log(this.employee)
}
deleteEmpClicked(){
  this.deleteClicked.emit(this.employee)
}

editEmpClicked(){
  this.editClicked.emit(this.employee)

}

}