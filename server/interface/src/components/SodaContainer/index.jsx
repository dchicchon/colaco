import React, { useState, useEffect, useRef } from 'react';
import API from '../../utils/api';
import Modal from '../Modal';
import Soda from '../Soda';
import './style.css';

const SodaContainer = function SodaContainer() {
  const [sodas, setSodas] = useState([]);
  const [sodaToUpdate, setSodaToUpdate] = useState({});
  const [showModal, setShowModal] = useState(false);
  const shadow = useRef(null);

  const getSodas = () => {
    API.getSodas().then((result) => {
      setSodas(result.data);
    }).catch((err) => {
      console.log(err);
    });
  };

  const toggleModal = () => {
    if (showModal) {
      shadow.current.style.background = 'none';
      shadow.current.style.pointerEvents = 'none';
      getSodas();
      setSodaToUpdate({});
      setShowModal(false);
    } else {
      shadow.current.style.background = 'rgb(4,3,3)';
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
      <div className="container">
        <span>
          <h3>Soda Machine Inventory</h3>
          <span data-desc="Add Soda" className="tool-tip">
            <button className="rounded-button " onClick={toggleModal} type="button">+</button>
          </span>
        </span>
        <div className="soda-container-header">
          <span>Label</span>
          <span>Description</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Update</span>
        </div>
        {sodas.length > 0 ? sodas.map((soda) => (
          <Soda key={soda.id} soda={soda} toggleUpdateModal={toggleUpdateModal} />
        )) : 'No sodas found'}

      </div>
    </>
  );
};

export default SodaContainer;
