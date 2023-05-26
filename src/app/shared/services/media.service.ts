import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { HttpApi } from '../constants/http-api';
@Injectable({
  providedIn: 'root'
})
export class MediaService {
  constructor(private http: HttpClient) { }



  getAllMedia(page:any): Observable<any> {
 
    return this.http.get(HttpApi.baseUrl+"/ott/media?page="+page+"&&size=10")
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  searchMedia(page:any,name:any,value:any): Observable<any> {
 
    return this.http.get(HttpApi.baseUrl+"/ott/media/search?page="+page+"&&size=10&&name="+name+"&&value="+value)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  createMedia(userRequest: any): Observable<any> {
    
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(HttpApi.baseUrl+"/ott/media", userRequest,{headers})
      .pipe(
        map((response: any) => {
          response.header("Access-Control-Allow-Origin", "*");
          return response;
        })
      );
  }
}
