import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationInfo } from '@playdarts/core';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private restRelativeUrl = 'api/application';

  applicationInfo$: Observable<ApplicationInfo>;

  constructor(private apiHttpService: HttpClient) {
    this.applicationInfo$ = this.getApplicationInfo().pipe(shareReplay());
  }

  private getApplicationInfo(): Observable<ApplicationInfo> {
    return this.apiHttpService.get<ApplicationInfo>(
      `${this.restRelativeUrl}/info`
    );
  }
}
