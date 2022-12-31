import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { filter } from 'rxjs';

@Component({
  selector: 'playdarts-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  isMobile = false;
  title = "";
  @Input() darkMode = true;

  constructor(private router: Router, private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    console.log(this.router.url);
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
}
