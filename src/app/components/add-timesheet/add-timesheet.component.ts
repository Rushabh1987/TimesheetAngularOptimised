import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { TimesheetDataService } from 'src/app/services/timesheet-data.service';

@Component({
  selector: 'app-add-timesheet',
  templateUrl: './add-timesheet.component.html',
  styleUrls: ['./add-timesheet.component.css'],
})
export class AddTimesheetComponent implements OnInit {
  form!: FormGroup;
  locations: {
    locationId: number;
    name: string;
  }[] = [];

  //locations = ['Vikhroli', 'Powai', 'Borivali', 'Thane', 'Andheri'];

  constructor(
    private formBuilder: FormBuilder,
    private dataService: TimesheetDataService,
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      date: ['', Validators.required],
      locationId: ['', Validators.required],
      hours: ['0', Validators.required],
      billable: ['', Validators.required],
    });

    //   this.locationService.getLocations().subscribe((locations) => {
    //     this.locations = locations.map((location) => location.name);
    //   });

    this.locationService.getLocations().subscribe({
      next: (location) => {
        this.locations = location;
        console.log(location);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    this.dataService.postTimesheetEntry(this.form.value).subscribe({
      next: (entry) => {
        console.log(entry);
        this.router.navigateByUrl('timesheetHistory');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // onLocationChange() {
  //   const selectedLocationId = this.form.get('locationId')?.value;
  //   this.locationService.getLocationsById(selectedLocationId).subscribe({
  //     next: (entry) => {
  //       console.log(entry);
  //       //this.router.navigateByUrl('timesheetHistory');
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  get Date(): FormControl {
    return this.form.get('date') as FormControl;
  }

  get LocationId(): FormControl {
    return this.form.get('locationId') as FormControl;
  }

  get Hours(): FormControl {
    return this.form.get('hours') as FormControl;
  }
}
