import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FinishService,
  StandardGameOutshot,
  StandardGameOutshotType,
} from '@playdarts/api/game';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'playdarts-standard-game-outshot',
  styleUrls: ['./standard-game-outshot.component.scss'],
  templateUrl: './standard-game-outshot.component.html',
})
export class StandardGameOutshotComponent implements OnInit {
  isMobile!: boolean;

  numberOfDartsToFinish$ = new BehaviorSubject<number>(1);

  outshotType = StandardGameOutshotType;

  outshot!: StandardGameOutshot;
  _outshotNumber: number = 0;
  get outshotNumber(): number {
    return this._outshotNumber;
  }
  @Input() set outshotNumber(value: number) {
    if (!value) return;
    this._outshotNumber = value;
    this.outshot = this.finishService.getOutshot(this._outshotNumber);
  }

  @Input() show: boolean = false;
  @Output() dartsUsed: EventEmitter<StandardGameOutshot> =
    new EventEmitter<StandardGameOutshot>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private deviceService: DeviceDetectorService,
    private finishService: FinishService
  ) {}

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
  }
}
