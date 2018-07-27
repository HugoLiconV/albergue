import { Component, OnInit } from '@angular/core';
import { DonationService, AlertService } from '../../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Donation } from '../../_models';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['../forms.css']
})
export class DonationFormComponent implements OnInit {

  constructor(
    private donationService: DonationService,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) { }
  donation: Donation;
  donationForm: FormGroup;
  id: string;
  ngOnInit() {
    const name = new FormControl('', Validators.required);
    const description = new FormControl('', Validators.required);
    this.donationForm = new FormGroup({ name, description});

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.donationService.getDonationById(this.id).subscribe(_donation => {
        this.donation = _donation;
        this.donationForm.setValue({
          name: this.donation.name,
          description: this.donation.description
        });
      }, error => this.errorHandler(error));
    }
  }

  addDonation(formValues) {
    const isNewDonation = this.id === null;
    if (isNewDonation) {
      this.donationService.addDonations(formValues).subscribe(_ => {
      this.alertService.success('Donación agregada con éxito');
      this.router.navigate(['/admin/dashboard']);
      }, error => this.errorHandler(error));
    } else {
      this.donationService.editDonation(formValues, this.id).subscribe(_ => {
      this.alertService.success('Donación Modificada con éxito');
      this.router.navigate(['/admin/dashboard']);
      }, error => this.errorHandler(error));
    }
  }

  cancel() {
    this.router.navigate(['/admin/dashboard']);
  }

  private errorHandler(error) {
    this.alertService.error(error.message);
  }
}
