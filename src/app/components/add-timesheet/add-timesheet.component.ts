import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
//import { LocationModel } from 'src/app/Location.model';
//import { AuthService } from 'src/app/services/auth.service';
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
  filteredLocations?: {
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
    this.form.get('locationId')?.valueChanges.subscribe((res) => {
      //console.log(res);
      this.filterData(res);
    });

    this.locationService.getLocations().subscribe({
      next: (location) => {
        this.locations = location;
        this.filteredLocations = location;
        console.log(location);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  filterData(data: string) {
    if (typeof data === 'string') {
      this.filteredLocations = this.locations.filter((item) => {
        return item.name.toLowerCase().indexOf(data.toLowerCase()) > -1;
      });
    } else {
      this.filteredLocations = this.locations;
    }
  }

  onSubmit() {
    const selectedLocation = this.filteredLocations?.find(
      (loc) => loc.name === this.form.value.locationId
    );
    // If a location is found, assign its ID to the form value
    if (selectedLocation) {
      this.form.patchValue({ locationId: selectedLocation.locationId });
    }
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
