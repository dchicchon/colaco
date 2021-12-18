import React from 'react';
import SodaMachine from './components/SodaMachine';
import MessageBar from './components/MessageBar';
import { SodaProvider } from './utils/SodaContext';
import './App.css';

const App = function App() {
  return (
    <SodaProvider>
      <div className="App">
        <SodaMachine />
        <MessageBar />
      </div>
    </SodaProvider>
  );
};

export default App;
