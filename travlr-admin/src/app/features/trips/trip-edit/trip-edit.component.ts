import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TripService } from '../../../core/services/trip.service';
import { Trip } from '../../../models/trip.model';

@Component({
  selector: 'app-trip-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './trip-edit.component.html'
})
export class TripEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tripSvc = inject(TripService);

  form!: FormGroup;
  mode: 'add' | 'edit' = 'add';
  title = signal('Add Trip');
  id: string | null = null;
  saving = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      length: [1, [Validators.required, Validators.min(1)]],
      perPerson: [0, [Validators.required, Validators.min(0)]],
      start: ['', Validators.required],     // yyyy-MM-dd (type=date)
      resort: ['', Validators.required],
      image: [''],
      description: ['']
    });

    this.mode = (this.route.snapshot.data?.['mode'] as 'add' | 'edit') ?? 'add';

    if (this.mode === 'edit') {
      this.title.set('Edit Trip');
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id) {
        this.tripSvc.getTrip(this.id).subscribe({
          next: (t: Trip) => this.form.patchValue({
            name: t.name,
            code: t.code,
            length: t.length,
            perPerson: t.perPerson,
            start: t.start ? new Date(t.start).toISOString().substring(0, 10) : '',
            resort: t.resort,
            image: t.image ?? '',
            description: t.description ?? ''
          }),
          error: (err: any) => this.error.set(err?.error?.message || 'Failed to load trip')
        });
      }
    } else {
      this.title.set('Add Trip');
      this.form.patchValue({ start: new Date().toISOString().substring(0, 10) });
    }
  }

  save(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true); this.error.set(null);

    const payload: Trip = {
      ...this.form.value,
      length: Number(this.form.value.length),
      perPerson: Number(this.form.value.perPerson),
      start: new Date(this.form.value.start) as any 
    };

    const req$ = this.mode === 'add'
      ? this.tripSvc.createTrip(payload)
      : this.tripSvc.updateTrip(this.id!, payload);

    req$.subscribe({
      next: () => { this.saving.set(false); this.router.navigate(['/admin/trips']); },
      error: (err: any) => { this.saving.set(false); this.error.set(err?.error?.message || 'Save failed'); }
    });
  }
}
