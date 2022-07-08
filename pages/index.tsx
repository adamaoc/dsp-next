import type { NextPage } from 'next'
import Head from 'next/head'
import { GlobalStyles } from '../components/styles/GlobalStyles';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Schedule } from '../components/calendar/Calendar';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Button } from '../components/styles/Button';
import { Modal } from '../components/styles/Modal';
import { ScheduleForm } from '../components/ScheduleForm/ScheduleForm';
import { timeConvert } from '../components/Helpers/functions';

const Main = styled.main`
  min-height: 100vh;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('/dt_web.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const MainTitle = styled.h1`
  line-height: 1.15;
  font-size: 4rem;
  padding-top: 2rem;
`;

interface CallBox {
  open: boolean;
}
const CalBox = styled.div<CallBox>`
  width: ${({open}) => open ? '600px' : '300px'};
  background: white;
  border-radius: 5px;
  margin: 2rem 0;
  display: flex;
  transition: width ease-in-out 200ms;
`;

const Footer = styled.footer`
  margin-top: auto;
  padding: 0.5rem;
  background: #333;
  color: #fff;
  font-size: 0.75rem;
  text-align: center;
  width: 100%;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const AppointmentSelector = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h4 {
    text-align: center;
    font-weight: 400;
    margin-bottom: 1em;
  }
  li {
    list-style: none;
  }
  .clear {
    align-self: flex-end;
  }
  ul {
    animation: ${fadeIn} 1s ease-in;
  }
`;

const booked = [
  'July 13, 22 18:00:00 GMT-0500',
  'July 13, 22 15:00:00 GMT-0500',
  'July 13, 22 10:00:00 GMT-0500',
  'July 10, 22 18:00:00 GMT-0500',
  'July 20, 22 18:00:00 GMT-0500',
  'July 8, 22 15:00:00 GMT-0500'
]

const timesAvailable = [
  '10',
  '15',
  '18'
]

function bookedTransformed(dates: String[]) {
  const months:any = [];
  for (let i = 0; i < dates.length; i++) {
    // const tempDate = new Date(dates[i]);
    // if (months.includes(tempDate.getMonth())) {
    //   // do stuff...
    // } else {
    //   months.push(tempDate.getMonth());
    // }
  }
}

export const getServerSideProps = async () => {
  const apiUrl = 'http://localhost:3000/api/bookings';
  const res = await fetch(apiUrl);
  const data = await res.json();

  return {
    props: {
      bookings: data
    }
  }
}

const Home: NextPage = ({ bookings }: any) => {
  const [dateSelected, setDateSelected] = useState<Date | null>(null);
  const [timeSelected, setTimeSelected] = useState<Number | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const timesBooked: any[] = useMemo(() => {
    let someBooked = [];
    for (let i = 0; i < booked.length; i++) {
      const tempDate = new Date(booked[i]);
      if (tempDate.toDateString() === dateSelected?.toDateString()) {
        someBooked.push(tempDate.getHours());
      }
    }
    return someBooked
  }, [dateSelected]);

  function handleTimeSelect(time: number) {
    setTimeSelected(time);
    setModalOpen(true);
  }
 
  return (
    <div>
      <GlobalStyles />
      <Head>
        <title>DSP App</title>
        <meta name="description" content="This is the DSP App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <MainTitle>
          <Image 
            src="/ds-photography-logo-black.png" 
            alt="DS Photography Logo" 
            width={80}
            height={80}
          />
        </MainTitle>
        <CalBox open={!!dateSelected}>
          <Schedule 
            handleDateSelect={setDateSelected} 
            excludeDates={booked}
          />

          {dateSelected && (
            <AppointmentSelector>
              <h4>{dateSelected.toDateString()}</h4>
              <ul>
                {timesAvailable.map((time) => {
                  return (
                    <li key={time}>
                      <Button 
                        fullWidth 
                        disabled={timesBooked.includes(Number(time))}
                        onClick={() => handleTimeSelect(Number(time))}
                      >
                        Schedule for {timeConvert(time)}
                      </Button>
                    </li>
                  )
                })}
              </ul>
              <button className="clear" onClick={() => setDateSelected(null)}>clear</button>
            </AppointmentSelector>
          )}
        </CalBox>
        <Footer>
          <p>developed with love</p>
        </Footer>
      </Main>

      <Modal open={modalOpen} close={() => setModalOpen(false)} title="Request an appointment">
        <ScheduleForm 
          dateSelected={dateSelected!}
          timeSelected={timeSelected}
          handleCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default Home
