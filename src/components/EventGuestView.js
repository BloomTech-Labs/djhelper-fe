import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDJ } from '../actions/action';

const EventGuestView = props => {
  const [djInfo, setDjInfo] = useState(null);
  const dispatch = useDispatch();
  const { dj_id, event_id } = props.match.params;

  useEffect(() => {
    dispatch(getDJ(dj_id));
  }, []);
  return (
    <div>
      <h1>Event Page -- Guest View</h1>
    </div>
  );
};

export default EventGuestView;
