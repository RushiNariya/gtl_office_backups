import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { useI18n } from '../../i18n';

function Balance() {
  const { t } = useI18n();

  const { totalExpense, totalIncome } = useContext(GlobalContext);

  const balance = (totalExpense + totalIncome).toFixed(2);

  return (
    <>
      <h4>{t('balance')}</h4>
      <h1>
        $
        {balance}
      </h1>
    </>
  );
}

export default Balance;
