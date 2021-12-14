import React, { useState } from 'react';
import { apiAddSoda } from '../../utils/api';
import './style.css';

// add 'updateBool' as a prop. also take in props for soda that already exists
const Modal = function Modal({ toggleModal, updateSoda }) {
  const [label, setLabel] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState('');

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

  return (
    <div className="modal">
      {updateSoda ? <h4>New Soda</h4> : <h4>Update Soda</h4> }
      <div>
        <label htmlFor="label">
          Label
          <input type="text" id="label" value={label} onChange={(e) => setLabel(e.target.value)} />
        </label>
      </div>
      <div>
        <label htmlFor="price">
          Price
          <input id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
      </div>
      <div>
        <label htmlFor="quantity">
          Quantity
          <div>
            <button onClick={() => changeQuantity(false)} type="button">-</button>
            <span>{quantity}</span>
            <button onClick={() => changeQuantity(true)} type="button">+</button>
          </div>
        </label>
      </div>

      <div>
        {error}
      </div>

      <button onClick={toggleModal} type="button">Cancel</button>
      <button onClick={submitSoda} type="button">Submit</button>

    </div>
  );
};

export default Modal;
