import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  name = '';
  email = '';
  message = '';
  sent = false;
  error = false;

  constructor(private contactService: ContactService) {}

  send() {
    this.sent = false;
    this.error = false;

    this.contactService.sendMessage({
      name: this.name,
      email: this.email,
      message: this.message
    }).subscribe({
      next: () => {
        this.sent = true;
        this.name = '';
        this.email = '';
        this.message = '';
        setTimeout(() => (this.sent = false), 5000); // הסתרה אוטומטית
      },
      error: () => {
        this.error = true;
      }
    });
  }
}
