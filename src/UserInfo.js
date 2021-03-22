import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ActionButton from "./ActionButton";

const UserInfo = ({ handleSendRequest }) => {
  const defaultUser = {
    name: 'TAN YUE LIANG ALEXANDER',
    nric: 'S0000121F',
    nationality: 'Singaporean',
    dob: '12/12/1977',
    country: 'Singapore',
    passStatus: 'active',
    passExpiry: '10/10/2025',
    mailingAddress: 'Tampines St 92, BLK 844 #10-123 S243929',
    billingAddress: 'Tampines St 92, BLK 844 #10-123 S243929',
    mobile: '9642 2314',
    homePhone: '6782 1312',
    email: 'alexandertan@gmail.com',
    education: 'Bachelor\'s Degree',
  };

  const [user, setUser] = useState(defaultUser);
  const [editable, setEditable] = useState(false);

  const onChange = (event) => {
    setUser(Object.assign(user, { [event.target.name]: event.target.value }))
  };

  return (
    <div className="form-container">
      <Form>
        <Form.Group as={Row} controlId="formBasicPassword">
          <Form.Label column sm="4">Name (as per NRIC/FIN)</Form.Label>
          <Col sm="8">
          <Form.Control plaintext value={user.name} name="name"
                        onChange={onChange}
                        disabled={!editable}
          />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="4">NRIC or FIN:</Form.Label>
          <Col sm="8">
          <Form.Control plaintext value={user.nric} readOnly />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="4">Nationality:</Form.Label>
          <Col sm="8">
          <Form.Control plaintext value={user.nationality} name="nationality"
                        onChange={onChange}
                        disabled={!editable}
          />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="4">Date of Birth:</Form.Label>
          <Col sm="8">
          <Form.Control plaintext value={user.dob} name="dob" readOnly />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="4">Country of Birth:</Form.Label>
          <Col sm="8">
          <Form.Control plaintext value={user.country} name="country" readOnly />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="4">Pass Status:</Form.Label>
          <Col sm="8">
          <Form.Control plaintext value={user.passStatus} readOnly />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="4">Pass Expiry:</Form.Label>
          <Col sm="8">
          <Form.Control plaintext value={user.passExpiry} readOnly />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="4">Mailing Address:</Form.Label>
          <Col sm="8">
          <Form.Control plaintext value={user.mailingAddress} readOnly />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="4">Billing Address:</Form.Label>
          <Col sm="8">
          <Form.Control plaintext value={user.billingAddress} readOnly />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="4">Mobile Number:</Form.Label>
          <Col sm="8">
          <Form.Control plaintext value={user.mobile} readOnly />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="4">Home Number:</Form.Label>
          <Col sm="8">
          <Form.Control plaintext value={user.homePhone} readOnly />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formBasicEmail">
          <Form.Label column sm="4">Email address</Form.Label>
          <Col sm="8">
          <Form.Control type="email" placeholder="Enter email" name="email" value={user.email}
                        onChange={onChange}
                        disabled={!editable}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="4">Highest Education Level:</Form.Label>
          <Col sm="8">
          <Form.Control plaintext value={user.education} readOnly />
          </Col>
        </Form.Group>
        {
          editable &&
            <Button variant="primary" type="button" onClick={() => { setEditable(false); }}>
              Save
            </Button>
        }

        {
          !editable &&
            <>
              <Button variant="primary" type="button" onClick={() => { setEditable(true); }}>
                Edit
              </Button>
              <ActionButton
                actionText={'Confirm'}
                handleSendRequest={handleSendRequest}
              />
            </>
        }

      </Form>
    </div>
  );
};

export default UserInfo;
