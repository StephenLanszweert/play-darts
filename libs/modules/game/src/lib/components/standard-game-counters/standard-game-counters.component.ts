import { Component, Input, OnInit } from '@angular/core';
import { FinishService, StandardGame, StandardGameOutshot } from '@playdarts/api/game';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'playdarts-standard-game-counters',
  styleUrls: ['./standard-game-counters.component.scss'],
  templateUrl: './standard-game-counters.component.html',
})
export class StandardGameCountersComponent implements OnInit {
  isMobile!: boolean;

  @Input() game!: StandardGame | null;
  @Input() darkMode: boolean | null = true;

  constructor(private deviceService: DeviceDetectorService, private finishService: FinishService) { }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
  }

  getOutshot(remainingScore: number): string {
    return this.finishService.getOutshot(remainingScore)?.outshot ?? '';
  }
}
