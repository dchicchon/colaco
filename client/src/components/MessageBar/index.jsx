import React, { useEffect } from 'react';
import { REMOVE_MESSAGE } from '../../utils/actions';
// import { usePrevious } from '../../utils/helpers';
import { useDispatchContext, useStateContext } from '../../utils/SodaContext';
import './style.css';

const MessageBar = function MessageBar() {
    const state = useStateContext();
    const dispatch = useDispatchContext();
    const removeMessage = (id) => {
      setTimeout(() => {
        dispatch({ type: REMOVE_MESSAGE, payload: id });
      }, 5000);
    };
    useEffect(() => {
      if (state.messages.length) {
        const { id } = state.messages[state.messages.length - 1];
        removeMessage(id);
      }
    }, [state.messages]);

    if (state.messages) {
      return (
        <div className="message-bar">

          {state.messages.map((message) => (
            <div key={message.id} className="message">
              {message.text}
            </div>
          ))}
        </div>
      );
    }
    return '';
};

export default MessageBar;
