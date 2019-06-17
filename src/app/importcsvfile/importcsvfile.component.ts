import { Component, OnInit, ViewChild } from '@angular/core';
import { ExcelHeadersAttrbs } from './importcsvfile.model';

@Component({
  selector: 'app-importcsvfile',
  templateUrl: './importcsvfile.component.html',
  styleUrls: ['./importcsvfile.component.scss']
})
export class ImportcsvfileComponent implements OnInit {
  @ViewChild('fileImportInput') fileImportInput: any;
  public csvRecords: any[] = [];

  public order: boolean = true;
  private oldindex: number;

  constructor() { }

  ngOnInit() {

  }
  resetFile() {
    this.fileImportInput.nativeElement.value = "";
    this.csvRecords = []
  }

  fileChangeListener(response: any): void {
    var files = response.srcElement.files;
    if (files[0].name.endsWith(".csv")) {
      var input = response.target;
      var reader = new FileReader();
      reader.readAsText(input.files[0]);
      reader.onload = (data) => {
        let csvData = reader.result;
        console.log('csvData', csvData)
          ;

        let csvRecordsArray = (csvData as string).replace(/"/g, "").split(/\r\n|\n/);
        console.log(csvRecordsArray);
        for (let i = 0; i < csvRecordsArray.length; i++) {
          let rowdata = csvRecordsArray[i].match(/(“[^”]*”)|[^,]+/g);
          console.log('row data', i, rowdata)
          this.csvRecords.push(rowdata);
        }
      };
      reader.onerror = function () {
        alert("Unable to read " + input.files[0]);
      };
    } else {
      alert("Please import valid .csv file.");
      this.fileImportInput.nativeElement.value = "";
      this.csvRecords = [];
    }
  }

  sortTable(index: number) {
    /* if(this.oldindex == index) {
      this.order = !this.order;
    }
    this.oldindex = index; */
    this.order = !this.order;
    let temp = this.csvRecords.slice(1);
    let headerRow = this.csvRecords[0];
    temp.sort((a, b) => {
      // we could've also used strcmpi instead of using the user defined string compare function
      return this.compare(a[2], b[2]);
    });
    this.csvRecords = [];
    this.csvRecords.push(headerRow);
    for (let element of temp) {
      this.csvRecords.push(element);
    }
  }

  // return strcmp(a[index], b[index]);
  compare(first: string, second: string): number {
    let minLength: number = first.length < second.length ? first.length : second.length;
    for (let index = 0; index < minLength; index++) {
      if (first[index] !== second[index]) {
        return this.order ?  second.charCodeAt(index) - first.charCodeAt(index) : first.charCodeAt(index) - second.charCodeAt(index);
      }
    }
    return 0;
  }

}
