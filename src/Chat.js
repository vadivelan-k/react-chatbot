import React, { useState } from 'react';
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

  return (
    <div className={classes.ChatSection}>
      <div className={classes.TopBar}>
        {/* <div className={classes.TopBarContainer}> */}
        <span>
          <label>MOMBot</label>
          <svg
            className={classes.TopBarBotIcon}
            width='40'
            height='40'
            viewBox='0 0 36 36'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clip-path='url(#clip0)'>
              <g filter='url(#filter0_d)'>
                <circle cx='18' cy='18' r='14' fill='white' />
              </g>
              <path
                d='M24.4 11H11.6C10.72 11 10 11.72 10 12.6V23.1373C10 24.5627 11.7234 25.2766 12.7314 24.2686C13.0314 23.9686 13.4384 23.8 13.8627 23.8H24.4C25.28 23.8 26 23.08 26 22.2V12.6C26 11.72 25.28 11 24.4 11Z'
                fill='#006EAB'
              />
              <path
                d='M14.5 17C15.3284 17 16 16.3284 16 15.5C16 14.6716 15.3284 14 14.5 14C13.6716 14 13 14.6716 13 15.5C13 16.3284 13.6716 17 14.5 17Z'
                fill='white'
              />
              <path
                d='M21.5 17C22.3284 17 23 16.3284 23 15.5C23 14.6716 22.3284 14 21.5 14C20.6716 14 20 14.6716 20 15.5C20 16.3284 20.6716 17 21.5 17Z'
                fill='white'
              />
            </g>
            <defs>
              <filter
                id='filter0_d'
                x='0'
                y='2'
                width='36'
                height='36'
                filterUnits='userSpaceOnUse'
                color-interpolation-filters='sRGB'
              >
                <feFlood flood-opacity='0' result='BackgroundImageFix' />
                <feColorMatrix
                  in='SourceAlpha'
                  type='matrix'
                  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                />
                <feOffset dy='2' />
                <feGaussianBlur stdDeviation='2' />
                <feColorMatrix
                  type='matrix'
                  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
                />
                <feBlend
                  mode='normal'
                  in2='BackgroundImageFix'
                  result='effect1_dropShadow'
                />
                <feBlend
                  mode='normal'
                  in='SourceGraphic'
                  in2='effect1_dropShadow'
                  result='shape'
                />
              </filter>
              <clipPath id='clip0'>
                <rect width='36' height='36' fill='white' />
              </clipPath>
            </defs>
          </svg>
        </span>

        {/* <text className={classes.TopBarText}>MOMBot</text> */}
        <svg
          className={classes.TopBarChevronIcon}
          width='32'
          height='32'
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M7 11.5L16 20.5L25 11.5'
            stroke='white'
            stroke-width='1.5'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
        {/* </div> */}
      </div>
      <div className={classes.BotContainer}>
        <div className={classes.MessagesContainer}>
          <Messages messages={responses} />
        </div>
      </div>
      <div className={classes.InputSection}>
        <input
          type='text'
          value={currentMessage}
          onChange={handleMessageChange}
          onKeyDown={handleSubmit}
          placeholder='Say something...'
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
