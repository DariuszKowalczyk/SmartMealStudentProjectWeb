import React, { Component } from 'react';
import moment from 'moment';

const useCalendar = () => {
  const days = [];
  let day = startOfWeek;
  const startOfWeek = moment().startOf('isoWeek');
  const endOfWeek = moment().endOf('isoWeek');
  while (day <= endOfWeek) {
    days.push(day.toDate());
    day = day.clone().add(1, 'd');
  }
};
