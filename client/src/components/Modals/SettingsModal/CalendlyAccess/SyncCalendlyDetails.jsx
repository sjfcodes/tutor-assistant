import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bulma-components';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_COURSE_DETAIL } from '../../../../store/courses/actions';
import { passwordIsValid } from '../../../../utils';
import { syncCalendlyResource } from '../../../../utils/api';

export const SyncCalendlyDetails = ({ courseId, password }) => {
  const { allCourses } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const { calendly: { accessToken } } = allCourses[courseId];

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [buttonText, setButtonText] = useState('sync');

  useEffect(() => {
    if (!passwordIsValid(password) || !accessToken) return setDisabled(true);
    return setDisabled(false);
  }, [password, accessToken]);

  const syncWithCalendly = async (e) => {
    e.preventDefault();
    if (!accessToken) return;

    setLoading(true);
    let data;

    try {
      data = await syncCalendlyResource({ body: { password, courseId } });
    } catch ({ message }) {
      setButtonText(message);
    }

    if (accessToken && data) {
      setButtonText('success!');
      dispatch({
        type: UPDATE_COURSE_DETAIL,
        payload: { calendly: { accessToken, data } },
      });
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  return (
    <form onSubmit={syncWithCalendly}>
      <Form.Field>
        <Form.Control>
          <Button
            fullwidth
            color='primary'
            loading={loading}
            disabled={disabled}
          >
            {buttonText}
          </Button>
        </Form.Control>
      </Form.Field>
    </form>
  );
};
export default SyncCalendlyDetails;

SyncCalendlyDetails.propTypes = {
  courseId: string.isRequired,
  password: string.isRequired,
};
