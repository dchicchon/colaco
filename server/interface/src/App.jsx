import React from 'react';
import TransactionContainer from './components/TransactionContainer';
import SodaContainer from './components/SodaContainer';
import './App.css';
import Header from './components/Header';

const App = function App() {
  return (
    <div className="App">
      <Header />
      <div className="tables">
        <SodaContainer />
        <TransactionContainer />
      </div>
    </div>

  );
};

export default App;
