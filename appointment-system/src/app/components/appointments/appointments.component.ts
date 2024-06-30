import { Component, Renderer2 } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/appointments.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {

  public appointments!: Appointment[];
  public loaded: boolean = false;
  public editForm!: FormGroup;

  constructor(
    private aptService: AppointmentService,
    private router: Router,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private toastr: ToastrService,
    private titleService: Title
  ) {
    this.editForm = fb.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      disease: [''],
      appointmentDate: [''],
      comment: ['']
    })
  }

  // ngOnInit() lifecycle hook
  public ngOnInit(): void {
    this.titleService.setTitle('Dr. Appointments | Appointments');
    this.loadAppointments();
  }
  
  // loads all appointments
  public loadAppointments(): void {
    this.aptService.getAppointments().subscribe((data) => {
      this.appointments = data;
      this.loaded = true;
    },
    (error) => {
      this.loaded = true;
      this.toastr.error("Failed to load data!");
    });
  }

  // create new appointment
  public addAppointment(): void {
    this.router.navigate(['/add']);
  }

  //update appointment
  public editAppointment(): void {
    if(this.checkBooked()) {
      this.aptService.updateAppointment(this.editForm.value).subscribe(()=>{
        this.loadAppointments();
        this.hideModal();
        this.toastr.success("Details updated!")
      },
      (err)=>{
        this.toastr.error("Something went wrong!");
      });
    }
    else {
      this.toastr.warning("Doctor is booked on entered date and time. Please enter different date or time");      
      document.getElementById('appointmentDate')?.focus();
    }
  }

  // delete appointment
  public deleteAppointment(id: number | undefined): void {
    if(confirm("Do you want to delete appointment?")) {
      this.aptService.deleteAppointment(id).subscribe(()=>{
        this.toastr.success("Appointmment deleted");
        this.loadAppointments();
      },
      (err)=>{
        this.toastr.error("Error occured!");
      })
    }
  }

  // Check if the doctor is booked on particular date and time.
  public checkBooked(): boolean {
    for (let index = 0; index < this.appointments.length; index++) {
      if(this.editForm.value.appointmentDate === this.appointments[index].appointmentDate && this.editForm.value.id != this.appointments[index].id) {
        return false;
      }
    }
    return true;
  }

  // open modal to edit appointment
  openModal(apt: Appointment): void {
    const modal = document.getElementById('edit-modal');
    this.renderer.addClass(modal, 'show');
    this.renderer.setStyle(modal, 'display', 'block');
    
    this.editForm.controls['id'].setValue(apt.id);
    this.editForm.controls['firstName'].setValue(apt.firstName);
    this.editForm.controls['lastName'].setValue(apt.lastName);
    this.editForm.controls['disease'].setValue(apt.disease);
    this.editForm.controls['appointmentDate'].setValue(apt.appointmentDate);
    this.editForm.controls['comment'].setValue(apt.comment);
  }

  // hide modal
  public hideModal(): void {
    const modal = document.getElementById('edit-modal');
    this.renderer.removeClass(modal, 'show');
    this.renderer.setStyle(modal, 'display', 'none');
  }
}
