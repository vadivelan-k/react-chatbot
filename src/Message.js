import React from 'react';
import classes from './Message.module.css';
import ActionButton from "./ActionButton";

const Message = ({ message, index, handleSendRequest }) => {
  const displayMessage = ({ response }) => {
    const textMessages = response.filter(
      (messageInfo) => messageInfo.message === 'text'
    );
    return textMessages.map(textMessage =>
      <p className={classes.BotMessage}>
        { textMessage.text.text[0] }
      </p>
    );
  };

  const displayActionItems = ({ response }) => {
    const [payloadMessage] = response.filter((messageInfo) => messageInfo.message === 'payload');
    if (payloadMessage) {
      if (payloadMessage.payload.fields.element) {
        const element = payloadMessage.payload.fields.element;
        let actionItem = '';

        if (element.stringValue === 'start_end_dt_picker') {
          actionItem = 'Start and End Date picker';
        } else if (element.stringValue === 'login') {
          actionItem = 'Login';
        } else if (element.stringValue === 'emp_details') {
          actionItem = 'Emp details';
        } else if (element.stringValue === 'case_details') {
          actionItem = 'Case details';
        }

        return actionItem;
      }

      if (payloadMessage.payload.fields.buttons) {
        return (
          <p className={classes.BotMessage}>
            {
              payloadMessage.payload.fields.buttons.listValue.values.map((buttonInfo) => {
                return (
                  <ActionButton
                    actionText={buttonInfo.stringValue}
                    handleSendRequest={handleSendRequest}
                  />
                );
              })
            }
          </p>
        );
      }
    } else {
      return null;
    }

  };

  return (
    <div className={classes.MessageCard} key={`key-${index}`}>
      {message.isBot ? (
        <div className={classes.BotContainer}>
          <svg
            className={classes.BotIcon}
            width='45'
            height='45'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M26.3225 4.12915H5.67732C4.25797 4.12915 3.09668 5.29044 3.09668 6.7098V25.1072C3.09668 26.889 5.25096 27.7813 6.51089 26.5214L7.67218 25.3601C8.04726 24.985 8.55596 24.7743 9.0864 24.7743H26.3225C27.7418 24.7743 28.9031 23.613 28.9031 22.1937V6.7098C28.9031 5.29044 27.7418 4.12915 26.3225 4.12915Z'
              fill='#006EAB'
            />
            <path
              d='M9.5 14C10.8807 14 12 12.8807 12 11.5C12 10.1193 10.8807 9 9.5 9C8.11929 9 7 10.1193 7 11.5C7 12.8807 8.11929 14 9.5 14Z'
              fill='white'
            />
            <path
              d='M22.5 14C23.8807 14 25 12.8807 25 11.5C25 10.1193 23.8807 9 22.5 9C21.1193 9 20 10.1193 20 11.5C20 12.8807 21.1193 14 22.5 14Z'
              fill='white'
            />
          </svg>

          <div className={classes.BotCard}>
            {
              displayMessage(message)
            }

            {
              displayActionItems(message)
            }
          </div>
        </div>
      ) : (
        <div className={classes.UserCard}>
          <p className={classes.UserMessage}>{message.text}</p>
        </div>
      )}
    </div>
  );
};

export default Message;
