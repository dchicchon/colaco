import React, { useEffect, useRef, useState } from 'react';
import API from '../../utils/api';
import './style.css';

// add 'updateBool' as a prop. also take in props for soda that already exists
const Modal = function Modal({ toggleModal, sodaToUpdate }) {
  const [label, setLabel] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState('');
  const interval = useRef(null);

  const changeQuantity = (addBool) => {
    if (addBool) {
      interval.current = setInterval(() => setQuantity((prevState) => prevState + 1), 50);
    } else {
      interval.current = setInterval(() => {
        setQuantity((prevState) => {
          if (prevState) {
            return prevState - 1;
          }
          return prevState;
        });
      }, 50);
    }
  };

  const checkErrors = () => {
    if (!label) setError('Please fill in a soda label');
    if (!price) setError('Please fill in a soda price');
    if (!quantity) setError('Please fill in a soda quantity');
    if (!description) setError('Please fill in a soda description');
    if (!label || !price || !quantity || !description) return true;
    return false;
  };

  const submitSoda = () => {
    // post request to our server
    if (!checkErrors()) {
      API.addSoda({
        label, price, quantity, description,
      })
        .then(() => toggleModal())
        .catch((err) => setError(err));
    }
  };

  const updateSoda = () => {
    if (!checkErrors()) {
      API.updateSoda({
        id: sodaToUpdate.id, label, price, quantity, description,
      })
        .then(() => toggleModal())
        .catch((err) => setError(err));
    }
  };

  const deleteSoda = () => {
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

  useEffect(() => {
    // if we have soda to update, use that for our state
    if (sodaToUpdate.id) {
      setLabel(sodaToUpdate.label);
      setPrice(sodaToUpdate.price);
      setQuantity(sodaToUpdate.quantity);
      setDescription(sodaToUpdate.description);
    }
  }, []);

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
        <label htmlFor="description">Description</label>
        <textarea placeholder="Enter Description here" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="modal-input">
        <label htmlFor="quantity">
          Quantity
        </label>
        <div id="quantity-button-group">
          <button className="rounded-button" onMouseUp={() => clearInterval(interval.current)} onMouseLeave={() => clearInterval(interval.current)} onMouseDown={() => changeQuantity(false)} type="button">-</button>
          <span>{quantity}</span>
          <button className="rounded-button" onMouseUp={() => clearInterval(interval.current)} onMouseLeave={() => clearInterval(interval.current)} onMouseDown={() => changeQuantity(true)} type="button">+</button>
        </div>
      </div>
      <div id="modal-button-group">
        <button className="main-button" onClick={toggleModal} type="button">Cancel</button>
        <button className="main-button" onClick={sodaToUpdate.id ? updateSoda : submitSoda} type="button">Submit</button>
        {sodaToUpdate.id ? <button className="main-button" type="button" onClick={deleteSoda}>Delete</button> : ''}
      </div>
      <p id="error">
        {error}
      </p>

    </div>
  );
};

export default Modal;
