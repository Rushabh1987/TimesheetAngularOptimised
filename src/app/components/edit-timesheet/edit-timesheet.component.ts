import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationModel } from 'src/app/Location.model';
import { LoadingService } from 'src/app/services/loading.service';
import { LocationService } from 'src/app/services/location.service';
import { TimesheetDataService } from 'src/app/services/timesheet-data.service';

@Component({
  selector: 'app-edit-timesheet',
  templateUrl: './edit-timesheet.component.html',
  styleUrls: ['./edit-timesheet.component.css'],
})
export class EditTimesheetComponent implements OnInit {
  form!: FormGroup;
  locations: LocationModel[] = [];
  filteredLocations?: LocationModel[] = [];
  timesheetId!: any;
  entry!: {
    id: number;
    date: Date;
    locationId: number;
    location: LocationModel;
    hours: number;
    billable: string;
  };

  constructor(
    private formBuilder: FormBuilder,
    private dataService: TimesheetDataService,
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      date: ['', Validators.required],
      locationId: ['', Validators.required],
      hours: ['0', Validators.required],
      billable: ['', Validators.required],
    });

    this.timesheetId = this.route.snapshot.paramMap.get('id');

    this.dataService
      .getTimesheetEntryById(this.timesheetId)
      .subscribe((res) => {
        console.log(res);
        this.entry = res;
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

    let inputData = {
      id: this.entry.id,
      date: this.entry.date,
      locationId: this.entry.locationId,
      name: this.entry.location.name,
      locateId: this.entry.location.locationId,
      hours: this.entry.hours,
      billable: this.entry.billable,
    };
    this.dataService.editTimesheetEntry(inputData).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigateByUrl('timesheetHistory');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
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
