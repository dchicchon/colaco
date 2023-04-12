import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom'
import { ADD_MESSAGE, ADD_SODA } from '../../utils/actions';
import API from '../../utils/api';
import { useStateContext, useDispatchContext } from '../../utils/SodaContext';
import SodaMachineIcon from '../SodaMachineIcon';
import SodaLabel from '../SodaLabel';
import './style.css';

const SodaMachine = function SodaMachine() {
  // sodas should be found in the context
  const { sodas, dbVersion } = useStateContext();
  const dispatch = useDispatchContext();

  const [foundScreen, setFoundScreen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getNewSodas = async () => {
    console.log('getNewSodas')
    // when we do this lets reload our list entirely?
    API.getSodas()
      .then((result) => {
        if (result.length) {
          result.forEach(soda => {
            dispatch({ type: ADD_SODA, payload: soda });
          })
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

  const buySoda = async (key) => {
    API.buySoda(key)
      .then((result) => {
        dispatch({ type: ADD_MESSAGE, payload: `Soda Purchased: ${result.label}` });
        // downloadJSON(result);
        getNewSodas();
      })
      .catch(() => {
        dispatch({ type: ADD_MESSAGE, payload: 'Machine Malfunction, please try again later' });
      });
  };

  useEffect(() => {
    if (document.getElementById('sodascreen')) {
      setFoundScreen(true);
    }
  }, []);

  useEffect(() => {
    if (dbVersion) {
      getNewSodas()
    }
  }, [dbVersion])

  return (
    <div id="soda-machine">
      {
        foundScreen && createPortal(
          <div id='soda-selection'>
            {sodas.length > 0 ? sodas.map((soda) => (
              <SodaLabel key={soda.key} soda={soda} buySoda={buySoda} />
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
