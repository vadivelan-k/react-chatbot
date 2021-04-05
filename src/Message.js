import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert, Table } from 'react-bootstrap';
import classes from './Message.module.css';
import ActionButton from './ActionButton';
import DatePicker from 'react-datepicker';
import CalendarConfirmButton from './CalendarConfirmButton';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'react-responsive-modal/styles.css';
import UserInfo from './UserInfo';
import EmpInfo from './EmpInfo';
import CaseDetailComponent from './CaseDetailComponent';
import ReviewClaimComponent from './ReviewClaimComponent';
import RatingComponent from './RatingComponent';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const Message = ({ message, index, handleSendRequest }) => {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(true);
  let currentDate = new Date();
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(null);

  // const onChange_Start = (date) => {
  //   const start = date;
  //   setStartDate(start);
  // };

  // const onChange_End = (date) => {
  //   const end = date;
  //   setEndDate(end);
  // };

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    console.log('Date: ', startDate, endDate);
  };

  const startDateFormat = moment(startDate).format('MMM DD, YYYY');
  const endDateFormat = moment(endDate).format('MMM DD, YYYY');
  const confirmDate = startDateFormat + ' to ' + endDateFormat;

  console.log('message: ', message);

  const onOpenModal = () => {
    setHidden(false);
    // setOpen(true);
  };
  const onCloseModal = () => {
    // setOpen(false);
    setHidden(false);
  };

  const displayMessage = ({ response }) => {
    const textMessages = response.filter(
      (messageInfo) => messageInfo.message === 'text'
    );

    console.log(textMessages);

    return textMessages.map((textMessage, index) => {
      if (index === 0) {
        return (
          <p className={classes.BotMessage} key={0}>
            {textMessage.text.text[0]}
          </p>
        );
      } else if (index === 1) {
        return (
          <p className={classes.BotMessage} key={1}>
            {textMessage.text.text[0]}
          </p>
        );
      } else if (index === 2) {
        return (
          <div className={classes.BotMessageLink}>
            <a href={textMessage.text.text[0]} target='_blank'>
              {textMessage.text.text[0]}
            </a>
          </div>
        );
      }
    });
    // <>
    //   {response[1] ? (
    //     <p className={classes.BotMessage} key={index}>
    //       {response[0].text.text[0]}
    //     </p>
    //   ) : (
    //     <>
    //       <p className={classes.BotMessage} key={index}>
    //         {response[0].text.text[0]}
    //       </p>
    //       <p className={classes.BotMessage} key={index}>
    //         {response[1].text.text[0]}
    //       </p>
    //     </>
    //   )}
    // </>;

    // return textMessages.map((textMessage, index) => (
    //   <p className={classes.BotMessage} key={index}>
    //     {textMessage.text.text[0]}
    //   </p>
    // ));
  };

  const displayActionItems = ({ response }) => {
    const [payloadMessage] = response.filter(
      (messageInfo) => messageInfo.message === 'payload'
    );
    if (payloadMessage) {
      if (payloadMessage.payload.fields.element) {
        const element = payloadMessage.payload.fields;
        let actionItem = '';

        if (element.element.stringValue === 'start_end_dt_picker') {
          actionItem = (
            <div className={classes.Calendar}>
              {/* <Form>
                <Form.Group as={Row} controlId='cpend'>
                  <Form.Label column sm='4'>
                    Start Date:
                  </Form.Label>
                  <Col sm='5'>
                    <DatePicker
                      selected={startDate}
                      onChange={onChange_Start}
                      startDate={startDate}
                      selectsStart
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId='cpend'>
                  <Form.Label column sm='4'>
                    End Date:
                  </Form.Label>
                  <Col sm='5'>
                    <DatePicker
                      minDate={startDate}
                      selected={endDate}
                      onChange={onChange_End}
                      endDate={endDate}
                      selectsEnd
                    />
                  </Col>
                </Form.Group>
              </Form>
              <br />
              <br />
              <br /> */}
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
        } else if (element.element.stringValue === 'login') {
          actionItem = (
            <div>
              {/* {hidden ? (
                <button className={classes.StaticButton} onClick={onOpenModal}>
                  Log in
                </button>
              ) : null}
              <div hidden={hidden}>
                <p className={classes.BotSystemMessage}>
                  You have successfully log in with SingPass
                </p>
                <p className={classes.BotMessage}>
                  Please confirm your personal details
                </p>
                <UserInfo handleSendRequest={handleSendRequest} />
              </div> */}
              <button className={classes.StaticButton} onClick={onOpenModal}>
                Log in
              </button>
              <div hidden={hidden}>
                <p className={classes.BotSystemMessage}>
                  You have successfully log in with SingPass
                </p>
                <p className={classes.BotMessage}>
                  Please confirm your personal details
                </p>
                <UserInfo handleSendRequest={handleSendRequest} />
              </div>
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
        else if (element.element.stringValue === 'emp_details') {
          actionItem = <EmpInfo handleSendRequest={handleSendRequest} />;
        } else if (element.element.stringValue === 'case_details') {
          actionItem = (
            <CaseDetailComponent
              handleSendRequest={handleSendRequest}
              empStartDate={
                'Mon Jun 01 2020 00:00:00 GMT+0800 (Singapore Standard Time)'
              }
              empEndDate={
                'Tue Jun 30 2020 00:00:00 GMT+0800 (Singapore Standard Time)'
              }
            />
          );
        } else if (element.element.stringValue === 'doc_upload') {
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
              <Button className={classes.Button} type='button'>
                Upload
              </Button>
              <ActionButton
                actionText={'Submit'}
                handleSendRequest={handleSendRequest}
              />
            </div>
          );
        } else if (element.element.stringValue === 'review_claim') {
          actionItem = (
            <ReviewClaimComponent
              handleSendRequest={handleSendRequest}
              message={payloadMessage}
            />
          );
        } else if (element.element.stringValue === 'rate_experience') {
          actionItem = (
            <div>
              <RatingComponent handleSendRequest={handleSendRequest} />
            </div>
          );
        }
        // else if (
        //   element.feedbackText.stringValue ===
        //   'Thank you for your feedback and have a nice day.'
        // ) {
        //   actionItem = <p>Thank you for your feedback and have a nice day.</p>;
        // }

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
      <Modal open={open} onClose={onCloseModal} center>
        <h5>Log in</h5>
        <Form.Group as={Row} controlId='singpassID'>
          <Col sm='8'>
            <Form.Control value='S0000121F' name='singpassID' type='text' />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='password'>
          <Col sm='8'>
            <Form.Control value='12345678' name='singpassID' type='password' />
          </Col>
        </Form.Group>
        <button className={classes.StaticButton} onClick={onCloseModal}>
          Log in
        </button>
      </Modal>
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
          {/* {!message.isSystem ? (<div className={classes.BotCard}>
            {displayMessage(message)}
            {displayActionItems(message)}
          </div>) : <div>You have successfully login</div>} */}
        </div>
      ) : (
        // message.isBot && message.isSystem ? (<div>You have successfully login</div>)
        // : !message.isBot && !message.isSystem ?
        <div className={classes.UserCard}>
          <p className={classes.UserMessage}>{message.text}</p>
        </div>
      )}
    </div>
  );
};

export default Message;
