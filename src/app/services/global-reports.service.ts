import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalReportsService {
  constructor(private http:HttpClient) {}

  collectGlobalData(){
     return this.http.get("/api/collectRegionData");
  }

   getGlobalDataByRegion(region:string) {
    return this.http.get("/api/getRegionData?region="+region);
   }
}
