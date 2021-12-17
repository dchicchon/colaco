import React from 'react';
import './style.css';

const Soda = function Soda({ soda, toggleUpdateModal }) {
  return (
    <div className="soda-item" role="document">
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
      <span>
        <span className="tool-tip" data-desc="Update Soda">
          <button className="rounded-button" onClick={() => toggleUpdateModal(soda)} type="button">&#9776;</button>
        </span>
      </span>
    </div>
  );
};

export default Soda;
