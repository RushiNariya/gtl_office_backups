import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from '../../context/GlobalState';
import Transaction from './Transaction';
import './Transaction.css';

function TransactionList() {
  const { t } = useTranslation();

  const { transactions } = useContext(GlobalContext);

  return (
    <>
      <h3>{t('history')}</h3>
      <ul className="list">
        {transactions && transactions.length !== 0 ? (
          transactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <p className="no-transactions">{t('emptyList')}</p>
        )}
      </ul>
    </>

  );
}

export default TransactionList;
