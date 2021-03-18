import React, { useState } from 'react';
import classes from './Message.module.css';
import ActionButton from './ActionButton';
import { Button } from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import CalendarConfirmButton from './CalendarConfirmButton';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const Message = ({ message, index, handleSendRequest }) => {
  const [open, setOpen] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    console.log('Date: ', startDate, endDate);
  };

  var startDateFormat = moment(startDate).format('MMM Do YYYY');
  var endDateFormat = moment(endDate).format('MMM Do YYYY');
  const confirmDate = startDateFormat + ' to ' + endDateFormat;

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

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
            // <Button className={classes.LoginButton} onClick={onOpenModal}>
            //   Login via SingPass
            // </Button>
            <div>
              <p className={classes.BotMessage}>
                You have successfully login with SingPass
              </p>
              <p className={classes.BotMessage}>
                Please confirm your personal details
              </p>
              <table className={classes.BotMessage}>
                <tbody>
                  <tr>
                    <td>
                      Name <br />
                      (as per NRIC/FIN):{' '}
                    </td>
                    <td>TAN YUE LIANG ALEXANDER</td>
                  </tr>
                  <tr>
                    <td>NRIC or FIN: </td>
                    <td>S0000121F</td>
                  </tr>
                  <tr>
                    <td>Nationality: </td>
                    <td>Singaporean</td>
                  </tr>
                  <tr>
                    <td>Date of Birth: </td>
                    <td>12/12/1977</td>
                  </tr>
                  <tr>
                    <td>Country of Birth: </td>
                    <td>Singapore</td>
                  </tr>
                  <tr>
                    <td>Pass Status: </td>
                    <td>Active</td>
                  </tr>
                  <tr>
                    <td>Pass Expiry: </td>
                    <td>10/10/2025</td>
                  </tr>
                  <tr>
                    <td>Mailing Address: </td>
                    <td>Tampines St 92, BLK 844 #10-123 S243929</td>
                  </tr>
                  <tr>
                    <td>Billing Address: </td>
                    <td>Tampines St 92, BLK 844 #10-123 S243929</td>
                  </tr>
                  <tr>
                    <td>Mobile Number: </td>
                    <td>9642 2314</td>
                  </tr>
                  <tr>
                    <td>Home Number: </td>
                    <td>6782 1312</td>
                  </tr>
                  <tr>
                    <td>Email Address: </td>
                    <td>alexandertan@gmail.com</td>
                  </tr>
                  <tr>
                    <td>Highest Education Level: </td>
                    <td>Bachelor’s Degree</td>
                  </tr>
                </tbody>
              </table>
              <ActionButton
                actionText={'Edit'}
                handleSendRequest={handleSendRequest}
              />
              <ActionButton
                actionText={'Confirm'}
                handleSendRequest={handleSendRequest}
              />
            </div>
          );
        } else if (element.stringValue === 'emp_details') {
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
                actionText={'Edit'}
                handleSendRequest={handleSendRequest}
              />
              <ActionButton
                actionText={'Confirm'}
                handleSendRequest={handleSendRequest}
              />
            </div>
          );
        } else if (element.stringValue === 'case_details') {
          actionItem = (
            <div>
              <table className={classes.BotMessage}>
                <tbody>
                  <tr>
                    <td>Basic Salary (Monthly): </td>
                    <td>$2000</td>
                  </tr>
                  <tr>
                    <td>No. of Working Days (Weekly): </td>
                    <td>5 Days</td>
                  </tr>
                  <tr>
                    <td>Claim Period: </td>
                    <td>10/11/2020 - 10/12/2020</td>
                  </tr>
                  <tr>
                    <td>No. of Actual Working Days: </td>
                    <td>20 Days</td>
                  </tr>
                  <tr>
                    <td>Total Pay Received </td>
                    <td>$1000</td>
                  </tr>
                </tbody>
              </table>
              <ActionButton
                actionText={'Edit'}
                handleSendRequest={handleSendRequest}
              />
              <ActionButton
                actionText={'Submit'}
                handleSendRequest={handleSendRequest}
              />
            </div>
          );
        } else if (element.stringValue === 'doc_upload') {
          actionItem = (
            <div>
              <table className={classes.BotMessage}>
                <tbody>
                  <tbody>
                    <tr>
                      <td>payslip.pdf</td>
                    </tr>
                    <tr>
                      <td>cpf.pdf</td>
                    </tr>
                  </tbody>
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
            <div>
              <div>
                <h6>Personal Details</h6>
                <table className={classes.BotMessage}>
                  <tbody>
                    <tr>
                      <td>
                        Name <br />
                        (as per NRIC/FIN):{' '}
                      </td>
                      <td>TAN YUE LIANG ALEXANDER</td>
                    </tr>
                    <tr>
                      <td>NRIC or FIN: </td>
                      <td>S0000121F</td>
                    </tr>
                    <tr>
                      <td>Nationality: </td>
                      <td>Singaporean</td>
                    </tr>
                    <tr>
                      <td>Date of Birth: </td>
                      <td>12/12/1977</td>
                    </tr>
                    <tr>
                      <td>Country of Birth: </td>
                      <td>Singapore</td>
                    </tr>
                    <tr>
                      <td>Pass Status: </td>
                      <td>Active</td>
                    </tr>
                    <tr>
                      <td>Pass Expiry: </td>
                      <td>10/10/2025</td>
                    </tr>
                    <tr>
                      <td>Mailing Address: </td>
                      <td>Tampines St 92, BLK 844 #10-123 S243929</td>
                    </tr>
                    <tr>
                      <td>Billing Address: </td>
                      <td>Tampines St 92, BLK 844 #10-123 S243929</td>
                    </tr>
                    <tr>
                      <td>Mobile Number: </td>
                      <td>9642 2314</td>
                    </tr>
                    <tr>
                      <td>Home Number: </td>
                      <td>6782 1312</td>
                    </tr>
                    <tr>
                      <td>Email Address: </td>
                      <td>alexandertan@gmail.com</td>
                    </tr>
                    <tr>
                      <td>Highest Education Level: </td>
                      <td>Bachelor’s Degree</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <br />
              <div>
                <h6>Employment Details</h6>
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
              </div>
              <br />
              <div>
                <h6>Case Details</h6>
                <table className={classes.BotMessage}>
                  <tbody>
                    <tr>
                      <td>Basic Salary (Monthly): </td>
                      <td>$2000</td>
                    </tr>
                    <tr>
                      <td>No. of Working Days (Weekly): </td>
                      <td>5 Days</td>
                    </tr>
                    <tr>
                      <td>Claim Period: </td>
                      <td>10/11/2020 - 10/12/2020</td>
                    </tr>
                    <tr>
                      <td>No. of Actual Working Days: </td>
                      <td>20 Days</td>
                    </tr>
                    <tr>
                      <td>Total Pay Received: </td>
                      <td>$1000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <br />
              <div>
                <h6>Salary Calculator</h6>
                <p className={classes.SalaryCalculator}>
                  Here are your calculated details
                </p>
                <table className={classes.BotMessage}>
                  <tbody>
                    <tr>
                      <td>Claim Period: </td>
                      <td>10/11/2020 - 10/12/2020</td>
                    </tr>
                    <tr>
                      <td>No. of Required Working Days: </td>
                      <td>5 Days</td>
                    </tr>
                    <tr>
                      <td>No. of Actual Working Days: </td>
                      <td>20 Days</td>
                    </tr>
                    <tr>
                      <td>Pay for Incompleted Work: </td>
                      <td>$1000</td>
                    </tr>
                    <tr>
                      <td>Your Claimable Amount: </td>
                      <td>$1000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ActionButton
                actionText={'Submit'}
                handleSendRequest={handleSendRequest}
              />
            </div>
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
                    onClick={onOpenModal}
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
        <p className={classes.BotMessage}>
          You have successfully login with SingPass.
        </p>
        <p className={classes.BotMessage}>
          Please confirm your personal details
        </p>
        <table className={classes.BotMessage}>
          <tbody>
            <tr>
              <td>
                Name <br />
                (as per NRIC/FIN):{' '}
              </td>
              <td>TAN YUE LIANG ALEXANDER</td>
            </tr>
            <tr>
              <td>NRIC or FIN: </td>
              <td>S0000121F</td>
            </tr>
            <tr>
              <td>Nationality: </td>
              <td>Singaporean</td>
            </tr>
            <tr>
              <td>Date of Birth: </td>
              <td>12/12/1977</td>
            </tr>
            <tr>
              <td>Country of Birth: </td>
              <td>Singapore</td>
            </tr>
            <tr>
              <td>Pass Status: </td>
              <td>Active</td>
            </tr>
            <tr>
              <td>Pass Expiry: </td>
              <td>10/10/2025</td>
            </tr>
            <tr>
              <td>Mailing Address: </td>
              <td>Tampines St 92, BLK 844 #10-123 S243929</td>
            </tr>
            <tr>
              <td>Billing Address: </td>
              <td>Tampines St 92, BLK 844 #10-123 S243929</td>
            </tr>
            <tr>
              <td>Mobile Number: </td>
              <td>9642 2314</td>
            </tr>
            <tr>
              <td>Home Number: </td>
              <td>6782 1312</td>
            </tr>
            <tr>
              <td>Email Address: </td>
              <td>alexandertan@gmail.com</td>
            </tr>
            <tr>
              <td>Highest Education Level: </td>
              <td>Bachelor’s Degree</td>
            </tr>
          </tbody>
        </table>
        <ActionButton
          actionText={'Edit'}
          handleSendRequest={handleSendRequest}
        />
        <ActionButton
          actionText={'Confirm'}
          handleSendRequest={handleSendRequest}
        />
      </Modal>
      {message.isBot ? (
        <div className={classes.BotContainer}>
          <svg
            className={classes.BotIcon}
            width='60'
            height='60'
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
