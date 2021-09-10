import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string){
    this.snackBar.open(message, undefined, {duration: 3000, panelClass: ['mat-toolbar', 'mat-primary']});
  }
}
