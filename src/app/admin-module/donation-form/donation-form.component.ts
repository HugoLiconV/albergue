import { Component, OnInit } from '@angular/core';
import { DonationService, AlertService, DeviceTypeService } from '../../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Donation } from '../../_models';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import 'rxjs/add/observable/forkJoin';
import { MatDialog } from '@angular/material';

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
    private deviceTypeService: DeviceTypeService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  donation: Donation;
  donationForm: FormGroup;
  id: string;
  isLoading = false;
  private isMobile: boolean;
  private dialogWidth: string;

  ngOnInit() {
    this.isMobile = this.deviceTypeService.isMobile();
    this.dialogWidth = this.isMobile ? '80%' : '50%';

    const name = new FormControl('', Validators.required);
    const description = new FormControl('', Validators.required);
    this.donationForm = new FormGroup({ name, description});

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.isLoading = true;
      this.donationService.getDonationById(this.id).subscribe(donation => {
        if (donation) {
          this.donation = donation;
          this.donationForm.setValue({
            name: this.donation.name,
            description: this.donation.description
          });
        }
      });
      this.isLoading = false;
    }
  }

  addDonation(formValues) {
    this.isLoading = true;
    const isNewDonation = this.id === undefined;
    if (isNewDonation) {
      this.donationService.addDonations(formValues).subscribe(_donation => {
        if (_donation) {
          this.alertService.success('Donación agregada con éxito');
          this.isLoading = false;
          this.router.navigate(['/admin/dashboard']);
        }
      });
    } else {
      this.donationService.editDonation(formValues, this.id).subscribe(_donation => {
        if (_donation) {
          this.alertService.success('Donación Modificada con éxito');
          this.isLoading = false;
          this.router.navigate(['/admin/dashboard']);
        }
      });
    }
    this.isLoading = false;
  }

  cancel() {
    this.router.navigate(['/admin/dashboard']);
  }

  deleteDonation() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: this.dialogWidth,
      data: {
        title: 'Eliminar donación',
        action: 'eliminar',
        color: 'warn'
      }
    });

     dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) { // recibe true si se editó
        this.isLoading = true;
        this.donationService.deleteDonation(this.id).subscribe(_ => {
            this.alertService.success('Donación eliminada con éxito');
            this.router.navigate(['/admin/dashboard']);
        }, error => {},
        () => this.isLoading = false);
      }
    });
  }
}
