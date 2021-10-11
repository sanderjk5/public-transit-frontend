import { Injectable } from '@angular/core';
import { Journey } from '../models/journey';
import { JourneysRequestData } from '../models/journeys-request-data';
import { Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { DecisionGraph } from '../models/decision-graph';

@Injectable({
  providedIn: 'root'
})
export class JourneysService {

  private journeyRequestData: JourneysRequestData|undefined;
  private journey: Journey|undefined;
  private decisionGraph: DecisionGraph|undefined;
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

  getDecisionGraphData(): Observable<DecisionGraph> {
    return this.http.get<DecisionGraph>(this.getUrl());
  }

  getDecisionGraph(){
    return this.decisionGraph;
  }

  setDecisionGraph(decisionGraph: DecisionGraph) {
    this.decisionGraph = decisionGraph;
  }

  private getUrl(): string {
    let url: string = this.basicUrl;
    
    if(this.journeyRequestData){
      if(this.journeyRequestData.algorithm === 'Raptor'){
        url += 'raptorAlgorithm'
      } else if(this.journeyRequestData.algorithm === 'CSA') {
        url += 'connectionScanAlgorithm/earliestArrival'
      } else {
        url += 'connectionScanAlgorithm/earliestArrivalProfile'
      }
      url += '?sourceStop=' + this.journeyRequestData.sourceStop;
      url += '&targetStop=' + this.journeyRequestData.targetStop;
      url += '&date=' + this.journeyRequestData.date;
      url += '&sourceTime=' + this.journeyRequestData.sourceTime + ':00';
    }
    return url;
  }
}
