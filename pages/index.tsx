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
import { BookingType } from '../types/types';

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

export const getServerSideProps = async () => {
  const apiUrl = 'http://localhost:3000/api/bookings';
  const res = await fetch(apiUrl);
  const data = await res.json();

  return {
    props: {
      bookings: data.bookings as BookingType,
      timesAvailable: data.timesAvailable
    }
  }
}

interface HomeProps {
  bookings: BookingType[]
  timesAvailable: string[]
}

const Home: NextPage<HomeProps> = ({ bookings, timesAvailable }) => {
  const [dateSelected, setDateSelected] = useState<Date | null>(null);
  const [timeSelected, setTimeSelected] = useState<Number | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const timesBooked: string[] = useMemo(() => {
    if (!dateSelected) return [];
    let timesArr = [];
    const sDateF = `${(dateSelected.getMonth() + 1)}/${dateSelected.getDate()}/${dateSelected.getFullYear()}`;
    for (let i = 0; i < bookings.length; i++) {
      if (bookings[i].date === sDateF) {
        timesArr.push(bookings[i].time);
      }
    }
    return timesArr;
  }, [dateSelected]);

  const bookedDays = useMemo(() => {
    let someBooked: any = {};
    for (let i = 0; i < bookings.length; i++) {
      if ( Object.keys(someBooked).includes(bookings[i].date) ) {
        someBooked[bookings[i].date].push(bookings[i].time)
      } else {
        someBooked[bookings[i].date] = [bookings[i].time]
      }
    }

    return Object.keys(someBooked).filter((date: string) => {
      if (someBooked[date].length > 2) return date;
    })
  }, [bookings]);

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
            excludeDates={bookedDays}
          />

          {dateSelected && (
            <AppointmentSelector>
              <h4>{dateSelected.toDateString()}</h4>
              <ul>
                {timesAvailable.map((time: string) => {
                  return (
                    <li key={time}>
                      <Button 
                        fullWidth 
                        disabled={timesBooked.includes(time)}
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
