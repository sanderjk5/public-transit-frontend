import { Injectable } from '@angular/core';
import { Journey } from '../models/journey';
import { JourneysRequestData } from '../models/journeys-request-data';
import { Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JourneysService {

  private journeysRequestData: JourneysRequestData|undefined;
  private journeys: Journey[]|undefined;
  private readonly basicUrl: string = "http://localhost:1337/journeys";

  constructor(private http: HttpClient) { }

  setJourneysRequestData(journeysRequestData: JourneysRequestData){
    this.journeysRequestData = journeysRequestData;
  }

  getJourneysRequestData(): JourneysRequestData|undefined{
    return this.journeysRequestData;
  }

  getJourneys(): Observable<Journey[]> {
    return this.http.get<Journey[]>(this.getUrl());
  }

  setJourneys(journeys: Journey[]) {
    this.journeys = journeys;
  }

  getJourney(id: number): Journey|undefined {
    if(this.journeys){
      return this.journeys.find(journey => journey.id == id);
    } else {
      return undefined;
    }
  }

  private getUrl(): string {
    let url: string = this.basicUrl;
    if(this.journeysRequestData){
      url += '?startStop=' + this.journeysRequestData.startStop;
      url += '&targetStop=' + this.journeysRequestData.targetStop;
      url += '&date=' + this.journeysRequestData.date;
      url += '&time=' + this.journeysRequestData.time;
      url += '&mode=' + this.journeysRequestData.mode;
    }
    return url;
  }
}
