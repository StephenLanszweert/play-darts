import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StandardGameOutshot } from '@playdarts/api/game';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'playdarts-standard-game-outshot',
  styleUrls: ['./standard-game-outshot.component.scss'],
  templateUrl: './standard-game-outshot.component.html',
})
export class StandardGameOutshotComponent implements OnInit {
  isMobile!: boolean;

  @Input() show: boolean = false;
  @Input() outshotNumber!: number;
  @Input() darkMode: boolean | null = true;
  @Output() outshotEntered: EventEmitter<StandardGameOutshot> = new EventEmitter<StandardGameOutshot>();

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
  }
}
