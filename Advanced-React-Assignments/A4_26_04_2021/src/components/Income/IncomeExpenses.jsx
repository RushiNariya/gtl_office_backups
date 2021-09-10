import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import './IncomeExpenses.css';

function IncomeExpenses() {
  const { totalExpense, totalIncome } = useContext(GlobalContext);

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">
          $
          {totalIncome}
        </p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">
          $
          {totalExpense}
        </p>
      </div>
    </div>
  );
}

export default IncomeExpenses;
