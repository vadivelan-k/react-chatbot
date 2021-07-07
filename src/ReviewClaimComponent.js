import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import classes from './Message.module.css';
import ActionButton from './ActionButton';

const ReviewClaimComponent = ({ handleSendRequest, message }) => {
  const [editable, setEditable] = useState(false);

  const fields = message.payload.fields.form.structValue.fields;
  // console.log(message.payload);

  const fetchValueFromField = ({ fields, key }) => {
    return fields[key].stringValue;
  };

  console.log(fetchValueFromField({ fields: fields, key: 'bsal' }));

  return (
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
              <td>S$ {fetchValueFromField({ fields: fields, key: 'bsal' })}</td>
            </tr>
            <tr>
              <td>No. of Working Days (Weekly): </td>
              <td>
                {fetchValueFromField({ fields: fields, key: 'wdays' })} Days
              </td>
            </tr>
            <tr>
              <td>Claim Period: </td>
              <td>
                {fetchValueFromField({ fields: fields, key: 'cpstart' })} -{' '}
                {fetchValueFromField({ fields: fields, key: 'cpend' })}
              </td>
            </tr>
            <tr>
              <td>No. of Actual Working Days: </td>
              <td>
                {fetchValueFromField({ fields: fields, key: 'awdays' })} Days
              </td>
            </tr>
            <tr>
              <td>Total Pay Received: </td>
              <td>S$ {fetchValueFromField({ fields: fields, key: 'rpay' })}</td>
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
              <td>
                {fetchValueFromField({ fields: fields, key: 'cpstart' })} -{' '}
                {fetchValueFromField({ fields: fields, key: 'cpend' })}
              </td>
            </tr>
            <tr>
              <td>No. of Required Working Days: </td>
              <td>
                {fetchValueFromField({ fields: fields, key: 'wdays' })} Days
              </td>
            </tr>
            <tr>
              <td>No. of Actual Working Days: </td>
              <td>
                {fetchValueFromField({ fields: fields, key: 'awdays' })} Days
              </td>
            </tr>
            <tr>
              <td>Pay for Incompleted Work: </td>
              <td>
                S$ {fetchValueFromField({ fields: fields, key: 'incompay' })}
              </td>
            </tr>
            <tr>
              <td>Your Claimable Amount: </td>
              <td>
                S$ {fetchValueFromField({ fields: fields, key: 'incompay' })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {editable && (
        <Button
          className={classes.Button}
          type='button'
          onClick={() => {
            setEditable(false);
          }}
        >
          Save
        </Button>
      )}

      {!editable && (
        <>
          <Button
            className={classes.Button}
            type='button'
            onClick={() => {
              setEditable(true);
            }}
          >
            Edit
          </Button>
          <ActionButton
            actionText={'Confirm'}
            handleSendRequest={handleSendRequest}
          />
        </>
      )}
    </div>
  );
};

export default ReviewClaimComponent;
