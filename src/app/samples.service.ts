import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Samples } from './samples';
@Injectable({
  providedIn: 'root'
})
export class SamplesService {
  constructor( private http: HttpClient) { }
  baseUrl: string = 'http://localhost/crudmysql/';

  getSamples() {
    return this.http.get<Samples[]>(this.baseUrl+'view.php');
  } 

  getSingleSample(id:any) {
    return this.http.get<Samples[]>(this.baseUrl+'view.php?id='+id);
  } 
  
  deleteSample(id:any) {
    console.log(id);
    return this.http.delete(this.baseUrl+'delete.php?id='+ id);  
  }  

  createSample(sample:any) {
    return this.http.post(this.baseUrl+'insert.php', sample);  
  }  

  editSample(sample:any) {
      return this.http.put(this.baseUrl+'update.php', sample);  
    }  
}
