import React from 'react';
import './style.css';

const Transaction = function ({ transaction }) {
  return (
    <div className="transaction-item">
      <span>
        {transaction.id}
      </span>
      <span>
        {transaction.label}
      </span>
      <span>
        {transaction.price}
      </span>
      <span>
        {transaction.createdAt}
      </span>
    </div>
  );
};

export default Transaction;
