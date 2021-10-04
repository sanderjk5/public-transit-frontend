import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Journey } from 'src/app/models/journey';
import { JourneysService } from 'src/app/services/journeys.service';

@Component({
  selector: 'app-journey-detail',
  templateUrl: './journey-detail.component.html',
  styleUrls: ['./journey-detail.component.css']
})
export class JourneyDetailComponent {

  displayedColumns: string[] = ['startStop', 'targetStop', 'departure', 'arrival', 'duration', 'transport'];

  journey: Journey = {
    departureTime: '',
    arrivalTime: '',
    sourceStop: '',
    targetStop: '',
    departureDate: '',
    arrivalDate: '',
    reliability: '',
    sections: []
  };

  constructor(private journeysService: JourneysService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getJourney();
  }

  private getJourney(){
    let journey = this.journeysService.getJourney();
    if(journey){
      this.journey = journey;
    }
  }
}
