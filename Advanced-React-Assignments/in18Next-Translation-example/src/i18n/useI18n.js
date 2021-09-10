// @flow

import { useContext } from 'react';
import { I18nContext } from './context';

export const useI18n = () => {
  const { t, langCode, setLanguage } = useContext(I18nContext);

  return {
    t,
    langCode,
    setLanguage,
  };
};
