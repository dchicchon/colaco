import React from 'react';
import TransactionContainer from './components/TransactionContainer';
import SodaContainer from './components/SodaContainer';
import './App.css';

const App = function App() {
  return (
    <div className="App">
      <h2>Soda API</h2>
      <div className="tables">
        <SodaContainer />
        <TransactionContainer />
      </div>
    </div>

  );
};

export default App;
