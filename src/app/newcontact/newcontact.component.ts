import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactsService } from '../services/contacts.service';
import { Contact } from '../interfaces/contact';

@Component({
  selector: 'app-newcontact',
  templateUrl: './newcontact.component.html',
  styleUrls: ['./newcontact.component.scss']
})
export class NewcontactComponent {

  newContact!: Contact;

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    address: new FormControl('', [Validators.required, Validators.maxLength(200)]),
  });

  constructor(private router: Router, private contactsService: ContactsService) { }

  onSubmit() {

    this.newContact = {
      id: 0,
      name: this.contactForm.controls['name'].value as string,
      email: this.contactForm.controls['email'].value as string,
      phoneNumber: this.contactForm.controls['phoneNumber'].value as string,
      address: this.contactForm.controls['address'].value as string
    };

    this.contactsService.createContact(this.newContact);

    console.log(this.contactsService.getContacts());

    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }
}
