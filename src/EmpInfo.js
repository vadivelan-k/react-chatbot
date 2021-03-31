import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ActionButton from './ActionButton';
import classes from './EmpInfo.module.css';

const EmpInfo = ({ handleSendRequest }) => {
  const defaultEmpDetail = {
    occupation: 'Finance Manager',
    employmentType: 'Full Time',
    nameOfEmployer: 'ABC Pte. Ltd.',
    companyUEN: '00000000EN',
    employmentSector: 'Financial Intermediaries',
  };

  const [empInfo, setEmpInfo] = useState(defaultEmpDetail);
  const [editable, setEditable] = useState(false);

  const onChange = (event) => {
    setEmpInfo({ ...empInfo, [event.target.name]: event.target.value });
  };

  return (
    <div className='form-container'>
      <Form>
        <Form.Group as={Row} controlId='occupation'>
          <Form.Label column sm='4'>
            Occupation:
          </Form.Label>
          <Col sm='8'>
            <Form.Control
              value={empInfo.occupation}
              name='occupation'
              type='text'
              onChange={onChange}
              disabled={!editable}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='employmentType'>
          <Form.Label column sm='4'>
            Employment Type:
          </Form.Label>
          <Col sm='8'>
            <Form.Control
              value={empInfo.employmentType}
              name='employmentType'
              type='text'
              onChange={onChange}
              disabled={!editable}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='nameOfEmployer'>
          <Form.Label column sm='4'>
            Name of Employer:
          </Form.Label>
          <Col sm='8'>
            <Form.Control
              value={empInfo.nameOfEmployer}
              name='nameOfEmployer'
              type='text'
              onChange={onChange}
              disabled={!editable}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='companyUEN'>
          <Form.Label column sm='4'>
            Company UEN:
          </Form.Label>
          <Col sm='8'>
            <Form.Control
              value={empInfo.companyUEN}
              name='companyUEN'
              type='text'
              onChange={onChange}
              disabled={!editable}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='employmentSector'>
          <Form.Label column sm='4'>
            Employment Sector:
          </Form.Label>
          <Col sm='8'>
            <Form.Control
              value={empInfo.employmentSector}
              name='employmentSector'
              type='text'
              onChange={onChange}
              disabled={!editable}
            />
          </Col>
        </Form.Group>
        {editable && (
          <Button
            variant='primary'
            type='button'
            onClick={() => {
              setEditable(false);
              setEmpInfo({ ...empInfo });
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
      </Form>
    </div>
  );
};

export default EmpInfo;
