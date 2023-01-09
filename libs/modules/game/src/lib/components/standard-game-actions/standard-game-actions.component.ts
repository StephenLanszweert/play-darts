import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Player, StandardGame } from '@playdarts/api/game';
import { Game } from 'libs/api/game/src/lib/models/game.model';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';

@Component({
  selector: 'playdarts-standard-game-actions',
  styleUrls: ['./standard-game-actions.component.scss'],
  templateUrl: './standard-game-actions.component.html',
})
export class StandardGameActionsComponent implements OnInit {
  isMobile!: boolean;

  @Input() game!: StandardGame | null;
  @Input() darkMode: boolean | null = true;
  @Output() undo: EventEmitter<void> = new EventEmitter<void>();

  actionNumbers!: number[];

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    this.actionNumbers = [26, 1, 2, 3, 60, 41, 4, 5, 6, 85, 45, 7, 8, 9, 100];
  }
}
