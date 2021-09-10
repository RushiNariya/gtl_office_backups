import React from 'react';
import { GlobalProvider } from '../context/GlobalState';
import AddTransaction from './AddTransaction';
import './Style.css';
import Balance from './Balance';
import Header from './Header';
import IncomeExpenses from './Income';
import Toast from './Toast';
import TransactionList from './TransactionList';

function App() {
  return (
    <GlobalProvider>
      <div className="main-container">
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
