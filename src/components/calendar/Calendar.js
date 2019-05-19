import React, { useState, useEffect } from 'react';
import moment from 'moment';
import CalendarHeader from './CalendarHeader.js';
import CalendarBody from './CalendarBody.js';
import 'moment/locale/pl';

const CalendarContaier = () => {
  moment.locale('pl');
  const [days, setDays] = useState([]);
  const [weekNumber, setWeekNumber] = useState(moment().week());
  const nextWeek = () => {
    setWeekNumber(weekNumber + 1);
  };
  const previousWeek = () => {
    setWeekNumber(weekNumber - 1);
  };
  const [active, setActive] = useState(days[0]);
  const setWeek = () => {
    const days = [];
    const dateEnd = moment()
      .week(weekNumber)
      .endOf('isoWeek');
    const dateStart = moment()
      .week(weekNumber)
      .startOf('isoWeek');
    let day = dateStart;
    while (day <= dateEnd) {
      days.push(day.toDate());
      day = day.clone().add(1, 'd');
    }
    setActive(moment().week() === weekNumber ? moment() : days[0]);
    return days;
  };

  useEffect(() => {
    const result = setWeek();
    setDays(result);
  }, [weekNumber]);

  const changeCurrentActive = day => {
    setActive(days[day]);
  };
  return (
    <>
      <CalendarHeader days={days} active={active} setActive={changeCurrentActive} setNextWeek={nextWeek} setPreviousWeek={previousWeek} />
      <CalendarBody currentDate={active} />
    </>
  );
};

export default CalendarContaier;
