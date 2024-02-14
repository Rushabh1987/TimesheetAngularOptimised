import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  getLocations() {
    return this.http.get<any>(this.authService.baseServerUrl + 'Location');
  }

  getLocationsById(locationId: number) {
    return this.http.get<any>(
      this.authService.baseServerUrl + `Location/${locationId}`
    );
  }
}
