import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { GlobalContext, trans } from '../../context/GlobalState';
import Transaction from './Transaction';
import './Transaction.css';

function TransactionList(): JSX.Element {
  const { t } = useTranslation();

  const { transactions } = useContext(GlobalContext);

  return (
    <>
      <h3>{t('history')}</h3>
      <ul className="list">
        {transactions && transactions.length !== 0 ? (
          transactions.map(
            (transaction: trans): JSX.Element => (
              <Transaction key={transaction.id} transaction={transaction} />
            )
          )
        ) : (
          <p className="no-transactions">{t('emptyList')}</p>
        )}
      </ul>
    </>
  );
}

export default TransactionList;
