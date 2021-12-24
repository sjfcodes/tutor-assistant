import { string } from 'prop-types';
import React, { useState, useContext } from 'react';
import { Button, Form } from 'react-bulma-components';
import { AppContext } from '../../../../context/AppProvider';
import { syncCalendlyResource } from '../../../../utils/api';

export const SyncCalendlyDetails = ({ password }) => {
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('sync');

  const { tutorDetails, setTutorDetails } = useContext(AppContext);

  const syncWithCalendly = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { resource } = await syncCalendlyResource({ password });
      setTutorDetails({ ...tutorDetails, resource: { calendly: resource } });
      setButtonText('success!');
      setLoading(false);
    } catch (error) {
      console.error(error);
      setButtonText('must add a token first');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={syncWithCalendly}>
      <Form.Field>
        <Form.Control>
          <Button
            fullwidth
            color='primary'
            loading={loading}
            disabled={password?.length < 8}
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
  password: string.isRequired,
};
