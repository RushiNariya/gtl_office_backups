import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import Transaction from './Transaction';
import './Transaction.css';

function TransactionList() {
  const { transactions } = useContext(GlobalContext);

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        { transactions && transactions.length !== 0
          ? transactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))
          : <p className="no-transactions">No Transactions</p>}
      </ul>
    </>
  );
}

export default TransactionList;
