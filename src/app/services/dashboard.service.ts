import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { root } from '../shared/config/roots';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url: string = environment.url;

  constructor(private http: HttpClient) { }

  getDashboardDetails(): Observable<any> {
    return this.http.get(`${this.url}/${root.dashboard}`);
  }

  getAccounts(page:number,limit:number,username?:string): Observable<any> {
    let params=`?limit=${limit}&page=${page}`
    if(username!=null){
      params+=`&username=${username}`
    }
    return this.http.get(`${this.url}/${root.accounts}${params}`);
  }

  getCombolist(page:number,limit:number,username?:string): Observable<any> {
    let params=`?limit=${limit}&page=${page}`
    if(username!=null){
      params+=`&username=${username}`
    }
    return this.http.get(`${this.url}/${root.combolist}${params}`);
  }

  getCorporateList(page:number,limit:number,username?:string): Observable<any> {
    let params=`?limit=${limit}&page=${page}`
    if(username!=null){
      params+=`&username=${username}`
    }
    return this.http.get(`${this.url}/${root.corporate}${params}`);
  }
}
