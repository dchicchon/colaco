import React, { useEffect, useRef, useState } from 'react';
import API from '../../utils/api';
import { useDispatchContext } from '../../utils/SodaContext';
import { ADD_SODA, CLEAR_SODAS } from '../../utils/actions';
import styles from './Modal.module.css';
import appStyles from '../../App.module.css';

function Modal({ toggleModal, sodaToUpdate }) {
  const dispatch = useDispatchContext();
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
    if (!parseFloat(price)) setError('Please enter a valid price');
    if (!quantity) setError('Please fill in a soda quantity');
    if (!description) setError('Please fill in a soda description');
    if (!label || !price || !quantity || !description || !parseFloat(price)) return true;
    return false;
  };

  const submitSoda = () => {
    // post request to our server
    if (!checkErrors()) {
      API.addSoda({
        label,
        price: parseInt(price, 10),
        quantity,
        description,
      })
        .then(() => toggleModal())
        .catch((err) => setError(err));
    }
  };

  const updateSoda = () => {
    if (!checkErrors()) {
      API.updateSoda({
        key: sodaToUpdate.key,
        label,
        price,
        quantity,
        description,
      })
        .then(() => {
          dispatch({ type: CLEAR_SODAS });
          toggleModal();
        })
        .catch((err) => setError(err));
    }
  };

  const deleteSoda = () => {
    API.deleteSoda(sodaToUpdate.key)
      .then((deleteResult) => {
        if (deleteResult) {
          dispatch({ type: CLEAR_SODAS });
          toggleModal();
        } else {
          setError('There was an issue deleting the item. Please try again later');
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  useEffect(() => {
    // if we have soda to update, use that for our state
    if (sodaToUpdate.key) {
      setLabel(sodaToUpdate.label);
      setPrice(sodaToUpdate.price);
      setQuantity(sodaToUpdate.quantity);
      setDescription(sodaToUpdate.description);
    }
  }, []);

  return (
    <div className={styles.modal}>
      {sodaToUpdate.key ? <h4>Update Soda</h4> : <h4>New Soda</h4>}
      <div className={styles.modal_input}>
        <label htmlFor="label">Label</label>
        <input
          placeholder="Enter Label here"
          type="text"
          id="label"
          name="label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>
      <div className={styles.modal_input}>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          placeholder="Enter Price here"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className={styles.modal_input}>
        <label htmlFor="description">Description</label>
        <textarea
          placeholder="Enter Description here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className={styles.modal_input}>
        <label htmlFor="quantity">Quantity</label>
        <div id={styles.quantity_button_group}>
          <button
            className={appStyles.rounded_button}
            onMouseUp={() => clearInterval(interval.current)}
            onMouseLeave={() => clearInterval(interval.current)}
            onMouseDown={() => changeQuantity(false)}
            type="button"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className={appStyles.rounded_button}
            onMouseUp={() => clearInterval(interval.current)}
            onMouseLeave={() => clearInterval(interval.current)}
            onMouseDown={() => changeQuantity(true)}
            type="button"
          >
            +
          </button>
        </div>
      </div>
      <div id={styles.modal_button_group}>
        <button className={appStyles.main_button} onClick={toggleModal} type="button">
          Cancel
        </button>
        <button
          className={appStyles.main_button}
          onClick={sodaToUpdate.key ? updateSoda : submitSoda}
          type="button"
        >
          {sodaToUpdate.key ? 'Update' : 'Submit'}
        </button>
        {sodaToUpdate.key ? (
          <button className={appStyles.main_button} type="button" onClick={deleteSoda}>
            Delete
          </button>
        ) : (
          ''
        )}
      </div>
      <p id="error">{error}</p>
    </div>
  );
}

export default Modal;
