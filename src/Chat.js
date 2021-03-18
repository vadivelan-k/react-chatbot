import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MOMBotIcon from './assets/images/MOMBot-Icon-1.svg';
import classes from './Chat.module.css';
import Messages from './Messages';

const Chat = (props) => {
  const [responses, setResponses] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [sessionId, setSessionId] = useState('');
  const { REACT_APP_API_URL } = process.env;

  const handleMessageSubmit = (message) => {
    const queryParams = sessionId
      ? `message=${message}&sessionID=${sessionId}`
      : `message=${message}`;

    axios
      .get(`${REACT_APP_API_URL}?${queryParams}`)
      .then((response) => {
        if (!sessionId) {
          setSessionId(response.data.sessionID);
        }

        const responseData = {
          response: response.data.data[0]['queryResult']['fulfillmentMessages'],
          isBot: true,
        };

        setResponses((responses) => [...responses, responseData]);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };

  const handleMessageChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    if (
      (event.type == 'click' || event.key == 'Enter') &&
      currentMessage != ''
    ) {
      const message = {
        text: currentMessage,
        isBot: false,
      };
      setResponses((responses) => [...responses, message]);
      handleMessageSubmit(message.text);
      setCurrentMessage('');
    }
  };

  const handleSendRequest = ({ actionText, initiateChat = false }) => {
    const message = {
      text: actionText,
      isBot: false,
    };

    let newResponseCollection = [];
    if (initiateChat) {
      newResponseCollection = [...responses];
    } else {
      newResponseCollection = [...responses, message];
    }

    setResponses((responses) => newResponseCollection);
    handleMessageSubmit(message.text);
    setCurrentMessage('');
  };

  useEffect(
    () => handleSendRequest({ actionText: 'Hi', initiateChat: true }),
    []
  );

  return (
    <div className={classes.ChatSection}>
      <div className={classes.TopBar}>
        <span>
          <label>Chatbot POC</label>
          <svg className="Message_BotIcon__1oSZb" width="60" height="60" viewBox="0 0 70 50" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <g>
                <g>
                  <path
                    d="M24.235 9.754C10.983 26.936 8.617 51.46 21.172 66.104c-8.098-19.377-.646-39.968 8.873-52.848 1.384-1.75 1.216-3.807-.423-4.944-2.733-1.897-4.793.672-5.387 1.442zM38.093 26.08c-11.16 17.06-12.4 39.3.054 53.157 1.557 1.73 3.357 3.147 5.54 4.557.36.237 1.904.99 3.366 1.456 3.14 1 5.822.318 7.172-.768-2.396.358-5.398.518-8.96-2.33-13.417-10.73-12.49-35.84-1.08-52.852.125-.195 1.545-2.975-1.008-4.657-2.138-1.41-4.084-.092-5.084 1.437zM36.028 10.643C21.99 26.896 12.71 55.46 31.634 76.385 22.626 59.918 22.9 38.54 42.118 15.055c1.15-1.648 1.24-3.742-.67-5.24-1.91-1.503-4.094-.59-5.42.828z"
                    id="Shape" fill="#007CB7" />
                  <path
                    d="M14.005 23.433s-1.295 3.64-1.455 4.368C.61 22.37.797 29.674 4.194 37.45c-4.318-3.75-9.95-20.178 9.81-14.015z"
                    id="Shape" fill="#F7921E" />
                  <path
                    d="M42.128 4.733C42.128 2.12 44.248 0 46.86 0c2.614 0 4.733 2.12 4.733 4.733 0 2.613-2.12 4.73-4.733 4.73-2.613.002-4.732-2.117-4.732-4.73z"
                    id="Shape" fill="#007CB7" />
                  <path
                    d="M44.278 34.76c32.896 21.43 18.78 51.715 5.686 47.35-2.73-.91-4.413-3.14-4.458-3.775 1.425 1.397 3.05 2.32 4.375 2.684 14.308 3.91 17.228-27.355-7.83-41.37.772-2.184 1.773-4.026 2.228-4.89z"
                    fill="#F7921E" />
                </g>
              </g>
            </g>
          </svg>
        </span>
        <div className={classes.TopBarChevronIcon}>
          <svg
            width='32'
            height='32'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M7 11.5L16 20.5L25 11.5'
              stroke='white'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      </div>
      <div className={classes.BotContainer}>
        <div className={classes.MessagesContainer}>
          <Messages
            messages={responses}
            handleSendRequest={handleSendRequest}
          />
        </div>
      </div>
      <div className={classes.InputSection}>
        <input
          type='text'
          value={currentMessage}
          onChange={handleMessageChange}
          onKeyDown={handleSubmit}
          placeholder='Type your question ...'
          className={classes.MessageInputField}
        />
        <div onClick={handleSubmit}>
          <svg
            className={classes.SubmitBtn}
            id='Capa_1'
            enableBackground='new 0 0 512.004 512.004'
            height='25'
            viewBox='0 0 512.004 512.004'
            width='25'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g>
              <path
                d='m511.35 52.881-122 400c-3.044 9.919-14.974 13.828-23.29 7.67-7.717-5.727-203.749-151.217-214.37-159.1l-142.1-54.96c-5.79-2.24-9.6-7.81-9.59-14.02.01-6.21 3.85-11.77 9.65-13.98l482-184c5.824-2.232 12.488-.626 16.67 4.17 3.37 3.87 4.55 9.24 3.03 14.22z'
                fill='#94dfda'
              />
              <path
                d='m511.35 52.881-122 400c-3.044 9.919-14.974 13.828-23.29 7.67l-190.05-141.05 332.31-280.84c3.37 3.87 4.55 9.24 3.03 14.22z'
                fill='#61a7c5'
              />
              <path
                d='m507.89 58.821-271.49 286.4-63 125.03c-3.16 6.246-10.188 9.453-16.87 7.84-6.76-1.6-11.53-7.64-11.53-14.59v-175.3c0-4.86 2.35-9.41 6.31-12.23l337-239.69c6.29-4.48 14.95-3.45 20.01 2.38 5.07 5.83 4.88 14.56-.43 20.16z'
                fill='#eef4ff'
              />
              <path
                d='m507.89 58.821-271.49 286.4-63 125.03c-3.16 6.246-10.188 9.453-16.87 7.84-6.76-1.6-11.53-7.64-11.53-14.59l31.01-144 332.31-280.84c5.07 5.83 4.88 14.56-.43 20.16z'
                fill='#d9e6fc'
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Chat;
