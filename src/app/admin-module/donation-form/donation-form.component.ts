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
  private sub: any;
  donation: Donation;
  donationForm: FormGroup;

  ngOnInit() {
    const name = new FormControl('', Validators.required);
    const description = new FormControl('', Validators.required);
    this.donationForm = new FormGroup({ name, description});

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.donationService.getDonationById(id).subscribe(_donation => {
        this.donation = _donation;
        this.donationForm.setValue({
          name: this.donation.name,
          description: this.donation.description
        });
      }, error => {
        this.alertService.error(error.message);
      });
    }
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
