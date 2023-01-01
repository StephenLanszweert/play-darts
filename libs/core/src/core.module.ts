import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { coreReducer, CORE_FEATURE_KEY } from './lib/state/core.reducer';
import { hydrationMetaReducer } from './lib/state/rehydrate.reducer';

const metaReducers: MetaReducer[] = [
  hydrationMetaReducer
]

@NgModule({
  imports: [CommonModule,
    StoreModule.forFeature(CORE_FEATURE_KEY, coreReducer, { metaReducers }),
  ],
  providers: [
  ],
})
export class CoreModule { }
