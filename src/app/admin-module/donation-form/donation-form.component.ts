import { Component, OnInit } from '@angular/core';
import { DonationService, AlertService } from '../../_services';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['../forms.css']
})
export class DonationFormComponent implements OnInit {

  constructor(
    private donationService: DonationService,
    private router: Router,
    private alertService: AlertService
  ) { }

  donationForm: FormGroup;
  ngOnInit() {
    const name = new FormControl('', Validators.required);
    const description = new FormControl('', Validators.required);
    this.donationForm = new FormGroup({
      name,
      description
    });
  }

  addDonation(formValues) {
    this.donationService.addDonations(formValues).subscribe(_donation => {
      if (_donation) {
        this.alertService.success('Donación agregada con éxito');
        this.router.navigate(['/admin/dashboard']);
      }
    }, error => {
      this.alertService.error(error.message);
    });
  }

  cancel() {
    this.router.navigate(['/admin/dashboard']);
  }
}
