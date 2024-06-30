import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointments.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:3000/appointments';

  constructor(private http: HttpClient) { }

  // get all appointments
  public getAppointments(): Observable<Appointment[]>{
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  // get one appointment
  public getAppointment(id: number): Observable<Appointment>{
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }
  
  // create new appointment
  public createAppointment(data: Appointment): Observable<Appointment>{
    return this.http.post<Appointment>(this.apiUrl, data);
  }
  
  // update appointment
  public updateAppointment(data: Appointment): Observable<Appointment>{
    return this.http.put<Appointment>(`${this.apiUrl}/${data.id}`, data);
  }

  // delete appointment
  public deleteAppointment(id: number | undefined): Observable<Appointment>{
    return this.http.delete<Appointment>(`${this.apiUrl}/${id}`);
  }
}
