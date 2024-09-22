// import { Injectable } from '@angular/core';
// import { Contact } from '../interfaces/contact';

// @Injectable({
//   providedIn: 'root'
// })
// export class ContactsService {

//   contacts: Contact[] = [
//     { Id: 1, FirstName: 'John', LastName: 'Johnson', PhoneNumber: '111-111-1111', Address: '111 Main St, Minneapolis, MN 55001' },
//   ]

//   constructor() { }

//   getContacts() {
//     return this.contacts;
//   }

//   createContact(newContact: Contact) {

//     // finding highest Id
//     let highestId = 0;
//     this.contacts.forEach(contactObject => {
//       if (contactObject.Id > highestId) {
//         highestId = contactObject.Id;
//       }
//     })

//     // adding new contact to array
//     this.contacts.push(
//       {
//         Id: highestId + 1,
//         FirstName: newContact.FirstName,
//         LastName: newContact.LastName,
//         PhoneNumber: newContact.PhoneNumber,
//         Address: newContact.Address
//       }
//     );

//   }

//   updateContact(updateContact: Contact) {
//     const index = this.contacts.findIndex(contact => contact.Id == updateContact.Id);
//     this.contacts[index].FirstName = updateContact.FirstName;
//     this.contacts[index].LastName = updateContact.LastName;
//     this.contacts[index].PhoneNumber = updateContact.PhoneNumber;
//     this.contacts[index].Address = updateContact.Address;
//   }

//   deleteContact(id: number) {
//     const index = this.contacts.findIndex(contact => contact.Id == id);
//     this.contacts.splice(index, 1);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../interfaces/contact';
import { environmentapi } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private apiUrl = environmentapi.URL;  // Replace with your actual backend URL

  constructor(private http: HttpClient) { }

  // Fetch all contacts
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl + 'Test');
  }

  // Create a new contact
  createContact(newContact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, newContact);
  }

  // Update a contact
  updateContact(updatedContact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${updatedContact.id}`, updatedContact);
  }

  // Delete a contact
  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
