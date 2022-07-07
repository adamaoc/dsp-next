import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from '@emotion/styled';

const CalendarWrap = styled.div`
  width: 300px;
  max-width: 300px;
`;

function setDisabledDates(date: Date, view: String, excludeDates: String[]) {
  // let bookedDates = []
  // for (let i = 0; i < excludeDates.length; i++) {
  //   const tempDate = new Date(excludeDates[i]);
  //   if (tempDate.toDateString() === date.toDateString()) {
  //     // someBooked.push(tempDate.getHours());
  //     debugger;
  //   }
  // }
  const today = new Date();
  if (view === 'month') {
    if (date < today) {
      return true;
    }
    return date.getDay() === 0;
  }
  return false;
}

interface ScheduleProps {
  handleDateSelect: (d: Date) => void;
  excludeDates: String[];
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

