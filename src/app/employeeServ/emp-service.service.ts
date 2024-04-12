import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employees } from '../Models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmpServiceService { 
  baseUrl= "http://localhost:3000/posts"

  constructor(private http:HttpClient) {
 
   }

   getEmployees(){
 
  
    return this.http.get<Employees[]>(this.baseUrl)
      
   }
   postEmployees(employee:Employees){
    return this.http.post <Employees[]>(this.baseUrl,employee)
   }
   
   deleteEmployee(id:any){
    return this.http.delete (this.baseUrl+'/'+id)

   }
   editEmployee(emp:Employees){
    return this.http.put(this.baseUrl+'/'+ emp.id,emp)
   }

}
