import { bootstrapApplication } from '@angular/platform-browser'; // Import bootstrap function
import { appConfig } from './app/app.config'; // Import application configuration
import { AppComponent } from './app/app.component'; // Import the root component

// Bootstrap the AppComponent with the appConfig
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err)); // Log any errors during bootstrap
