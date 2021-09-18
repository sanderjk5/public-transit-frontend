import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StopService {
  private readonly basicUrl: string = "http://localhost:1337/stops";

  constructor(private http: HttpClient) { }

  getMatchingStopNames(name: string, limit: number): Observable<string[]> {
    return this.http.get<string[]>(this.basicUrl + '/matchingNames?name=' + String(name) + '&limit=' + String(limit));
  }

}
