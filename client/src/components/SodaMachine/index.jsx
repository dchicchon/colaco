import React, { useEffect, useState } from 'react';
import { apiBuySoda, apiGetSodas } from '../../utils/api';
import './style.css';

const SodaLabel = function SodaLabel({ soda, buySoda }) {
    return (
      <div className="soda-label">
        <div className="button-wrapper">
          <button type="button" onClick={() => buySoda(soda.id)} className="soda-button">{' '}</button>
        </div>
        <div className="text-wrapper">
          $
          {soda.price}
          {' '}
          {soda.label}
          {' '}
          :
          {' '}
          {soda.quantity}
        </div>
      </div>
    );
};

/**
 * sodas is going to be a list of objects, each of those objects will have a field
 * @param count number of sodas
 * @param label type of soda
 * @param price cost of soda
 */

const SodaMachine = function SodaMachine() {
    const [sodas, setSodas] = useState([]);

    const setNewSodas = async () => {
        const apiSodas = await apiGetSodas();
        // console.log(apiSodas)
        setSodas(apiSodas);
    };
    const buySoda = async (id) => {
        const result = await apiBuySoda(id); // based on result, download json;
        const fileName = result.label;
        const json = JSON.stringify(result);
        const blob = new Blob([json], { type: 'application/json' });
        const href = await URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = href;
        a.download = `${fileName}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setNewSodas();
    };
    useEffect(() => {
        setNewSodas();
    }, []);

    return (
      <div id="soda-machine">
        <h4>Soda Machine</h4>
        {sodas.length && sodas.map((soda) => (
          <SodaLabel key={soda.id} soda={soda} buySoda={buySoda} />
            ))}
      </div>
    );
};

export default SodaMachine;
