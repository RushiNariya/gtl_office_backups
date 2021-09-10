import React, { useEffect } from 'react';
import { GlobalProvider } from './context/GlobalState';
import AddTransaction from './components/AddTransaction';
import './Style.css';
import Balance from './components/Balance';
import Header from './components/Header';
import IncomeExpenses from './components/Income';
import Toast from './components/Toast';
import TransactionList from './components/TransactionList';
import { useI18n } from './i18n';

function App() {
  const { setLanguage } = useI18n();
  useEffect(() => {
    setLanguage('en');
  }, []);

  const handleSetLanguage = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
  };

  return (
    <GlobalProvider>
      <div className="main-container">
        <div className="select-language select-dropdown">
          <select id="slct" onChange={handleSetLanguage}>
            <option value="en">English</option>
            <option value="fr">French</option>
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
    </GlobalProvider>
  );
}

export default App;
