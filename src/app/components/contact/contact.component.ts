import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AvoidCoronaService } from './../../services/avoid-corona.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {

  formGroup: FormGroup;

  // Create array
  avoidCoronaArray = [] as any;

  // Get the service and set it to avoidCoronaService
  constructor(private avoidCoronaService: AvoidCoronaService) {

    /* Setting up the formgroup */
    this.formGroup = new FormGroup({
      // Tell FormControl that emailField is required and need to have the value of a email adress
      emailField: new FormControl('', [

        // Ensure that the control for the email input field is not empty
        Validators.required,

        // Ensure that the control’s value matches the specified regex pattern
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),

        // Ensure that the email input is not more then 320 characters
        Validators.maxLength(320)
        ])
    });
  }

  ngOnInit(): void {
    // Get the avoid-corona data from service, and subscribe
    this.avoidCoronaService.getCoronaInfo().subscribe((data) => {
      this.avoidCoronaArray = data;
    });
  }

  // Function for the error message
  getErrorMessage(control: any): string {
    // Don't say anything if control doesn't exist, or is valid
    if (!control || control.valid) {
      return '';
    }

    // Different error messages
    if (control.hasError('required')) {
      return 'Cannot be empty';
    }
    if (control.hasError('pattern')) {
      return 'Must be a valid email';
    }

    if (control.hasError('maxlength')) {
      const limit = control.getError('maxlength').requiredLength;
      return `Email must be no more then ${limit} characters`;
    }

    // Default general error message
    return 'Invalid input';
  }

  onSubmit(): void {
    // Reset the formGroup on submit
    this.formGroup.reset();
  }

  // Function to get email field
  get emailField(): any {
    return this.formGroup.get('emailField');
  }



}
