import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  private eventSource!: EventSource ;

  constructor() {}

  // Connect to the SSE endpoint
  connect(url: string): Observable<MessageEvent> {
    this.eventSource = new EventSource(url);

    return new Observable((observer) => {
      // Handle incoming messages
      this.eventSource.onmessage = (event) => {
        observer.next(event);
      };

      // Handle errors
      this.eventSource.onerror = (error) => {
        observer.error(error);
      };
    });
  }

  // Disconnect from the SSE endpoint
  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }
}
