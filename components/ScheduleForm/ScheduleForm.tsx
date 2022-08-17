import styled from '@emotion/styled'
import { useMemo, useState } from 'react';
import { timeConvert } from '../Helpers/functions';
import { Button } from '../styles/Button';

const FormWrap = styled.div`
  background: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 6.5rem);
  overflow-y: auto;
  section {
    height: auto;
  }
  p {
    margin: 0.25rem 0 1rem 0;
  }
  div {
    margin: 1rem 0;
  }
  label {
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
    display: block;
  }
  input[type="text"],
  input[type="email"] {
    border: none;
    width: 100%;
    border-bottom: 1px solid #c4c4c4;
    height: 39px;
    background: #efefef;
  }
  select {
    width: 100%;
    height: 2rem;
  }
  h4 {
    margin-bottom: 1rem;
  }
  @media (min-width: 600px) {
    height: auto;
    max-height: calc(80vh - 5.5rem);
    section {
      height: auto;
    }
  }
`;

const Footer = styled.footer`
  margin-top: auto;
  display: flex;
  justify-content: space-around;
  padding: 0.5rem 0;
`;

const Date = styled.div`
  background: #d2fdff;
  padding: 1rem;
  margin: 1rem auto;
  box-shadow: 1px 1px 3px #e1e1e1;
  text-align: center;
  font-weight: bold;
`;

const LoadingCover = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
  &:after {
    content: "Requesting...";
    color: #444;
  }
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
  const [loading, setLoading] = useState<boolean>(false);

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

  async function requestApp() {
    setLoading(true);
    const resp = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        bookedDate: dateSelected,
        bookedTime: timeSelected?.toString(),
        paymentType: payment,
        paymentAmount: 0
      })
    })

    const booked = await resp.json();
    // debugger;
    console.log({ booked })
    if (resp.status === 200) {
      // close modal and confirm booked
      setLoading(false);
      cancelForm();
      // this isn't closing the modal and we're not refetching booked //
    } else {
      // return error // havent seen this work.. need to test
      console.error({ booked });
    }
  }

  return (
    <>
      <FormWrap>
        <section>
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
            <input type="text" defaultValue={name} placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>email</label>
            <input type="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
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
        </section>
      </FormWrap>
      <Footer>
        <Button disabled={errors} onClick={() => requestApp()}>Request Appointment</Button>
        <Button secondary onClick={cancelForm}>Cancel</Button>
      </Footer>
      {loading && <LoadingCover />}
    </>
  )
}
