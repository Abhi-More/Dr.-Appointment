import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from '../../models/appointments.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrl: './add-appointment.component.css'
})
export class AddAppointmentComponent {

  public patientForm!: FormGroup;
  public appointments!: Appointment[];

  constructor(
    private fb: FormBuilder,
    private aptService: AppointmentService,
    private toastr: ToastrService,
    private titleService: Title
  ) {
    this.patientForm = this.fb.group({
      id: [''],
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      disease: ['', [Validators.required]],
      appointmentDate: ['', [Validators.required]],
      comment: ['', [Validators.required]]
    })
  }

  // ngOnInit lifecycle hook
  ngOnInit(): void {
    this.titleService.setTitle("Dr. Appointment | Add");
    this.loadAppointments();
  }

  // loads all appointments
  public loadAppointments(): void {
    this.aptService.getAppointments().subscribe(
      (data) => {
        this.appointments = data;
      },
      (error) => {
        this.toastr.error("Server Error!");
      });
  }

  // create new appointment
  public createAppointment(): void {
    if (this.checkBooked()) {
      this.aptService.createAppointment(this.patientForm.value).subscribe(
        (res) => {
          this.toastr.success("Appointment added ✅");
          this.patientForm.reset();
        },
        (err) => {
          this.toastr.error("Something went wrong!");
        })
    }
    else {
      this.toastr.warning("Doctor is booked on entered date and time. Please try with different date or time!");
      document.getElementById('appointmentDate')?.focus();
    }
  }

  // Check if the doctor is booked on particular date and time.
  private checkBooked(): boolean {
    for (let index = 0; index < this.appointments.length; index++) {
      if (this.patientForm.value.appointmentDate === this.appointments[index].appointmentDate) {
        return false;
      }
    }
    return true;
  }
}
