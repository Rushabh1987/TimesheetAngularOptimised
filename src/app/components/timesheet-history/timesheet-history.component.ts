import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { TimesheetDataService } from 'src/app/services/timesheet-data.service';

@Component({
  selector: 'app-timesheet-history',
  templateUrl: './timesheet-history.component.html',
  styleUrls: ['./timesheet-history.component.css'],
})
export class TimesheetHistoryComponent implements OnInit {
  entries: {
    id: number;
    date: Date;
    location: string;
    hours: number;
    billable: string;
  }[] = [];

  constructor(
    private dataService: TimesheetDataService,
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataService.getTimesheetEntry().subscribe({
      next: (entry) => {
        //this.entries = entry.sort((a: any, b: any) => b.id - a.id);
        entry.forEach((e: any) => {
          this.locationService
            .getLocationsById(e.locationId)
            .subscribe((loc) => {
              e.location = loc.name;
            });
        });

        this.entries = entry;
        console.log(entry);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  goToAddTimesheet() {
    this.router.navigateByUrl('addTimesheet');
  }

  logout() {
    this.router.navigateByUrl('login');
  }
}
