import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { GlobalStyles } from '../components/styles/GlobalStyles';
import { Schedule } from '../components/calendar/Calendar';
import { Button } from '../components/styles/Button';
import { Modal } from '../components/styles/Modal';
import { ScheduleForm } from '../components/ScheduleForm/ScheduleForm';
import { timeConvert } from '../components/Helpers/functions';
import { TIMESAVAILABLE } from '../constants/BookingConstants';

import { UserProvider } from '../store/index';
import { IBookingType } from '../types/types';

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
  width: 300px;
  background: white;
  border-radius: 5px;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  transition: width ease-in-out 200ms;
  @media (min-width: 600px) {
    flex-direction: row;
    width: ${({ open }) => open ? '600px' : '300px'};
  }
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
    margin-bottom: 1rem;
  }
  .clear {
    align-self: flex-end;
  }
  ul {
    animation: ${fadeIn} 1s ease-in;
  }
`;

const ClearBtn = styled.button`
  background: #d3b3b3;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  color: white;
  cursor: pointer;
  &:hover {
    background: #b48a8a;
  }
`;

function buildBookedDaysArr(bookings: IBookingType[]) {
  // find all dates that have all 3 times booked
  // return array of dates booked as string
  let someBooked: any = {};
  for (let i = 0; i < bookings.length; i++) {
    const booked = bookings[i];
    const bookedDate = new Date(booked.date);
    const bookedDateString = bookedDate.toDateString();
    if (Object.keys(someBooked).includes(bookedDateString)) {
      someBooked[bookedDateString].push(booked.time)
    } else {
      someBooked[bookedDateString] = [booked.time]
    }
  }
  return Object.keys(someBooked).filter((date: string) => {
    if (someBooked[date].length > 2) return date;
  })
}

function buildTimesBookedArr(bookings: IBookingType[], dateSelected: Date) {
  if (!dateSelected) return [];
  let timesArr = [];
  for (let i = 0; i < bookings.length; i++) {
    const bookDate = new Date(bookings[i].date);
    if (bookDate.toDateString() === dateSelected.toDateString()) {
      timesArr.push(bookings[i].time);
    }
  }
  return timesArr;
}

export const getServerSideProps = async () => {
  const results = await fetch('http://localhost:3000/api/bookings', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  const bookings = await results.json();
  return {
    props: {
      bookings: JSON.parse(JSON.stringify(bookings)),
      timesAvailable: TIMESAVAILABLE
    }
  }
}

interface HomeProps {
  bookings: IBookingType[]
  timesAvailable: string[]
}

const Home: NextPage<HomeProps> = ({ bookings, timesAvailable }) => {
  const [dateSelected, setDateSelected] = useState<Date | null>(null);
  const [timeSelected, setTimeSelected] = useState<Number | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const timesBooked: string[] = useMemo(() => {
    if (dateSelected) {
      return buildTimesBookedArr(bookings, dateSelected);
    }
    return [];
  }, [dateSelected, bookings]);

  const bookedDays = useMemo(() => {
    return buildBookedDaysArr(bookings)
  }, [bookings]);

  function handleTimeSelect(time: number) {
    setTimeSelected(time);
    setModalOpen(true);
  }

  return (
    <div>
      <GlobalStyles />
      <UserProvider>
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
                <ClearBtn className="clear" onClick={() => setDateSelected(null)}>clear</ClearBtn>
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
            handleCancel={() => {
              setModalOpen(false)
              setTimeSelected(null)
            }}
          />
        </Modal>
      </UserProvider>
    </div >
  )
}

export default Home
