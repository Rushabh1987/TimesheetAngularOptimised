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

  getTimesheetEntryById(id: any): Observable<any> {
    return this.http.get<any>(
      this.authService.baseServerUrl + 'TimesheetEntry/' + id
    );
  }

  postTimesheetEntry(entry: any): Observable<any> {
    return this.http.post<any>(
      this.authService.baseServerUrl + 'TimesheetEntry',
      entry
    );
  }

  postCsvData(entries: any): Observable<any> {
    return this.http.post<any>(
      this.authService.baseServerUrl + 'TimesheetEntry/write-employee-csv',
      entries
    );
  }

  editTimesheetEntry(inputData: any) {
    return this.http.put<any>(
      this.authService.baseServerUrl + 'TimesheetEntry',
      inputData
    );
  }

  deleteTimesheetEntry(id: number): Observable<any> {
    return this.http.delete(
      this.authService.baseServerUrl + 'TimesheetEntry?id=' + id
    );
  }
}
