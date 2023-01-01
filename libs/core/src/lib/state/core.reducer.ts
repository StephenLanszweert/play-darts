import { createReducer, on, Action } from '@ngrx/store';
import { Language } from '@playdarts/core/authentication';

import * as CoreActions from './core.actions';

export const CORE_FEATURE_KEY = 'CoreModule';

export interface CoreState {
  language: Language;
  darkMode: boolean;
}

export interface CorePartialState {
  readonly [CORE_FEATURE_KEY]: CoreState;
}

export const initialCoreState: CoreState = {
  language: Language.English,
  darkMode: true
};

const reducer = createReducer(
  initialCoreState,
  on(CoreActions.setApplicationLanguage, (state, { language }) => ({
    ...state,
    language,
  })),
  on(CoreActions.setDarkMode, (state, { darkMode }) => ({
    ...state,
    darkMode,
  }))
);

export function coreReducer(state: CoreState | undefined, action: Action) {
  return reducer(state, action);
}
