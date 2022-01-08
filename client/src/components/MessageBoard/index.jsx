import React, { useContext, useEffect, useState } from 'react';
import { Box } from 'react-bulma-components';
import { AppContext } from '../../context';
import { getClientTimeZone, getISO8601TimeStamp } from '../../utils';
import { MeetingDateFull, TimeZoneAbbreviation } from '../DateTime';

const getPartOfDay = (iso8601) => {
  if (!iso8601) return '~';
  const h = new Date(iso8601).getHours();
  if (h >= 5 && h < 12) return 'morning';
  if (h >= 12 && h < 17) return 'afternoon';
  if (h >= 17 && h < 22) return 'evening';
  if (h >= 22 || h < 5) return 'job today. Get some rest';
  return 'day';
};

const MessageBoard = () => {
  const [date, setDate] = useState(getISO8601TimeStamp());
  const [partOfDay, setPartOfDay] = useState(getPartOfDay(date));

  const { tutorDetails: { firstName, timeZoneName } } = useContext(AppContext);

  useEffect(() => {
    let isMounted = true;
    setTimeout(() => {
      if (!isMounted) return;
      const d = getISO8601TimeStamp();
      setDate(d);
      setPartOfDay(getPartOfDay(d));
    }, 1000);
    return () => { isMounted = false; };
  }, [date]);
  return (
    <Box className='p-3'>
      <p className='pb-2 border-bottom has-text-centered'>
        <MeetingDateFull iso8601={date} />
        {' '}
        <TimeZoneAbbreviation
          timeZoneName={timeZoneName || getClientTimeZone()}
          className='is-size-7 has-text-grey'
        />
      </p>
      <p className='pt-3 has-text-centered'>{`Good ${partOfDay}, ${firstName}.`}</p>
    </Box>

  );
};
export default MessageBoard;
