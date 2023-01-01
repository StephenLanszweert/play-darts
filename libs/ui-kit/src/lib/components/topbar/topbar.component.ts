import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setDarkMode } from 'libs/core/src/lib/state/core.actions';
import { getApplicationLanguage, getDarkMode } from 'libs/core/src/lib/state/core.selectors';
import { DeviceDetectorService } from 'ngx-device-detector';
import { OverlayPanel } from 'primeng/overlaypanel';
import { filter, Observable, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'playdarts-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  isMobile = false;
  title = "";
  destroy$ = new Subject<void>();
  darkMode!: boolean;

  @ViewChild("settings") settings!: OverlayPanel;

  constructor(private store: Store, private router: Router, private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.store.select(getDarkMode).pipe(
      tap(res => console.log(res)),
      takeUntil(this.destroy$)
    ).subscribe(res => this.darkMode = res);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe((event) => {
        const navEvent = event as NavigationEnd;
        this.updateTitle(navEvent.urlAfterRedirects)
      });
    this.isMobile = this.deviceService.isMobile();
  }

  updateTitle(url: string) {
    const parts = url.split("/");
    switch (parts[1]) {
      case "dashboard":
        this.title = "Dashboard";
        break;
      case "game":
        this.title = "Game";
        break;
      default:
        this.title = "";
    }
  }

  toggleDarkMode(e: any) {
    this.store.dispatch(setDarkMode({ darkMode: e.checked }));
    this.settings.hide();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
