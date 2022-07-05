import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export function Schedule() {
	const [value, onChange] = useState(new Date());

  const handleClick = (one: any) => {
    console.log(one);
    onChange(one)
  }

	return (
    <Calendar
      onChange={handleClick}
      value={value}
    />
	);
}

