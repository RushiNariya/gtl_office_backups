import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from '../../context/GlobalState';

function Balance() {
  const { t } = useTranslation();

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
