import React from 'react';
import { useI18n } from '../../i18n';

function Header() {
  const { t } = useI18n();

  return <h2 className="title">{t('header')}</h2>;
}

export default Header;
