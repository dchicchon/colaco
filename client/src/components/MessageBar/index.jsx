import React, { useEffect } from 'react';
import { REMOVE_MESSAGE } from '../../utils/actions';
import { useDispatchContext, useStateContext } from '../../utils/SodaContext';
import './style.css';

const MessageBar = function MessageBar() {
  const { messages } = useStateContext();
  const dispatch = useDispatchContext();

  useEffect(() => {
    if (messages.length) {
      const { id } = messages[messages.length - 1];
      setTimeout(() => {
        dispatch({ type: REMOVE_MESSAGE, payload: id });
      }, 5000);
    }

  }, [messages]);

  if (messages) {
    return (
      <div className="message_bar">
        {messages.map((message) => (
          <div role="alert" key={message.id} className="message">
            {message.text}
          </div>
        ))}
      </div>
    );
  }
  return '';
};

export default MessageBar;
