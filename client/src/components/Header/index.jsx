import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import './style.css';

const Header = function Header() {
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    api
      .getRevenue()
      .then((result) => {
        setRevenue(result);
      })
      .catch((error) => {
        console.log({ error });
        setRevenue('Unable to retrieve revenue from server');
      });
  }, []);
  return (
    <div className="navbar">
      <h2 className="header_title">Soda API</h2>
      <h3 className="header_revenue">{`Total Revenue: $${revenue}`}</h3>
    </div>
  );
};

export default Header;
