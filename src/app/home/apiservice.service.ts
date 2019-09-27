import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
 

  constructor(private http:HttpClient) { }

//   getNews():Observable<any>{
//    return this.http.get("https://newsapi.org/v2/top-headlines?country=in&apiKey=a191ca1def2d4e5285503054eafca4f4");
//  }
//  getWeather():Observable<any>{
 
//    return this.http.get("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/38986164e72a64e113707240f606c666/20.5937,78.9629?exclude=currently,flagss");
//  }
getRegionData(region: string) {
  let headers = new HttpHeaders().set('x-rapidapi-host', 'restcountries-v1.p.rapidapi.com')
                             .set('x-rapidapi-key', '86076ac0abmsh94aee182e751710p1981efjsn672cddd9192f');
 return this.http.get("https://restcountries-v1.p.rapidapi.com/region/"+region,{headers:headers});
}

}
