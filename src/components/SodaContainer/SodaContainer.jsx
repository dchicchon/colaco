/* eslint-disable react/jsx-indent */
import React, { useState, useEffect, useRef } from 'react';
import API from '../../utils/api';
import Modal from '../Modal';
import Soda from '../Soda';
import { ADD_SODA } from '../../utils/actions';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { useDispatchContext, useStateContext } from '../../utils/SodaContext';
import styles from './SodaContainer.module.css';
import appStyles from '../../App.module.css';

const FallbackSoda = () => {
  return <div>Unable to render soda</div>;
};

function SodaContainer() {
  const { sodas } = useStateContext();
  const dispatch = useDispatchContext();
  const [sodaToUpdate, setSodaToUpdate] = useState({});
  const [showModal, setShowModal] = useState(false);
  const shadow = useRef(null);

  const getSodas = () => {
    API.getSodas()
      .then((result) => {
        result.forEach((soda) => {
          dispatch({ type: ADD_SODA, payload: soda });
        });
      })
      .catch((error) => {
        console.log({ error });
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
    if (sodas.length === 0) {
      getSodas();
    }
  }, [sodas]);

  return (
    <>
      <div className={appStyles.shadow} ref={shadow} />
      {showModal ? <Modal toggleModal={toggleModal} sodaToUpdate={sodaToUpdate} /> : ''}
      <div style={{ flex: '2', padding: '10px' }}>
        <span>
          <h3 style={{ display: 'inline', marginRight: '5px' }}>
            Soda Machine Inventory
          </h3>
        </span>
        <span data-desc="Add Soda" className={appStyles.tool_tip}>
          <button
            className={appStyles.rounded_button}
            onClick={toggleModal}
            type="button"
          >
            +
          </button>
        </span>
        <div className={appStyles.container}>
          <div className={styles.soda_container_header}>
            <span>Label</span>
            <span>Description</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Update</span>
          </div>
          {sodas.length > 0
            ? sodas.map((soda) => (
                <ErrorBoundary key={soda.key} fallback={<FallbackSoda />}>
                  <Soda soda={soda} toggleUpdateModal={toggleUpdateModal} />
                </ErrorBoundary>
              ))
            : 'No sodas found'}
        </div>
      </div>
    </>
  );
}

export default SodaContainer;
