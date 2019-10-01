import { Injectable } from '@angular/core';
import { CandidatesService } from "./Candidates.service"
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CandidateSanboxService {

  constructor(private CandidatesService: CandidatesService, private _snackBar: MatSnackBar, private router: Router) { }

  Candidates$ = new Subject<any>();
  progress$ = new BehaviorSubject<boolean>(false);
  SaveCandidates(data: any, type: string) {
    this.CandidatesService.saveCandidates(data, type)
      .subscribe(() => {
        this._snackBar.open("Saved Successfully", null, {
          duration: 2000,
        })
        this.router.navigate([type])
      }, console.log)
  }

  getAllCandidates() {
    this.CandidatesService.getAllCandidates()
      .subscribe((data) => {
        this.Candidates$.next(data);

      }, console.log)
  }



  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, null, {
      duration: 2000,
    });
  }

}
