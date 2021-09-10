/* eslint-disable consistent-return */
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from '../../context/GlobalState';
import './AddTransaction.css';

function AddTransaction() {
  const { t } = useTranslation();

  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);

  const { addTransaction, errorHandler, resetSetErrorHandler } = useContext(
    GlobalContext,
  );

  const handleError = () => {
    if (text === '' && Number(amount) <= 0) {
      errorHandler(t('errorRequired'));
    } else if (Number(amount) <= 0) {
      errorHandler(t('errorPositiveAmount'));
    }
  };

  const onDeposit = (e) => {
    e.preventDefault();
    resetSetErrorHandler();
    if (text !== '' && amount > 0) {
      const newTransaction = {
        id: Math.floor(Math.random() * 100000000),
        text,
        amount: +amount,
      };
      addTransaction(newTransaction);
    }
    handleError();
    setText('');
    setAmount(0);
  };

  const onExpense = (e) => {
    e.preventDefault();
    resetSetErrorHandler();
    if (text !== '' && Number(amount) > 0) {
      const newTransaction = {
        id: Math.floor(Math.random() * 100000000),
        text,
        amount: -amount,
      };
      addTransaction(newTransaction);
    }
    handleError();
    setText('');
    setAmount(0);
  };
  return (
    <>
      <h3>{t('AddTransaction')}</h3>
      <form>
        <div className="form-control">
          <label htmlFor="transaction">
            <strong>{t('inputTransaction')}</strong>
          </label>
          <input
            id="transaction"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            <strong>{t('inputAmount')}</strong>
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <div className="button-container">
          <button type="submit" className="btn deposit" onClick={onDeposit}>
            {t('income')}
          </button>
          <button type="submit" className="btn expense" onClick={onExpense}>
            {t('expense')}
          </button>
        </div>
      </form>
    </>
  );
}

export default AddTransaction;
