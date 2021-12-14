import React from 'react';
import './style.css';

const Soda = function Soda({ soda }) {
  return (
    <div className="soda-item">
      <span>
        {soda.id}
      </span>
      <span>
        {soda.label}
      </span>
      <span>
        {soda.price}
      </span>
      <span>
        {soda.quantity}
      </span>
      <span>&#9776;</span>
    </div>
  );
};

export default Soda;
