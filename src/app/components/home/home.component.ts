import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators'
import { StopService } from 'src/app/services/stop.service';
import { JourneysRequestData } from 'src/app/models/journeys-request-data';
import { JourneysService } from 'src/app/services/journeys.service';
import {Router} from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  spinnerActive: boolean = false;
  controlStart = new FormControl();
  optionsStart: string[] = [];
  filteredOptionsStart: Observable<string[]> | undefined;

  controlTarget = new FormControl();
  optionsTarget: string[] = [];
  filteredOptionsTarget: Observable<string[]> | undefined;

  journeyRequestData: JourneysRequestData = {
    sourceStop: '',
    targetStop: '',
    date: '',
    sourceTime: '',
    algorithm: ''
  }

  algorithms: string[] = ['CSA', 'Raptor']
  
  constructor(private stopService: StopService, private journeysService: JourneysService, private router: Router, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
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

  public showJourneys(){
    if(this.journeyRequestData.sourceStop == '' || this.journeyRequestData.targetStop == '' || this.journeyRequestData.date == ''
    || this.journeyRequestData.sourceTime == '' || this.journeyRequestData.algorithm == '') {
        this.snackBarService.openSnackBar("Please fill out all mandatory fields marked with '*'.");
    } else {
      this.journeysService.setJourneyRequestData(this.journeyRequestData);
      this.spinnerActive = true;
      this.journeysService.getJourneyData().subscribe(journey => {
        this.journeysService.setJourney(journey);
        this.spinnerActive = false;
        this.router.navigateByUrl('/journey');
      }, error => {
        this.spinnerActive = false;
        this.snackBarService.openSnackBar("Couldn't find a connection for this request.")
      })
      
    }
  }
}

