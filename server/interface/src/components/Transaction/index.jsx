import React from 'react';
import './style.css';

const parseDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleString();
};

const Transaction = function ({ transaction }) {
  return (
    <div className="transaction-item" role="document">
      <span>
        {transaction.id}
      </span>
      <span>
        {transaction.label}
      </span>
      <span>
        {transaction.price.toFixed(2)}
      </span>
      <span>
        {parseDate(transaction.createdAt)}
      </span>
    </div>
  );
};

export default Transaction;
