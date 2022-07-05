import type { NextPage } from 'next'
import Head from 'next/head'
import { GlobalStyles } from '../components/styles/GlobalStyles';
import styled from '@emotion/styled';
import { Schedule } from '../components/calendar/Calendar';
import { useState } from 'react';

const Button = styled.button`
  background: cornflowerblue;
  border: 1px solid transparent;
  color: #fff;
  border-radius: 5px;
  padding: 1rem 2rem;
  cursor: pointer;
  &:hover {
    background: #1f1f1f;
    color: white;
  }
`;

const Main = styled.main`
  min-height: 100vh;
  flex: 1;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background-image: url('https://ampnet.sfo2.cdn.digitaloceanspaces.com/Denilson/cityscape/IMG_7523.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const MainTitle = styled.h1`
  line-height: 1.15;
  font-size: 4rem;
`;

const CalBox = styled.div`
  width: 300px;
  height: 400px;
  background: white;
  border-radius: 5px;
  margin: 2rem 0;
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

const Home: NextPage = () => {
  const [dateSelected, setDateSelected] = useState<any>(null);
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
          DSP
        </MainTitle>
        <CalBox>
          <Schedule handleDateSelect={setDateSelected} />
        </CalBox>
        {dateSelected && (
          <div>
            <p>{dateSelected.getDate()}</p>
            <Button>Schedule Appointment</Button>
          </div>
        )}
        <Footer>
          <p>developed with love</p>
        </Footer>
      </Main>
    </div>
  )
}

export default Home
