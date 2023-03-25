import { StandardGameActionsComponent } from './standard-game-actions/standard-game-actions.component';
import { StandardGameConfigComponent } from './standard-game-config/standard-game-config.component';
import { StandardGameCountersComponent } from './standard-game-counters/standard-game-counters.component';
import { StandardGameOutshotComponent } from './standard-game-outshot/standard-game-outshot.component';
import { StandardGameStatsComponent } from './standard-game-stats/standard-game-stats.component';

export const components = [StandardGameConfigComponent, StandardGameCountersComponent, StandardGameStatsComponent, StandardGameActionsComponent, StandardGameOutshotComponent];

export * from './standard-game-config/standard-game-config.component';
export * from './standard-game-counters/standard-game-counters.component';
export * from './standard-game-stats/standard-game-stats.component';
export * from './standard-game-actions/standard-game-actions.component';
export * from './standard-game-outshot/standard-game-outshot.component';
