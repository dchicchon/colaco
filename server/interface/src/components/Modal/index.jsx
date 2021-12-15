import React, { useEffect, useState } from 'react';
import { apiAddSoda, apiUpdateSoda } from '../../utils/api';
import './style.css';

// add 'updateBool' as a prop. also take in props for soda that already exists
const Modal = function Modal({ toggleModal, sodaToUpdate }) {
  const [label, setLabel] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    // if we have soda to update, use that for our state
    if (sodaToUpdate.id) {
      console.log('We Have a soda');
      setLabel(sodaToUpdate.label);
      setPrice(sodaToUpdate.price);
      setQuantity(sodaToUpdate.quantity);
    }
  }, []);

  const changeQuantity = (addBool) => {
    if (addBool) {
      setQuantity((prevState) => prevState + 1);
    } else {
      setQuantity((prevState) => (prevState ? prevState - 1 : prevState));
    }
  };

  const submitSoda = async () => {
    // post request to our server
    const result = await apiAddSoda({ label, price, quantity });
    if (!result) setError('Error in form');
    else toggleModal();
  };

  const updateSoda = async () => {
    const result = await apiUpdateSoda({
      id: sodaToUpdate.id, label, price, quantity,
    });
    if (!result) setError('Error in form');
    else toggleModal();
  };

  return (
    <div className="modal">
      {sodaToUpdate.id ? <h4>Update Soda</h4> : <h4>New Soda</h4> }
      <div className="modal-input">
        <label htmlFor="label">
          Label:
          <input type="text" id="label" value={label} onChange={(e) => setLabel(e.target.value)} />
        </label>
      </div>
      <div className="modal-input">
        <label htmlFor="price">
          Price:
          <input id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
      </div>
      <div className="modal-input">
        <label htmlFor="quantity">
          Quantity
          <span>
            <button onClick={() => changeQuantity(false)} type="button">-</button>
            <span>{quantity}</span>
            <button onClick={() => changeQuantity(true)} type="button">+</button>
          </span>
        </label>
      </div>
      <div>
        {error}
      </div>

      <button onClick={toggleModal} type="button">Cancel</button>
      <button onClick={sodaToUpdate.id ? updateSoda : submitSoda} type="button">Submit</button>

    </div>
  );
};

export default Modal;
