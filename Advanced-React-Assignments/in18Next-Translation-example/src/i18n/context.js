// @flow

import { createContext } from 'react';

export const initialState = {
  langCode: 'en',
  t: (key) => key,
  setLanguage: () => {},
  languages: [],
  translations: {},
};

export const I18nContext = createContext(initialState);
