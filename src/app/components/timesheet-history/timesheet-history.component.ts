import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationModel } from 'src/app/Location.model';
import { TimesheetDataService } from 'src/app/services/timesheet-data.service';
//import { ngxCsv } from 'ngx-csv/ngx-csv';
import { LoadingService } from 'src/app/services/loading.service';
import { DialogService } from 'src/app/services/dialog.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-timesheet-history',
  templateUrl: './timesheet-history.component.html',
  styleUrls: ['./timesheet-history.component.css'],
})
export class TimesheetHistoryComponent implements OnInit {
  entries: {
    id: number;
    date: Date;
    location: LocationModel;
    hours: number;
    billable: string;
  }[] = [];
  p: number = 1;

  constructor(
    private dataService: TimesheetDataService,
    //private locationService: LocationService,
    private router: Router,
    public loadingService: LoadingService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.dataService.getTimesheetEntry().subscribe({
      next: (entry) => {
        this.loadingService.setLoadingState(true);
        //this.entries = entry.sort((a: any, b: any) => b.id - a.id);
        // entry.forEach((e: any) => {
        //   this.locationService
        //     .getLocationsById(e.locationId)
        //     .subscribe((loc) => {
        //       console.log(loc);
        //       e.location = loc.name;
        //     });
        // });

        this.entries = entry;
        this.loadingService.setLoadingState(false);
        console.log(entry);
      },
      error: (err) => {
        console.log(err);
        this.loadingService.setLoadingState(false);
      },
    });
  }

  editTimesheet(entryId: number) {
    this.router.navigateByUrl(`editTimesheet/${entryId}`);
  }

  deleteTimesheet(id: any) {
    // this.dataService.deleteTimesheetEntry(id).subscribe({
    //   next: (entry) => {
    //     this.entries = this.entries.filter((e) => e.id !== id);
    //     console.log('Entry deleted successfully');
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
    this.dialogService
      .openConfirmDialog()
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
        if (res) {
          this.dataService.deleteTimesheetEntry(id).subscribe({
            next: (entry) => {
              this.entries = this.entries.filter((e) => e.id !== id);
              console.log('Entry deleted successfully');
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
      });
  }

  // downloadCsvData() {
  //   this.dataService.postCsvData(this.entries).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  downloadCsvData() {
    this.dataService.getCsvData().subscribe((csvData: any) => {
      console.log(csvData);
      this.downloadFile(csvData, 'data.csv');
    });
  }

  private downloadFile(data: string, filename: string) {
    const blob = new Blob([data], { type: 'text/csv' });
    saveAs(blob, filename);
  }

  // downloadTimesheet() {
  //   const csvData = this.entries.map((entry) => ({
  //     id: entry.id,
  //     date: entry.date,
  //     location: entry.location.name,
  //     hours: entry.hours,
  //     billable: entry.billable,
  //   }));

  //   var options = {
  //     fieldSeparator: ',',
  //     quoteStrings: '"',
  //     decimalseparator: '.',
  //     showLabels: true,
  //     showTitle: true,
  //     title: 'Timesheet Data',
  //     useBom: true,
  //     noDownload: false,
  //     headers: ['Id', 'Date', 'Location', 'Hours', 'Billable/Non-Billable'],
  //   };

  //   new ngxCsv(csvData, 'Timesheet Report', options);
  // }

  goToAddTimesheet() {
    this.router.navigateByUrl('addTimesheet');
  }

  logout() {
    this.router.navigateByUrl('login');
  }
}
