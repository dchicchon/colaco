import React, { useEffect, useState } from 'react';
import { SET_MESSAGE } from '../../utils/actions';
import { apiBuySoda, apiGetSodas } from '../../utils/api';
import { useDispatchContext } from '../../utils/SodaContext';
import SodaMachineIcon from '../SodaMachineIcon';
import './style.css';

const SodaLabel = function SodaLabel({ soda, buySoda }) {
    return (
      <div className="soda-label">
        <div className="button-wrapper">
          <button type="button" disabled={!(soda.quantity > 0)} onClick={() => buySoda(soda.id)} className="soda-button">{' '}</button>
        </div>
        <div className="text-wrapper">
          {' '}
          {soda.label}
          {' '}
          :   $
          {soda.price.toFixed(2)}
          {' '}
          -
          {' '}
          {(soda.quantity > 0) ? `${soda.quantity} left` : 'OUT'}
        </div>
      </div>
    );
};

const SodaMachine = function SodaMachine() {
    const [sodas, setSodas] = useState([]);
    const dispatch = useDispatchContext();
    // const state = useStateContext();
    const setNewSodas = async () => {
        const apiSodas = await apiGetSodas();
        // console.log(apiSodas)
        setSodas(apiSodas);
    };

    const downloadJSON = async (result) => {
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
    };

    const buySoda = async (id) => {
        apiBuySoda(id).then((result) => {
          dispatch({ type: SET_MESSAGE, payload: `Soda Purchased: ${result.label}` });
          downloadJSON(result);
          setNewSodas();
        }).catch((err) => {
          dispatch({ type: SET_MESSAGE, payload: 'Machine Malfunction, please try again later' });
          console.log(err);
        });
    };

    useEffect(() => {
        setNewSodas();
    }, []);

    return (
      <div id="soda-machine">
        <SodaMachineIcon />
        <div id="soda-selection">
          {sodas.length && sodas.map((soda) => (
            <SodaLabel key={soda.id} soda={soda} buySoda={buySoda} />
            ))}
        </div>

      </div>
    );
};

export default SodaMachine;
