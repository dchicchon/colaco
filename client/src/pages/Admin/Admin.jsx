import React from 'react';
import Header from '../../components/Header';
import SodaContainer from '../../components/SodaContainer/SodaContainer';
import TransactionContainer from '../../components/TransactionContainer';
import styles from './Admin.module.css';
import appStyles from '../../App.module.css';

function Admin() {
  return (
    <div className={styles.admin_page}>
      <Header />
      <div className={appStyles.tables}>
        <SodaContainer />
        <TransactionContainer />
      </div>
    </div>
  );
}

export default Admin;
