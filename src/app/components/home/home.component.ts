import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators'
import { StopService } from 'src/app/services/stop.service';
import { JourneysRequestData } from 'src/app/models/journeys-request-data';
import { JourneysService } from 'src/app/services/journeys.service';
import {Router} from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  controlStart = new FormControl();
  optionsStart: string[] = [];
  filteredOptionsStart: Observable<string[]> | undefined;

  controlTarget = new FormControl();
  optionsTarget: string[] = [];
  filteredOptionsTarget: Observable<string[]> | undefined;

  journeyRequestData: JourneysRequestData = {
    sourceStop: '',
    targetStop: '',
    // mode: '',
    date: '',
    sourceTime: ''
  }

  hours: string[] = []
  minutes: string[] = []

  modi: string[] = ['Departure', 'Arrival']
  
  constructor(private stopService: StopService, private journeysService: JourneysService, private router: Router, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.initializeSelections();
    this.filteredOptionsStart = this.controlStart.valueChanges.pipe(
      startWith(''),
      map(value => this._filterStart(value))
    );

    this.filteredOptionsTarget = this.controlTarget.valueChanges.pipe(
      startWith(''),
      map(value => this._filterTarget(value))
    );

    const tmpJourneyRequestData = this.journeysService.getJourneyRequestData();
    if(tmpJourneyRequestData !== undefined){
      this.journeyRequestData = tmpJourneyRequestData;
    }
  }

  private _filterStart(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.stopService.getMatchingStopNames(filterValue, 10).subscribe(stopNames => {
      this.optionsStart = stopNames;
    });
    return this.optionsStart.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterTarget(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.stopService.getMatchingStopNames(filterValue, 10).subscribe(stopNames => {
      this.optionsTarget = stopNames;
    });
    return this.optionsTarget.filter(option => option.toLowerCase().includes(filterValue));
  }

  private initializeSelections() {
    for(let i = 0; i < 10; i++){
      this.minutes.push('0' + i);
      this.hours.push('0' + i);
    }
    for(let i = 10; i < 24; i++){
      this.minutes.push(i.toString());
      this.hours.push(i.toString());
    }
    for(let i = 24; i < 60; i++){
      this.minutes.push(i.toString());
    }
  }

  public showJourneys(){
    if(this.journeyRequestData.sourceStop == '' || this.journeyRequestData.targetStop == '' || this.journeyRequestData.date == '' //|| this.journeyRequestData.mode == ''
    || this.journeyRequestData.sourceTime == '') {
        this.snackBarService.openSnackBar("Please fill out all mandatory fields marked with '*'.");
    } else {
      this.journeysService.setJourneyRequestData(this.journeyRequestData);
      this.journeysService.getJourneyData().subscribe(journey => {
        this.journeysService.setJourney(journey);
        this.router.navigateByUrl('/journey');
      }, error => {
        console.log(error);
        this.snackBarService.openSnackBar("Couldn't find a connection for this request.")
      })
      
    }
  }
}

