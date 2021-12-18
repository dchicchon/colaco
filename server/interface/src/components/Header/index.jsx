import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import './style.css';

const Header = function Header() {
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    api.getRevenue().then((result) => {
      if (result.data[0].revenue) {
        setRevenue(result.data[0].revenue.toFixed(2));
      }
    }).catch((err) => {
      console.log('ERROR');
      console.error(err);
      setRevenue('Unable to retrieve revenue from server');
    });
  }, []);
  return (
    <div className="navbar">
      <h2 className="header-title">Soda API</h2>
      <h3 className="header-revenue">
        {`Total Revenue: $${revenue}`}
      </h3>
    </div>
  );
};

export default Header;
