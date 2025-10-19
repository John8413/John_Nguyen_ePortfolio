import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Trip } from '../../models/trip.model';

export interface TripListMeta {
  total: number;
  limit: number;
  offset: number;
  sort: string;
  dir: 'asc' | 'desc';
  q?: string | null;
  resort?: string | null;
}

export interface TripListResponse {
  meta: TripListMeta;
  data: Trip[];
}

@Injectable({ providedIn: 'root' })
export class TripService {
  private http = inject(HttpClient);
  private base = `${environment.apiBaseUrl}/trips`;

  // Simple in-memory cache for O(1) lookups by id
  private cache = new Map<string, Trip>();

  //Query-aware list: pagination, search, sorting, resort filter
  getTrips(opts?: {
    q?: string;
    limit?: number;
    offset?: number;
    sort?: string;
    dir?: 'asc' | 'desc';
    resort?: string;
  }): Observable<TripListResponse> {
    let params = new HttpParams();
    if (opts?.q) params = params.set('q', opts.q);
    if (opts?.limit != null) params = params.set('limit', String(opts.limit));
    if (opts?.offset != null) params = params.set('offset', String(opts.offset));
    if (opts?.sort) params = params.set('sort', opts.sort);
    if (opts?.dir) params = params.set('dir', opts.dir);
    if (opts?.resort) params = params.set('resort', opts.resort);

    return this.http.get<TripListResponse>(this.base, { params });
  }

  //Standard reads
  getTrip(id: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.base}/${id}`);
  }

  //Cached getter for details (demonstrates O(1) map lookups)
  async getTripCached(id: string): Promise<Trip> {
    const cached = this.cache.get(id);
    if (cached) return cached;
    const t = await firstValueFrom(this.getTrip(id));
    this.cache.set(t._id as any, t);
    return t;
  }

  //Warm cache from list responses
  warmCache(trips: Trip[]): void {
    for (const t of trips) {
      // @ts-ignore — your Trip model likely has _id: string
      this.cache.set(t._id, t);
    }
  }

  //Writes (auth header added in interceptors or per-call where needed)
  createTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.base, trip);
  }

  updateTrip(id: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.base}/${id}`, trip);
  }

  deleteTrip(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.base}/${id}`);
  }
}
