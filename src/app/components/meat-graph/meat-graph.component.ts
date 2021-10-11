import { Component, OnInit } from '@angular/core';
import { DecisionGraph } from 'src/app/models/decision-graph';
import { Link } from 'src/app/models/link';
import { JourneysService } from 'src/app/services/journeys.service';

@Component({
  selector: 'app-meat-graph',
  templateUrl: './meat-graph.component.html',
  styleUrls: ['./meat-graph.component.css']
})
export class MeatGraphComponent implements OnInit {

  decisionGraph: DecisionGraph = {
    nodes: [],
    links: [],
    clusters: [],
  }
  
  
  constructor(private journeysService: JourneysService) { }

  ngOnInit(): void {
    this.getDecisionGraph();
  }

  private getDecisionGraph(){
    let decisionGraph = this.journeysService.getDecisionGraph();
    if(decisionGraph){
      this.decisionGraph = decisionGraph;
      console.log(this.decisionGraph)
    }
  }

}
