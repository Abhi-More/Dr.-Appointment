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

  patientForm!: FormGroup;
  appointments!: Appointment[];

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

  ngOnInit(): void {
    this.titleService.setTitle("Dr. Appointment | Add")
  }

  // create new appointment
  createAppointment(): void {
    if(this.checkBooked()) {
      this.aptService.createAppointment(this.patientForm.value).subscribe((res) => {
        this.toastr.clear();
        this.toastr.success("Appointment added ✅");
        this.patientForm.reset();
      },(err)=>{
        this.toastr.clear();
        this.toastr.error("Something went wrong!");
      })
    }
    else {
      this.toastr.clear();
      this.toastr.warning("Doctor is booked on entered date and time. Please enter different date or time!");
      document.getElementById('appointmentDate')?.focus();
    }
  }

  // Check if the doctor is booked on particular date and time.
  checkBooked(): boolean {
    this.aptService.getAppointments().subscribe((data)=>{
      this.appointments = data;
    });

    for (let index = 0; index < this.appointments.length; index++) {
      if(this.patientForm.value.appointmentDate === this.appointments[index].appointmentDate) {
        return false;
      }
    }
    return true;
  }
}
