import { Component } from '@angular/core';
import { SseMessagesComponent } from './components/sse-messages/sse-messages.component'; // Import the SSE component

@Component({
  selector: 'app-root', // Selector used in the index.html
  standalone: true, // Mark the component as standalone
  imports: [SseMessagesComponent], // Import the SSE component
  template: `
    <app-sse-messages></app-sse-messages> <!-- Use the SSE component -->
  `,
})
export class AppComponent {}
