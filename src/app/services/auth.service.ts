import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  baseServerUrl = 'https://localhost:7054/api/';

  loginUser(loginInfo: Array<any>) {
    return this.http.post(
      this.baseServerUrl + 'Login',
      {
        EmployeeID: loginInfo[0],
        Pwd: loginInfo[1],
      },
      { responseType: 'text' }
    );
  }

  // getTimesheetEntry(): Observable<any> {
  //   return this.http.get<any>(this.baseServerUrl + 'TimesheetEntry');
  // }

  // postTimesheetEntry(entry: any): Observable<any> {
  //   return this.http.post<any>(this.baseServerUrl + 'TimesheetEntry', entry);
  // }
}
