import React, { useEffect } from 'react';
import Transaction from '../Transaction';
import { useStateContext, useDispatchContext } from '../../utils/SodaContext';
import { ADD_TRANSACTION } from '../../utils/actions';
import API from '../../utils/api';
import appStyles from '../../App.module.css';
import styles from './TransactionContainer.module.css';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

function FallbackTransaction() {
  return <div>Unable to render transaction</div>;
}

function TransactionContainer() {
  const { transactions } = useStateContext();
  const dispatch = useDispatchContext();

  const getTransactions = () => {
    API.getTransactions()
      .then((result) => {
        if (result.length) {
          result.forEach((transaction) => {
            dispatch({ type: ADD_TRANSACTION, payload: transaction });
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div style={{ flex: '2' }}>
      <h3>Transaction History</h3>
      <div className={appStyles.container}>
        <div className={styles.transaction_container_header}>
          <span>ID</span>
          <span>Label</span>
          <span>Price</span>
          <span>Time</span>
        </div>
        {transactions.length > 0
          ? transactions.map((transaction) => (
              // eslint-disable-next-line react/jsx-indent
              <ErrorBoundary key={transaction.key} fallback={<FallbackTransaction />}>
                <Transaction transaction={transaction} />
              </ErrorBoundary>
            ))
          : 'No history found'}
      </div>
    </div>
  );
}

export default TransactionContainer;
