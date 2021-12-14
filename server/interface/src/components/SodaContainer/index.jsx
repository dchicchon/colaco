import React, { useState, useEffect, useRef } from 'react';
import { apiGetSodas } from '../../utils/api';
import Modal from '../Modal';
import Soda from '../Soda';
import './style.css';

const SodaContainer = function () {
  const [sodas, setSodas] = useState([]);
  const [sodaToUpdate, setSodaToUpdate] = useState({});
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

  const toggleUpdateModal = async (soda) => {
    setSodaToUpdate(soda);
    toggleModal();
  };

  useEffect(() => {
    getSodas();
  }, []);

  return (
    <>
      <div className="shadow" ref={shadow} />
      {showModal ? <Modal toggleModal={toggleModal} sodaToUpdate={sodaToUpdate} /> : ''}
      <div className="soda-container">
        <h3>Soda Machine Inventory</h3>
        <div className="soda-container-header">
          <span>ID</span>
          <span>Label</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Update</span>
        </div>
        {sodas.length && sodas.map((soda) => (
          <Soda key={soda.id} soda={soda} toggleUpdateModal={toggleUpdateModal} />
        ))}
        <button className="addLabel" onClick={toggleModal} type="button">+</button>
      </div>
    </>
  );
};

export default SodaContainer;
