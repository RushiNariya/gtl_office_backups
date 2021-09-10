import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

function Balance() {
  const { totalExpense, totalIncome } = useContext(GlobalContext);

  const balance = (totalExpense + totalIncome).toFixed(2);

  return (
    <>
      <h4>Your Balance</h4>
      <h1>
        $
        {balance}
      </h1>
    </>
  );
}

export default Balance;
