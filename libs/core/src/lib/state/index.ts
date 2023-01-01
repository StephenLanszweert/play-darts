import { MetaReducer } from "@ngrx/store";
import { hydrationMetaReducer } from "./rehydrate.reducer";

export const metaReducers: MetaReducer[] = [
  hydrationMetaReducer
]

export * from './core.actions';
export * from './core.selectors';
