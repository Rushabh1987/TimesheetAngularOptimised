import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationModel } from 'src/app/Location.model';
//import { LocationService } from 'src/app/services/location.service';
import { TimesheetDataService } from 'src/app/services/timesheet-data.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';

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

  constructor(
    private dataService: TimesheetDataService,
    //private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataService.getTimesheetEntry().subscribe({
      next: (entry) => {
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
        console.log(entry);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  downloadTimesheet() {
    const csvData = this.entries.map((entry) => ({
      id: entry.id,
      date: entry.date,
      location: entry.location.name, // Accessing the name property of the location object
      hours: entry.hours,
      billable: entry.billable,
    }));

    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Timesheet Data',
      useBom: true,
      noDownload: false,
      headers: ['Id', 'Date', 'Location', 'Hours', 'Billable/Non-Billable'],
    };

    new ngxCsv(csvData, 'Timesheet Report', options);
  }

  goToAddTimesheet() {
    this.router.navigateByUrl('addTimesheet');
  }

  logout() {
    this.router.navigateByUrl('login');
  }
}
