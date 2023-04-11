import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom'
import { ADD_MESSAGE } from '../../utils/actions';
import API from '../../utils/api';
import { useDispatchContext } from '../../utils/SodaContext';
import SodaMachineIcon from '../SodaMachineIcon';
import SodaLabel from '../SodaLabel';
import './style.css';

const SodaMachine = function SodaMachine() {
  const sodaScreen = useRef(null);
  const [sodas, setSodas] = useState([]);
  const [foundScreen, setFoundScreen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatchContext();
  const setNewSodas = async () => {
    API.getSodas()
      .then((result) => {
        if (result.data.length) {
          setSodas(result.data);
        } else {
          setErrorMessage('No Sodas Available! Please check again later');
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage('Fault in Soda Machine. Please come again letter');
      });
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
    API.buySoda(id)
      .then((result) => {
        dispatch({ type: ADD_MESSAGE, payload: `Soda Purchased: ${result.data.label}` });
        downloadJSON(result.data);
        setNewSodas();
      })
      .catch(() => {
        dispatch({ type: ADD_MESSAGE, payload: 'Machine Malfunction, please try again later' });
      });
  };

  useEffect(() => {
    if (document.getElementById('sodascreen')) {
      setFoundScreen(true);
    }
    setNewSodas();
  }, []);

  return (
    <div id="soda-machine">
      {
        foundScreen && createPortal(
          <div id='soda-selection'>
            {sodas.length > 0 ? sodas.map((soda) => (
              <SodaLabel key={soda.id} soda={soda} buySoda={buySoda} />
            )) : (
              <h4 className="error-message">
                {errorMessage}
                <code>
                  {' '}
                  -soda os
                </code>
              </h4>
            )}
          </div>,
          document.getElementById('sodascreen'))
      }

      <SodaMachineIcon />
    </div>
  );
};

export default SodaMachine;
