import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CORE_FEATURE_KEY, CoreState } from './core.reducer';

export const getCoreState = createFeatureSelector<CoreState>(CORE_FEATURE_KEY);

export const getApplicationLanguage = createSelector(
  getCoreState,
  (state: CoreState) => state.language
);

export const getDarkMode = createSelector(
  getCoreState,
  (state: CoreState) => state.darkMode
);
