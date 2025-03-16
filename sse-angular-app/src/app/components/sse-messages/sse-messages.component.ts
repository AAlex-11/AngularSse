import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { NgIf } from '@angular/common'; // Import NgIf for conditional rendering
import { SseService } from '../../services/sse.service'; // Import the SSE service
import { Subscription } from 'rxjs'; // Import Subscription for managing observables

@Component({
  selector: 'app-sse-messages', // Selector used in templates
  standalone: true, // Mark the component as standalone
  imports: [NgIf], // Import NgIf for use in the template
  templateUrl: './sse-messages.component.html', // Link to the HTML template
  styleUrls: ['./sse-messages.component.css'], // Link to the CSS file
})
export class SseMessagesComponent implements OnInit, OnDestroy {
  message!: string; // Property to store the received SSE message
  private sseSubscription!: Subscription; // Subscription to manage the SSE connection

  constructor(private sseService: SseService, private ngZone: NgZone) {} // Inject the SSE service

  ngOnInit() {
    console.log('SseMessagesComponent initialized'); // Debug message

    // Connect to the SSE endpoint and subscribe to messages
    this.sseSubscription = this.sseService
      .connect('http://localhost:3000/sse')
      .subscribe({
        next: (event: MessageEvent) => {
          console.log('Raw SSE event:', event)
          const data = JSON.parse(event.data);
          console.log('Parsed SSE data:', data)

          // Update the message property inside NgZone
          this.ngZone.run(() => {
            this.message = `${data.body} <br> Timestamp: ${event.timeStamp}`; // Update the message property with the "body" field
            console.log('Updated message:', this.message); // Debug updated message
          });

        },
        error: (error) => {
          console.error('SSE error:', error);
        },
        complete: () => {
          console.log('SSE connection completed'); // Optional
        },
      });
  }

  ngOnDestroy() {
    // Clean up the subscription when the component is destroyed
    if (this.sseSubscription) {
      this.sseSubscription.unsubscribe();
    }
    this.sseService.disconnect(); // Disconnect from the SSE endpoint
  }
}
