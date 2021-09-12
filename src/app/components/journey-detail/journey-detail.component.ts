import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Section } from 'src/app/models/section';
import { JourneysService } from 'src/app/services/journeys.service';

@Component({
  selector: 'app-journey-detail',
  templateUrl: './journey-detail.component.html',
  styleUrls: ['./journey-detail.component.css']
})
export class JourneyDetailComponent {

  displayedColumns: string[] = ['startStop', 'targetStop', 'departure', 'arrival', 'duration', 'transport'];

  sections: Section[] = [];

  constructor(private journeysService: JourneysService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getJourney();
  }

  private getJourney(){
    const journey = this.journeysService.getJourney();
    if(journey){
      this.sections = journey.sections;
    }
  }
}
