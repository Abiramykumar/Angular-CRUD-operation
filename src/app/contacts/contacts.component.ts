import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { Contact } from '../interfaces/contact';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../dialogs/update-dialog/update-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contactsDataArray: Contact[] = []; // Array of contact

  dataSource = new MatTableDataSource<Contact>();

  columnsToDisplay = ['Name', 'Email', 'PhoneNumber', 'Address', 'Update', 'Delete'];

  constructor(private contactsService: ContactsService, private dialog: MatDialog) {}

  ngOnInit() {
    this.contactsService.getContacts().subscribe(
      (data: Contact[]) => {
        this.contactsDataArray = data;
        this.dataSource.data = this.contactsDataArray; // Set data for MatTableDataSource
      },
      (error: any) => {
        console.error('Error fetching contacts', error);
      }
    );
  }

  onUpdate(contact: Contact) {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      height: '500px',
      width: '500px',
      data: contact,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update contact logic here
        this.contactsService.updateContact(result).subscribe(() => {
          this.refreshContacts();
        });
      }
    });
  }

  onDelete(contact: Contact) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      height: '500px',
      width: '500px',
      data: contact,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contactsService.deleteContact(contact.id).subscribe(() => {
          this.refreshContacts();
        });
      }
    });
  }

  refreshContacts() {
    this.contactsService.getContacts().subscribe(
      (data: Contact[]) => {
        this.contactsDataArray = data;
        this.dataSource.data = this.contactsDataArray; // Update MatTableDataSource
      },
      (error: any) => {
        console.error('Error fetching contacts', error);
      }
    );
  }
}
