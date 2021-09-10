import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../../context/GlobalState';

function Transaction({ transaction }) {
  const { deleteTransaction, resetSetErrorHandler } = useContext(GlobalContext);

  const handleDelete = (t) => {
    deleteTransaction(t);
    resetSetErrorHandler();
  };

  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text}
      <span>
        {sign}
        $
        {Math.abs(transaction.amount)}
      </span>
      <button type="submit" onClick={() => handleDelete(transaction)} className="delete-btn">
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
