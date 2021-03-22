import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import ActionButton from "./ActionButton";

const CaseDetailComponent = ({ handleSendRequest }) => {
  const handleSendCaseRequest = ({ actionText }) => {
    handleSendRequest({ actionText: actionText, additionalParams: caseDetail });
  };

  const formatDate = (d) => {
    return moment(d).format('MMM DD, YYYY');
  };

  const defaultCaseDetail = {
    bsal: '2000',
    wdays: '5',
    awdays: '10',
    rpay: '5000',
    claimable: '2000',
    cpstart: formatDate(new Date()),
    incompay: '1000',
    cpend: formatDate(new Date()),
    event: 'update',
  };
  const [caseDetail, setCaseDetail] = useState(defaultCaseDetail);
  const onChange = (event) => {
    setCaseDetail({ ...caseDetail, [event.target.name]: event.target.value });
  };
  const [editable, setEditable] = useState(false);
  const setDate = ({ key, date }) => {
    setCaseDetail({ ...caseDetail, [key]: formatDate(date) });
  };

  return (
    <div className="form-container">
      <Form>
        <Form.Group as={Row} controlId="bsal">
          <Form.Label column sm="4">Basic Salary (Monthly):</Form.Label>
          <Col sm="8">
            <Form.Control value={caseDetail.bsal} name="bsal" type="text"
                          onChange={onChange}
                          disabled={!editable}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="wdays">
          <Form.Label column sm="4">No. of Working Days (Weekly):</Form.Label>
          <Col sm="8">
            <Form.Control value={caseDetail.wdays} name="wdays" type="text"
                          onChange={onChange}
                          disabled={!editable}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="awdays">
          <Form.Label column sm="4">No. of Actual Working Days:</Form.Label>
          <Col sm="8">
            <Form.Control value={caseDetail.awdays} name="awdays" type="text"
                          onChange={onChange}
                          disabled={!editable}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="cpstart">
          <Form.Label column sm="4">Start date:</Form.Label>
          <Col sm="8">
            <DatePicker
              onChange={date => setDate({ key: 'cpstart', date: date })}
              disabled={!editable}
              value={caseDetail.cpstart}
              className="form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="cpend">
          <Form.Label column sm="4">End date:</Form.Label>
          <Col sm="8">
            <DatePicker
              onChange={date => setDate({ key: 'cpend', date: date })}
              disabled={!editable}
              value={caseDetail.cpend}
              className="form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="rpay">
          <Form.Label column sm="4">Total Pay Received:</Form.Label>
          <Col sm="8">
            <Form.Control value={caseDetail.rpay} name="rpay" type="text"
                          onChange={onChange}
                          disabled={!editable}
            />
          </Col>
        </Form.Group>

      </Form>

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
            handleSendRequest={handleSendCaseRequest}
          />
        </>
      }
    </div>
  );
};

export default CaseDetailComponent;
