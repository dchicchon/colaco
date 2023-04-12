import React from 'react';
import SodaMachine from '../../components/SodaMachine/SodaMachine';
import MessageBar from '../../components/MessageBar';
import styles from './SodaPage.module.css';

function SodaPage() {
  return (
    <div className={styles.soda_page}>
      <SodaMachine />
      <MessageBar />
    </div>
  );
}

export default SodaPage;
