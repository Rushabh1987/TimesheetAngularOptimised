import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-timesheet',
  templateUrl: './add-timesheet.component.html',
  styleUrls: ['./add-timesheet.component.css'],
})
export class AddTimesheetComponent implements OnInit {
  form!: FormGroup;

  locations = ['Vikhroli', 'Powai', 'Borivali', 'Thane', 'Andheri'];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      date: ['', Validators.required],
      location: ['', Validators.required],
      hours: ['0', Validators.required],
      billable: ['Non-billable', Validators.required],
    });
  }

  onSubmit() {
    this.authService.postTimesheetEntry(this.form.value).subscribe({
      next: (entry) => {
        //console.log(entry);
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

  get Location(): FormControl {
    return this.form.get('location') as FormControl;
  }

  get Hours(): FormControl {
    return this.form.get('hours') as FormControl;
  }
}
