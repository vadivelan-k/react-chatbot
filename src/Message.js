import React, { useState } from 'react';
import classes from './Message.module.css';
import ActionButton from './ActionButton';
import DatePicker from 'react-datepicker';
import CalendarConfirmButton from './CalendarConfirmButton';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'react-responsive-modal/styles.css';
import UserInfo from './UserInfo';
import CaseDetailComponent from './CaseDetailComponent';
import ReviewClaimComponent from './ReviewClaimComponent';
import RatingComponent from './RatingComponent';

const Message = ({ message, index, handleSendRequest }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const startDateFormat = moment(startDate).format('MMM DD, YYYY');
  const endDateFormat = moment(endDate).format('MMM DD, YYYY');
  const confirmDate = startDateFormat + ' to ' + endDateFormat;

  const displayMessage = ({ response }) => {
    const textMessages = response.filter(
      (messageInfo) => messageInfo.message === 'text'
    );
    return textMessages.map((textMessage, index) => (
      <p className={classes.BotMessage} key={index}>
        {textMessage.text.text[0]}
      </p>
    ));
  };

  const displayActionItems = ({ response }) => {
    const [payloadMessage] = response.filter(
      (messageInfo) => messageInfo.message === 'payload'
    );
    if (payloadMessage) {
      if (payloadMessage.payload.fields.element) {
        const element = payloadMessage.payload.fields.element;
        let actionItem = '';

        if (element.stringValue === 'start_end_dt_picker') {
          actionItem = (
            <div className={classes.Calendar}>
              <DatePicker
                className='calendar'
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
              />
              <CalendarConfirmButton
                actionText={confirmDate}
                handleSendRequest={handleSendRequest}
              />
            </div>
          );
        } else if (element.stringValue === 'login') {
          actionItem = (
            <div>
              <p className={classes.BotMessage}>
                You have successfully login with SingPass
              </p>
              <p className={classes.BotMessage}>
                Please confirm your personal details
              </p>
              <UserInfo handleSendRequest={handleSendRequest} />
            </div>
          );
        }
        // else if (element.stringValue === 'user_details') {
        //   actionItem = (
        //     <div>
        //       <p className={classes.BotMessage}>
        //         You have successfully login with SingPass
        //       </p>
        //       <p className={classes.BotMessage}>
        //         Please confirm your personal details
        //       </p>
        //       <UserInfo handleSendRequest={handleSendRequest} />
        //     </div>
        //   );
        // }
        else if (element.stringValue === 'emp_details') {
          actionItem = (
            <div>
              <table className={classes.BotMessage}>
                <tbody>
                  <tr>
                    <td>Occupation: </td>
                    <td>Finance Manager</td>
                  </tr>
                  <tr>
                    <td>Employment Type: </td>
                    <td>Full Time</td>
                  </tr>
                  <tr>
                    <td>Name of Employer: </td>
                    <td>ABC Pte. Ltd</td>
                  </tr>
                  <tr>
                    <td>Company UEN: </td>
                    <td>00000000EN</td>
                  </tr>
                  <tr>
                    <td>Employment Sector: </td>
                    <td>Financial Intermediaries</td>
                  </tr>
                </tbody>
              </table>
              <ActionButton
                actionText={'Confirm'}
                handleSendRequest={handleSendRequest}
              />
            </div>
          );
        } else if (element.stringValue === 'case_details') {
          actionItem = (
            <CaseDetailComponent
              handleSendRequest={handleSendRequest}
              empStartDate={
                'Mon Feb 01 2021 00:00:00 GMT+0800 (Singapore Standard Time)'
              }
              empEndDate={
                'Sun Feb 28 2021 00:00:00 GMT+0800 (Singapore Standard Time)'
              }
            />
          );
        } else if (element.stringValue === 'doc_upload') {
          actionItem = (
            <div>
              <table className={classes.BotMessage}>
                <tbody>
                  <tr>
                    <td>payslip.pdf</td>
                  </tr>
                  <tr>
                    <td>cpf.pdf</td>
                  </tr>
                </tbody>
              </table>
              <ActionButton
                actionText={'Submit'}
                handleSendRequest={handleSendRequest}
              />
            </div>
          );
        } else if (element.stringValue === 'review_claim') {
          actionItem = (
            <ReviewClaimComponent
              handleSendRequest={handleSendRequest}
              message={payloadMessage}
            />
          );
        } else if (element.stringValue === 'rate_experience') {
          actionItem = (
            <RatingComponent handleSendRequest={handleSendRequest} />
          );
        }

        return actionItem;
      }

      if (payloadMessage.payload.fields.buttons) {
        return (
          <p className={classes.BotMessage}>
            {payloadMessage.payload.fields.buttons.listValue.values.map(
              (buttonInfo, index) => {
                return (
                  <ActionButton
                    key={index}
                    actionText={buttonInfo.stringValue}
                    handleSendRequest={handleSendRequest}
                  />
                );
              }
            )}
          </p>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <div key={`key-${index}`}>
      {message.isBot ? (
        <div className={classes.BotContainer}>
          <svg
            className='Message_BotIcon__1oSZb'
            width='60'
            height='60'
            viewBox='0 0 70 50'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g fill='none' fillRule='evenodd'>
              <g>
                <g>
                  <path
                    d='M24.235 9.754C10.983 26.936 8.617 51.46 21.172 66.104c-8.098-19.377-.646-39.968 8.873-52.848 1.384-1.75 1.216-3.807-.423-4.944-2.733-1.897-4.793.672-5.387 1.442zM38.093 26.08c-11.16 17.06-12.4 39.3.054 53.157 1.557 1.73 3.357 3.147 5.54 4.557.36.237 1.904.99 3.366 1.456 3.14 1 5.822.318 7.172-.768-2.396.358-5.398.518-8.96-2.33-13.417-10.73-12.49-35.84-1.08-52.852.125-.195 1.545-2.975-1.008-4.657-2.138-1.41-4.084-.092-5.084 1.437zM36.028 10.643C21.99 26.896 12.71 55.46 31.634 76.385 22.626 59.918 22.9 38.54 42.118 15.055c1.15-1.648 1.24-3.742-.67-5.24-1.91-1.503-4.094-.59-5.42.828z'
                    id='Shape'
                    fill='#007CB7'
                  />
                  <path
                    d='M14.005 23.433s-1.295 3.64-1.455 4.368C.61 22.37.797 29.674 4.194 37.45c-4.318-3.75-9.95-20.178 9.81-14.015z'
                    id='Shape'
                    fill='#F7921E'
                  />
                  <path
                    d='M42.128 4.733C42.128 2.12 44.248 0 46.86 0c2.614 0 4.733 2.12 4.733 4.733 0 2.613-2.12 4.73-4.733 4.73-2.613.002-4.732-2.117-4.732-4.73z'
                    id='Shape'
                    fill='#007CB7'
                  />
                  <path
                    d='M44.278 34.76c32.896 21.43 18.78 51.715 5.686 47.35-2.73-.91-4.413-3.14-4.458-3.775 1.425 1.397 3.05 2.32 4.375 2.684 14.308 3.91 17.228-27.355-7.83-41.37.772-2.184 1.773-4.026 2.228-4.89z'
                    fill='#F7921E'
                  />
                </g>
              </g>
            </g>
          </svg>
          <div className={classes.BotCard}>
            {displayMessage(message)}
            {displayActionItems(message)}
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
