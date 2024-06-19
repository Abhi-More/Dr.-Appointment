# Dr. Appointment

# Doctor Appointment System

## Description

The Doctor Appointment System is a web application developed using Angular. This system allows an admin to manage doctor appointments, including functionalities for login, viewing a list of appointments, adding, editing, and deleting appointments. The system ensures that all fields are validated, and appropriate error messages are displayed when validation fails. Additionally, it checks for conflicts when a doctor is booked on a particular date and time.

## Features

- **Admin Login**: Secure login for admin.
- **Appointment Management**: View, add, edit, and delete appointments.
- **Validations**: All fields are mandatory with appropriate validations.
- **Conflict Detection**: Prevents booking a doctor on the same date and time.
- **Responsive Design**: Uses Bootstrap for a responsive and clean UI.
- **Notifications**: Uses ngx-toastr for displaying success and error messages.

## Technologies Used

- Angular
- Bootstrap
- JSON Server (for mock API)
- ngx-toastr (for notifications)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- Angular CLI installed globally.

## Getting Started

Follow these instructions to set up and run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/Abhi-More/Dr.-Appointment.git
cd doctor-appointment-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run JSON Server

```bash
npm json-server --watch db.json
```


### 4. Run the application

```bash
ng serve
```

The application will be available at http://localhost:4200/
