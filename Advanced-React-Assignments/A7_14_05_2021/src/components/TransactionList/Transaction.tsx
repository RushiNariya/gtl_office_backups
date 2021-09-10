import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext, trans } from '../../context/GlobalState';

type props = {
  transaction: trans;
};

function Transaction({ transaction }: props): JSX.Element {
  const { deleteTransaction, resetSetErrorHandler } = useContext(GlobalContext);

  const handleDelete = (t: trans): void => {
    deleteTransaction(t);
    resetSetErrorHandler();
  };

  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text}
      <span>
        {sign}${Math.abs(transaction.amount)}
      </span>
      <button
        type="submit"
        onClick={(): void => handleDelete(transaction)}
        className="delete-btn"
      >
        x
      </button>
    </li>
  );
}

Transaction.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
};

export default Transaction;
