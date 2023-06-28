import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <div className={styles.navbar}>
      <h1>Cola Co.</h1>
      <Link className={styles.link} to="/colaco/">
        To Soda Machine
      </Link>
      <Link className={styles.link} to="/colaco/admin">
        To admin page
      </Link>
    </div>
  );
}

export default Navbar;
