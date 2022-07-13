import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from '@emotion/styled';

const CalendarWrap = styled.div`
  width: 300px;
  max-width: 300px;
`;

function setDisabledDates(date: Date, view: string, excludeDates: string[]) {
  const today = new Date();
  if (view === 'month') {
    if (date < today) {
      return true; // don't show dates today or before
    }

    const shufDate = `${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()}`;
    if (excludeDates.includes(shufDate)) {
      return true; // remove dates where all 3 times are booked
    }
    return date.getDay() === 0;
  }
  return false;
}

interface ScheduleProps {
  handleDateSelect: (d: Date) => void;
  excludeDates: string[];
}

export function Schedule({ handleDateSelect, excludeDates }: ScheduleProps) {
	const [value, onChange] = useState(new Date());

  const handleClick = (date: any) => {
    onChange(date)
    handleDateSelect(date)
  }

	return (
    <CalendarWrap>
      <Calendar
        onChange={handleClick}
        onClickDay={(d) => console.log('here too', d)}
        value={value}
        tileDisabled={({date, view}) => setDisabledDates(date, view, excludeDates)}
      />
    </CalendarWrap>
	);
}

