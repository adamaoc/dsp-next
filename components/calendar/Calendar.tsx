import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export function Schedule({ handleDateSelect }: any) {
	const [value, onChange] = useState(new Date());

  const handleClick = (date: any) => {
    console.log('day: ', date.getDate());
    onChange(date)
    handleDateSelect(date)
  }

	return (
    <Calendar
      onChange={handleClick}
      value={value}
    />
	);
}

