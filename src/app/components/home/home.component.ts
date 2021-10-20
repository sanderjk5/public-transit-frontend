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
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';

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

  algorithms: string[] = ['CSA', 'CSA MEAT', 'Raptor', 'Raptor MEAT']
  
  constructor(private stopService: StopService, private journeysService: JourneysService, private router: Router, private snackBarService: SnackBarService, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('de-DE');
  }

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

  private async checkInput(): Promise<boolean>{
    let isValidInput = true;
    if(this.journeyRequestData.sourceStop == '' || this.journeyRequestData.targetStop == '' || this.journeyRequestData.date == ''
      || this.journeyRequestData.sourceTime == '' || this.journeyRequestData.algorithm == '') {
        isValidInput = false;
      this.snackBarService.openSnackBar("Please fill out all mandatory fields marked with '*'.");
      return isValidInput;
    }

    let isValidSourceStop = await this.stopService.isValidStopName(this.journeyRequestData.sourceStop).toPromise();

    if(!isValidSourceStop) {
      isValidInput = false;
      this.snackBarService.openSnackBar("Invalid source stop.");
      return isValidInput;
    }

    let isValidSourceTargetStop = await this.stopService.isValidStopName(this.journeyRequestData.targetStop).toPromise();

    if(!isValidSourceTargetStop) {
      isValidInput = false;
      this.snackBarService.openSnackBar("Invalid target stop.");
      return isValidInput;
    }

    if(!moment(this.journeyRequestData.date, 'DD.MM.YYYY', true).isValid()){
      isValidInput = false;
      this.snackBarService.openSnackBar("Invalid date.");
      return isValidInput;
    }

    if(!this.journeyRequestData.sourceTime.match('^([0-1]?[0-9]|2[0-4]):([0-5][0-9])?$')) {
      isValidInput = false;
      this.snackBarService.openSnackBar("Invalid time.");
      return isValidInput;
    }

    return isValidInput;
  }

  public async showJourneys(){
    try {
      if(await this.checkInput()) {
        this.journeysService.setJourneyRequestData(this.journeyRequestData);
        this.spinnerActive = true;
        if(this.journeyRequestData.algorithm === 'CSA MEAT' || this.journeyRequestData.algorithm === 'Raptor MEAT'){
          let decisionGraph = await this.journeysService.getMeatResponseData().toPromise();
          this.journeysService.setMeatResponse(decisionGraph);
          this.spinnerActive = false;
          this.router.navigateByUrl('/meat');
        } else {
          let journey = await this.journeysService.getJourneyData().toPromise();
          this.journeysService.setJourney(journey);
          this.spinnerActive = false;
          this.router.navigateByUrl('/journey');
        }
      }
    } catch (error) {
      this.spinnerActive = false;
      this.snackBarService.openSnackBar("Couldn't find a connection for this request.")
    }
  }
}

