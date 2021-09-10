import React, { useState, useContext } from 'react';
import AddTransaction from './AddTransaction';
import './Style.css';
import Balance from './Balance';
import Header from './Header';
import IncomeExpenses from './Income';
import Toast from './Toast';
import TransactionList from './TransactionList';
import i18n from '../locales/i18n';
import { GlobalContext } from '../context/GlobalState';

function App() {
  const [language, setLanguage] = useState(i18n.language);
  const { resetSetErrorHandler } = useContext(GlobalContext);

  const handleSetLanguage = async (event) => {
    await resetSetErrorHandler();
    const newlang = event.target.value;
    setLanguage(newlang);
    i18n.changeLanguage(newlang);
  };

  return (
    <div className="main-container">
      <div className="select-language">
        <select defaultValue={language} onChange={handleSetLanguage}>
          <option value="en">English</option>
          <option value="fre">French</option>
          <option value="nl">Dutch</option>
        </select>
      </div>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
        <Toast />
      </div>
    </div>
  );
}

export default App;
