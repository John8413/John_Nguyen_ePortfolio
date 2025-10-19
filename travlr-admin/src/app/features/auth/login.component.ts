import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="container py-5" style="max-width:480px">
    <h2 class="mb-4">Admin Login</h2>
    <div *ngIf="error" class="alert alert-danger">{{error}}</div>
    <form (ngSubmit)="submit()">
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input [(ngModel)]="email" name="email" type="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input [(ngModel)]="password" name="password" type="password" class="form-control" required />
      </div>
      <button class="btn btn-primary w-100">Log in</button>
    </form>
  </div>
  `
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  error: string | null = null;

  submit() {
    this.error = null;
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => { this.auth.setToken(res.token); this.router.navigate(['/admin/trips']); },
      error: (err) => this.error = err?.error?.message || 'Login failed'
    });
  }
}
