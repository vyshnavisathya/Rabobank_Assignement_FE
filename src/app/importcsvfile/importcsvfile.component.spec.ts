import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportcsvfileComponent } from './importcsvfile.component';

describe('ImportcsvfileComponent', () => {
  let component: ImportcsvfileComponent;
  let fixture: ComponentFixture<ImportcsvfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportcsvfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportcsvfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call sortTable method', () => {
    component.order = true; /// to make the result sort as ascending
    component.csvRecords =[ 
    ['First name', 'Sur name', 'Issue count', 'Date of birth'],
    ['Theo', 'Jansen', "8", '1978-01-02T00:00:00'], 
    ['Fiona', 'de Vries', "7", '1950-11-12T00:00:00'],
    ['Petra', 'Boersma', "1" , '2001-04-20T00:00:00']];
    component.sortTable(1);
    console.log(component.csvRecords);
    expect(component.csvRecords[1][2]).toBe('1');
  });

  it('should call fileChangeListener method if file name is not ended with .csv', () => {
    let event : any = {
      srcElement : 
      {files : [{name : 'issues.xls'}]},
      target : {files : [{name : 'issues.xls'}]}
    }
    component.fileChangeListener(event);
    expect(component.csvRecords.length).toBe(0)
  });

  it('should reset the file on call of resetFile method', () => {
    component.csvRecords = [
    ['First name', 'Sur name', 'Issue count', 'Date of birth'],
    ['Theo', 'Jansen', 5, '1978-01-02T00:00:00'], 
    ['Fiona', 'de Vries', 7, '1950-11-12T00:00:00'],
    ['Petra', 'Boersma', 1, '2001-04-20T00:00:00']];
    component.resetFile();
    expect(component.csvRecords.length).toBe(0);
  });

   it('should call fileChangeListener method if file name ends with .csv', () => {
    let  fileContentsEncodedInHex = []
    let blob = new Blob(fileContentsEncodedInHex); 
    let event : any = {
       srcElement : 
       {files : [{name : 'issues.csv'}]},
       target : {files : [blob]}
    }
    let eventListener = jasmine.createSpy();
    spyOn(window, 'Blob').and.returnValue({
      addEventListener: eventListener
    })
    component.fileChangeListener(event);
    expect(component.csvRecords).toEqual([ ]);
   });
});
