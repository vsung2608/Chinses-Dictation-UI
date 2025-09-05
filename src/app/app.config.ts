import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import Aura from '@primeng/themes/aura';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {ConfirmationService, MessageService} from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    MessageService,
    ConfirmationService,
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]
};