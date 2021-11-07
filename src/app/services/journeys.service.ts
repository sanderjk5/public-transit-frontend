import { Injectable } from '@angular/core';
import { Journey } from '../models/journey';
import { JourneysRequestData } from '../models/journeys-request-data';
import { Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { DecisionGraph } from '../models/decision-graph';
import { MeatResponse } from '../models/meatResponse';

@Injectable({
  providedIn: 'root'
})
export class JourneysService {

  private journeyRequestData: JourneysRequestData|undefined;
  private journey: Journey|undefined;
  private meatResponse: MeatResponse|undefined;
  private readonly basicUrl: string = "http://localhost:1337/";

  constructor(private http: HttpClient) { }

  setJourneyRequestData(journeysRequestData: JourneysRequestData){
    this.journeyRequestData = journeysRequestData;
  }

  getJourneyRequestData(): JourneysRequestData|undefined{
    return this.journeyRequestData;
  }

  getJourney() {
    return this.journey;
  }

  getJourneyData(): Observable<Journey> {
    return this.http.get<Journey>(this.getUrl());
  }

  setJourney(journey: Journey) {
    this.journey =  journey;
  }

  getMeatResponseData(): Observable<MeatResponse> {
    return this.http.get<MeatResponse>(this.getUrl());
  }

  getMeatResponse(){
    return this.meatResponse;
  }

  setMeatResponse(meatResponse: MeatResponse) {
    this.meatResponse = meatResponse;
  }

  private getUrl(): string {
    let url: string = this.basicUrl;
    
    if(this.journeyRequestData){
      if(this.journeyRequestData.algorithm === 'Raptor'){
        url += 'raptorAlgorithm/earliestArrivalTime'
      } else if(this.journeyRequestData.algorithm === 'Raptor MEAT' || this.journeyRequestData.algorithm === 'Raptor MEAT TO') {
        url += 'raptorAlgorithm/minimumExpectedArrivalTime'
      } else if(this.journeyRequestData.algorithm === 'CSA') {
        url += 'connectionScanAlgorithm/earliestArrivalTime'
      } else if(this.journeyRequestData.algorithm === 'CSA EAT') {
        url += 'connectionScanAlgorithm/earliestArrivalTimeWithEat'
      } else if(this.journeyRequestData.algorithm === 'CSA MEAT') {
        url += 'connectionScanAlgorithm/minimumExpectedArrivalTime'
      }
      url += '?sourceStop=' + this.journeyRequestData.sourceStop;
      url += '&targetStop=' + this.journeyRequestData.targetStop;
      url += '&date=' + this.journeyRequestData.date;
      url += '&sourceTime=' + this.journeyRequestData.sourceTime + ':00';
      if(this.journeyRequestData.algorithm === 'Raptor MEAT'){
        url += '&meatDifference=' + '0';
      } else if(this.journeyRequestData.algorithm === 'Raptor MEAT TO'){
        url += '&meatDifference=' + '240';
      }
    }
    return url;
  }
}
