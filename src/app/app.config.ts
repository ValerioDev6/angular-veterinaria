import {
  ApplicationConfig,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import es from '@angular/common/locales/es';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { es_ES, provideNzI18n } from 'ng-zorro-antd/i18n';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { routes } from './app.routes';
import { AuthInterceptor } from './core/auth/interceptors/auth.interceptor';
import { LoggingInterceptor } from './core/auth/interceptors/logg.interceptor';
import { icons } from './icons-provider';

registerLocaleData(es);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideNzIcons(icons),
    provideNzI18n(es_ES),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([LoggingInterceptor, AuthInterceptor])),
  ],
};
