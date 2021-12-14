import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import Soda from './components/Soda';
import { apiGetSodas } from './utils/api';

const App = function App() {
  const [sodas, setSodas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const shadow = useRef(null);

  const getSodas = async () => {
    const result = await apiGetSodas();
    setSodas(result);
  };

  const toggleModal = async () => {
    if (showModal) {
      shadow.current.style.background = 'none';
      shadow.current.style.pointerEvents = 'none';
      setShowModal(false);
    } else {
      shadow.current.style.background = 'lightgrey';
      shadow.current.style.pointerEvents = 'all';
      setShowModal(true);
    }
  };

  useEffect(() => {
    getSodas();
  }, []);

  return (
    <div className="App">
      {showModal ? <Modal toggleModal={toggleModal} /> : ''}
      <div className="shadow" ref={shadow} />
      <div>
        <h3>Soda API</h3>
        <div className="soda-container">
          <div className="soda-container-header">
            <span>ID</span>
            <span>Label</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Update</span>
          </div>
          {sodas.length && sodas.map((soda) => (
            <Soda key={soda.id} soda={soda} />
          ))}
          <button className="addLabel" onClick={toggleModal} type="button">+</button>
        </div>
      </div>

    </div>

  );
};

export default App;
