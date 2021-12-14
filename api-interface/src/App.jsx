import React, { useEffect, useState } from 'react';
import './App.css';
import Soda from './components/Soda';
import { apiGetSodas } from './utils/api';

const App = function () {
  const [sodas, setSodas] = useState([]);

  const getSodas = async () => {
    const result = await apiGetSodas();
    setSodas(result);
  };

  useEffect(() => {
    getSodas();
  }, []);

  return (
    <div className="App">
      <h1>Soda API</h1>
      <div className="soda-container">
        {sodas.length && sodas.map((soda) => (
          <Soda key={soda.id} soda={soda} />
        ))}
      </div>

    </div>
  );
};

export default App;
