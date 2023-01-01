import { Language } from '@playdarts/core/authentication';
import { createAction, props } from '@ngrx/store';

export const setApplicationLanguage = createAction(
  '[Core] Set Application Language',
  props<{ language: Language }>()
);

export const setDarkMode = createAction(
  '[Core] Set Dark Mode',
  props<{ darkMode: boolean }>()
);
