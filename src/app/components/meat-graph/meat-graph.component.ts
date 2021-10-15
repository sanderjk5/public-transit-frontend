import { Component, OnInit } from '@angular/core';
import { DecisionGraph } from 'src/app/models/decision-graph';
import { Link } from 'src/app/models/link';
import { MeatResponse } from 'src/app/models/meatResponse';
import { JourneysService } from 'src/app/services/journeys.service';

@Component({
  selector: 'app-meat-graph',
  templateUrl: './meat-graph.component.html',
  styleUrls: ['./meat-graph.component.css']
})
export class MeatGraphComponent implements OnInit {

  meatResponse: MeatResponse = {
    sourceStop: '',
    targetStop: '',
    departureTime: '',
    departureDate: '',
    meatTime: '',
    meatDate: '',
    eatTime: '',
    esatTime: '',
    expandedDecisionGraph: {
      nodes: [],
      links: [],
      clusters: [],
    },
    compactDecisionGraph: {
      nodes: [],
      links: [],
      clusters: [],
    }
  }
  
  
  constructor(private journeysService: JourneysService) { }

  ngOnInit(): void {
    this.getMeatResponse();
  }

  private getMeatResponse(){
    let meatResponse = this.journeysService.getMeatResponse();
    if(meatResponse){
      this.meatResponse = meatResponse;
      console.log(this.meatResponse)
    }
  }

}
