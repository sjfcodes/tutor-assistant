import { func, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Box, Level } from 'react-bulma-components';
import { getCurrentUnix } from '../../utils';
import { getUnixFromISO } from '../../utils/helpers/dateTime';
import { LevelSide } from '../BulmaHelpers';
import DropDownIcon from '../DropDownIcon';

import './style.css';

const MEETING_PAST = 'meeting-past';
const MEETING_PRESENT = 'meeting-present';
const MEETING_FUTURE = 'meeting-future';

const getScheduleStatus = ({ currentTime, start, end }) => {
  if (currentTime > end) return MEETING_PAST;
  if (currentTime >= start && currentTime < end) return MEETING_PRESENT;
  if (currentTime < start) return MEETING_FUTURE;
  return null;
};

const ListItemContainer = ({
  // eslint-disable-next-line react/prop-types
  children, itemId, selectedItemId, toggleViewItem, listItemDetails,
  meetingStartTime, meetingEndTime,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState(() => {
    const currentTime = getCurrentUnix();
    const start = getUnixFromISO(meetingStartTime);
    const end = getUnixFromISO(meetingEndTime);

    return {
      className: getScheduleStatus({ currentTime, start, end }),
      currentTime,
      start,
      end,
    };
  });

  // setup a timer to run schedule update when current meeting ends or next meeting starts

  useEffect(() => {
    // determine when to run next check,
    let seconds = 10;
    // if currenly in a meeting, update when meeting ends
    if (status.className === MEETING_PRESENT) seconds = status.end - status.currentTime;
    // if not in a meeting & there is a future meeting, update when next meeting starts
    // how to check if theres a future meeting?
    const timer = setTimeout(() => {
      console.log(status.className);
    }, seconds * 1000);
    return () => clearTimeout(timer);
  }, [status]);

  return (
    <Box
      className={`border rounded px-0 py-0 mb-3
      ${selectedItemId !== itemId && 'hover-large-item'} `}
    >
      <Level
        renderAs='div'
        breakpoint='mobile'
        className={`py-1 ${selectedItemId === itemId && 'border-bottom pb-1 mb-0'} ${status.className}`}
        onClick={toggleViewItem}
      >
        <LevelSide>
          {children}
        </LevelSide>
        <Level.Side>
          <DropDownIcon active={(selectedItemId === itemId)} />
        </Level.Side>
      </Level>
      {selectedItemId === itemId ? listItemDetails : null}
    </Box>

  );
};

export default ListItemContainer;
ListItemContainer.propTypes = {
  itemId: string.isRequired,
  selectedItemId: string.isRequired,
  toggleViewItem: func.isRequired,
  meetingStartTime: string.isRequired,
  meetingEndTime: string.isRequired,
};
