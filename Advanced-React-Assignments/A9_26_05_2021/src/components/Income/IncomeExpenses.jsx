import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from '../../context/GlobalState';
import './IncomeExpenses.css';

function IncomeExpenses() {
  const { t } = useTranslation();

  const { totalExpense, totalIncome } = useContext(GlobalContext);

  return (
    <div className="inc-exp-container">
      <div>
        <h4>{t('income')}</h4>
        <p className="money plus">
          $
          {totalIncome}
        </p>
      </div>
      <div>
        <h4>{t('expense')}</h4>
        <p className="money minus">
          $
          {totalExpense}
        </p>
      </div>
    </div>
  );
}

export default IncomeExpenses;
