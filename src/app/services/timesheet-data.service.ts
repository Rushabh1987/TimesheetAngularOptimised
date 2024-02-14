import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimesheetDataService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  getTimesheetEntry(): Observable<any> {
    return this.http.get<any>(
      this.authService.baseServerUrl + 'TimesheetEntry'
    );
  }

  postTimesheetEntry(entry: any): Observable<any> {
    return this.http.post<any>(
      this.authService.baseServerUrl + 'TimesheetEntry',
      entry
    );
  }
}
