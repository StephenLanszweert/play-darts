import { StandardGameActionsComponent } from './standard-game-actions/standard-game-actions.component';
import { StandardGameConfigComponent } from './standard-game-config/standard-game-config.component';
import { StandardGameCountersComponent } from './standard-game-counters/standard-game-counters.component';
import { StandardGameStatsComponent } from './standard-game-stats/standard-game-stats.component';

export const components = [StandardGameConfigComponent, StandardGameCountersComponent, StandardGameStatsComponent, StandardGameActionsComponent];

export * from './standard-game-config/standard-game-config.component';
export * from './standard-game-counters/standard-game-counters.component';
export * from './standard-game-stats/standard-game-stats.component';
export * from './standard-game-actions/standard-game-actions.component';
