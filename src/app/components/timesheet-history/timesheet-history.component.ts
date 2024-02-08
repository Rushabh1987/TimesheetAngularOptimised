import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getTimesheetEntry().subscribe({
      next: (entry) => {
        this.entries = entry;
        //console.log(entry);
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
