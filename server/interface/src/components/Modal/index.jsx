import React, { useEffect, useState } from 'react';
import API from '../../utils/API';
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

  const checkErrors = () => {
    if (!label) setError('Please fill in a soda label');
    if (!price) setError('Please fill in a soda price');
    if (!quantity) setError('Please fill in a soda quantity');
    if (!label || !price || !quantity) return true;
    return false;
  };

  const submitSoda = async () => {
    // post request to our server
    if (!checkErrors()) {
      API.addSoda({ label, price, quantity })
        .then(() => toggleModal())
        .catch((err) => setError(err));
    }
  };

  const updateSoda = async () => {
    if (!checkErrors()) {
      API.updateSoda({
        id: sodaToUpdate.id, label, price, quantity,
      })
        .then(() => toggleModal())
        .catch((err) => setError(err));
    }
  };

  const deleteSoda = async () => {
    API.deleteSoda(sodaToUpdate.id).then((result) => {
      console.log(result);
      if (result.data) {
        toggleModal();
      } else {
        setError('There was an issue deleting the item. Please try again later');
      }
    }).catch((err) => {
      setError(err);
    });
  };

  return (
    <div className="modal">
      {sodaToUpdate.id ? <h4>Update Soda</h4> : <h4>New Soda</h4> }
      <div className="modal-input">
        <label htmlFor="label">
          Label
        </label>
        <input placeholder="Enter Label here" type="text" id="label" name="label" value={label} onChange={(e) => setLabel(e.target.value)} />
      </div>
      <div className="modal-input">
        <label htmlFor="price">
          Price
        </label>
        <input id="price" name="price" placeholder="Enter Price here" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div className="modal-input">
        <label htmlFor="quantity">
          Quantity
        </label>
        <div id="quantity-button-group">
          <button className="rounded-button" onClick={() => changeQuantity(false)} type="button">-</button>
          <span>{quantity}</span>
          <button className="rounded-button" onClick={() => changeQuantity(true)} type="button">+</button>
        </div>
      </div>
      <div>
        {error}
      </div>
      <div id="modal-button-group">
        <button className="main-button" onClick={toggleModal} type="button">Cancel</button>
        <button className="main-button" onClick={sodaToUpdate.id ? updateSoda : submitSoda} type="button">Submit</button>
        {sodaToUpdate.id ? <button className="main-button" type="button" onClick={deleteSoda}>Delete</button> : ''}
      </div>

    </div>
  );
};

export default Modal;
