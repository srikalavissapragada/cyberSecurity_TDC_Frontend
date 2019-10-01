import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import * as XLSX from 'xlsx';
import { CandidateSanboxService } from "./CandidateSanbox.service";
@Component({
  selector: 'app-upload-candidates',
  templateUrl: './upload-candidates.component.html',
  styleUrls: ['./upload-candidates.component.scss']
})
export class UploadCandidatesComponent implements OnInit {

  constructor(private CandidateSanboxService: CandidateSanboxService, private ngZone: NgZone, private changeDetectroRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.CandidateSanboxService.getAllCandidates();
  }

  types = [
    {
      title: "Bench List", value: "benchlist"
    },
    {
      title: "Subcons", value: "subcons"
    }
  ]
  selectedType = "''";
  ReadFileData(input: HTMLInputElement) {
    if (input.files.length) {
      this.CandidateSanboxService.progress$.next(true);
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */

        const data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
        const savingData = this.prepareObject(data)
        this.CandidateSanboxService.SaveCandidates(savingData, this.selectedType);

        this.CandidateSanboxService.progress$.next(false);

      };
      reader.readAsBinaryString(input.files[0]);
    }
  }

  prepareObject(data: Array<any>, columns = data[0]) {
    const savingColumns = columns.map(x => x.split(" ").join("_"));
    let result = data;
    if (this.selectedType == "benchlist")
      result = data.filter(emp => {
        return emp[36].toLowerCase() == "available"
      })
        .filter(emp => {

          if (emp[5]) {
            let cat = emp[5].toLowerCase();
            for (let i of ["infh", "cldh", "inft", "cldt"]) {
              if (cat.indexOf(i) !== -1) {
                return true;
              }
            }
          }
          if (emp[38]) {
            let cat = emp[38].toLowerCase();
            for (let i of ["infrastructure ", 'cloud', 'siem', 'network', 'soc', 'information']) {
              if (cat.indexOf(i) !== -1) {
                return true;
              }
            }
          }
        })

    const savingData = result.map(emp => {
      const obj = {};
      (<Array<string>>savingColumns).forEach((x, index) => {
        obj[x] = emp[index];
      })
      return obj
    })
    return savingData;
  }

}
