// travlr-admin/src/app/features/trips/trip-list/trip-list.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { debounceTime, distinctUntilChanged, startWith, switchMap, tap } from 'rxjs/operators';
import { combineLatest, Observable, Subject } from 'rxjs';
import { TripService, TripListResponse } from '../../../core/services/trip.service';
import { Trip } from '../../../models/trip.model';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe],
  templateUrl: './trip-list.component.html',
})
export class TripListComponent implements OnInit, OnDestroy {
  // UI controls
  search = new FormControl<string>('', { nonNullable: true });
  resort = new FormControl<string | null>(null);

  // paging state
  pageSize = 12;
  page = 0;
  total = 0;

  // sorting (you can expose controls if you want)
  sort: 'createdAt' | 'start' = 'start';
  dir: 'asc' | 'desc' = 'asc';

  // state
  loading = false;
  trips: Trip[] = [];

  // trigger fetch when page changes
  private pageChange$ = new Subject<void>();
  private destroy$ = new Subject<void>();

  constructor(private tripsSvc: TripService) { }

  ngOnInit(): void {
    const search$ = this.search.valueChanges.pipe(
      startWith(this.search.value),
      debounceTime(300),
      distinctUntilChanged()
    );

    const resort$ = this.resort.valueChanges.pipe(startWith(this.resort.value));

    combineLatest([search$, resort$, this.pageChange$.pipe(startWith(null))])
      .pipe(
        tap(() => (this.loading = true)),
        switchMap(([q, resort]) =>
          this.tripsSvc.getTrips({
            q: (q ?? '').trim(),
            resort: resort ?? undefined,
            limit: this.pageSize,
            offset: this.page * this.pageSize,
            sort: this.sort,
            dir: this.dir
          })
        ),
        tap((resp: TripListResponse) => {
          this.total = resp.meta.total;
          this.trips = resp.data;
          this.tripsSvc.warmCache(resp.data);
          this.loading = false;
        })
      )
      .subscribe();
  }

  nextPage(): void {
    if ((this.page + 1) * this.pageSize < this.total) {
      this.page++;
      this.pageChange$.next();
    }
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.pageChange$.next();
    }
  }

  // optional: reset to first page when user types/filters
  onFilterChanged(): void {
    this.page = 0;
    this.pageChange$.next();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
