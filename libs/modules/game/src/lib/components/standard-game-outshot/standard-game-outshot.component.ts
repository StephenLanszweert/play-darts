import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FinishService, StandardGameOutshot } from '@playdarts/api/game';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject } from 'rxjs';

@Component({
  selector: 'playdarts-standard-game-outshot',
  styleUrls: ['./standard-game-outshot.component.scss'],
  templateUrl: './standard-game-outshot.component.html',
})
export class StandardGameOutshotComponent implements OnInit {
  isMobile!: boolean;

  outShot!: StandardGameOutshot;
  _outshotNumber: number = 0;
  get outshotNumber(): number {
      return this._outshotNumber;
  }
  @Input() set outshotNumber(value: number) {
    if (!value) return;
    this._outshotNumber = value;
    this.outShot = this.finishService.getOutshot(this._outshotNumber);
  }

  @Input() show: boolean = false;
  @Input() darkMode: boolean | null = true;
  @Output() outshotEntered: EventEmitter<StandardGameOutshot> = new EventEmitter<StandardGameOutshot>();

  constructor(private deviceService: DeviceDetectorService, private finishService: FinishService) { }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
  }
}
