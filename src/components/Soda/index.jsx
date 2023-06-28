/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import appStyles from '../../App.module.css';
import './style.css';

const Soda = function Soda({ soda, toggleUpdateModal }) {
  return (
    <div className="soda-item" role="document">
      <span>{soda.label}</span>
      <span>{soda.description}</span>
      <span>${soda.price.toFixed(2)}</span>
      <span>{soda.quantity}</span>
      <span>
        <span className={appStyles.tool_tip} data-desc="Update Soda">
          <button
            className={appStyles.rounded_button}
            onClick={() => toggleUpdateModal(soda)}
            type="button"
          >
            &#9776;
          </button>
        </span>
      </span>
    </div>
  );
};

export default Soda;
