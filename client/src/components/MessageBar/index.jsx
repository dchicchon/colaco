import React, { useEffect } from 'react';
import { SET_MESSAGE } from '../../utils/actions';
import { useDispatchContext, useStateContext } from '../../utils/SodaContext';
import './style.css';

const MessageBar = function MessageBar() {
    const state = useStateContext();
    const dispatch = useDispatchContext();
    const removeMessage = () => {
      setTimeout(() => {
        dispatch({ type: SET_MESSAGE, payload: '' });
      }, 5000);
    };
    useEffect(() => {
      if (state.message) removeMessage();
    }, [state.message]);

    if (state.message) {
      return (
        <div className="message-bar">
          <div className="message">
            {state.message}
          </div>
        </div>
      );
    }
    return '';
};

export default MessageBar;
