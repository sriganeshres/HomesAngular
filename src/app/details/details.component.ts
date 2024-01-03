import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img [src]="housingLocation?.photo" alt="Exterior Look of {{housingLocation?.name}}" class="listing-photo">
      <section class="description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}} </p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this Loaction</h2>
        <ul>
          <li>Units Available: {{housingLocation?.availableUnits}} </li>
          <li>Does this location has wifi: {{housingLocation?.wifi}} </li>
          <li>Does this location has laundry: {{housingLocation?.laundry}} </li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input formControlName="firstName" id="first-name" type="text" >
          <label for="last-name">Last Name</label>
          <input formControlName="lastName" id="last-name" type="text" >
          <label for="email">Email</label>
          <input formControlName="email" id="email" type="text" >
          <button type="submit" class="primary">Apply Now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute)
  housingService: HousingService = inject(HousingService)
  housingLocation: HousingLocation | undefined
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  })
  constructor() {
    this.housingService.getHousingLoacationById(Number(this.route.snapshot.params["id"])).then(housingLocation => {
      this.housingLocation = housingLocation
    })
  }
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    )
  }
}
