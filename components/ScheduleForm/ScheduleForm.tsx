import styled from '@emotion/styled'
import { useMemo, useState } from 'react';
import { timeConvert } from '../Helpers/functions';
import { Button } from '../styles/Button';

const FormWrap = styled.div`
  background: #eee;
  padding: 1rem;
`;

const Date = styled.div`
  background: white;
  padding: 1rem;
  margin: 1rem auto;
  box-shadow: 1px 1px 3px #e1e1e1;
`;

interface ScheduleFormProps {
  dateSelected: Date | null;
  timeSelected: Number | null;
  handleCancel: () => void;
}

export const ScheduleForm = ({
  dateSelected,
  timeSelected,
  handleCancel
}: ScheduleFormProps) => {
  const [name, setName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [payment, setPayment] = useState<string | undefined>();
  
  const errors = useMemo(() => {
    if (email && name && payment) {
      return false;
    }
    return true;
  }, [email, name, payment]);

  function cancelForm() {
    setName(undefined)
    setEmail(undefined)
    setPayment(undefined)
    handleCancel()
  }

  return (
    <FormWrap>
      <p>Please confirm that you would like to request the following appointment:</p>
      <Date>
        <>
          {dateSelected?.toDateString()} at {timeConvert(String(timeSelected))}
        </>
      </Date>
      <h4>Registration:</h4>
      <p>Please enter your name, your email address and choose a password to get started.</p>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <h4>Payment Options:</h4>
        <select value={payment} onChange={(e) => setPayment(e.target.value)}>
          <option value={undefined}>Select Option</option>
          <option value="cash">Pay Cash - On Site</option>
          <option value="online">Online Downpayment</option>
          <option value="paypal">PayPal Downpayment</option>
        </select>
      </div>
      <div>
        <Button disabled={errors}>Request Appointment</Button>
        <Button secondary onClick={cancelForm}>Cancel</Button>
      </div>
    </FormWrap>
  )
}
