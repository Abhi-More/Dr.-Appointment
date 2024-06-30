import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private titleService: Title)  {}

  public ngOnInit(): void {
    this.titleService.setTitle('Dr. Appointment | Home');
  }
}
