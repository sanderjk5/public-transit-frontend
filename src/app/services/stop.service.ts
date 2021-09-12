import { Injectable } from '@angular/core';
import {Stop} from '../models/stop';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { StopData } from '../models/stop-data';

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
