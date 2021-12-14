import React from 'react';
import './style.css';

const Soda = function ({ soda }) {
  return (
    <div className="soda-item">
      <div>
        <span>
          ID:
          {' '}
          {soda.id}
        </span>
      </div>
      <span>
        Label:
        {' '}
        {soda.label}
      </span>
      <span>
        Price:
        {' '}
        {soda.price}
      </span>
      <span>
        Quantity:
        {' '}
        {soda.quantity}
      </span>
    </div>
  );
};

export default Soda;
