import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideHttpClient,
  HTTP_INTERCEPTORS,
  withInterceptorsFromDi
} from '@angular/common/http';
import { provideRouter, Routes, withInMemoryScrolling } from '@angular/router';
import { AppComponent } from './app/app.component';
import { TripListComponent } from './app/features/trips/trip-list/trip-list.component';
import { TripEditComponent } from './app/features/trips/trip-edit/trip-edit.component';
import { LoginComponent } from './app/features/auth/login.component';
import { authGuard } from './app/core/guards/auth.guard';
import { TokenInterceptor } from './app/core/interceptors/token.interceptor';

const routes: Routes = [
  { path: '', redirectTo: 'admin/trips', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin/trips', component: TripListComponent, canActivate: [authGuard] },
  { path: 'admin/trips/add', component: TripEditComponent, data: { mode: 'add' }, canActivate: [authGuard] },
  { path: 'admin/trips/:id/edit', component: TripEditComponent, data: { mode: 'edit' }, canActivate: [authGuard] },
  { path: '**', redirectTo: 'admin/trips' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
}).catch(err => console.error(err));
