import { string } from 'prop-types';
import React, { useState } from 'react';
import { Button, Form } from 'react-bulma-components';
import sendEmailtoStudent from '../../../../../utils/api/sendGrid';

const SendTestEmailButton = ({
  className, studentEmail, subject, text, html,
}) => {
  const [buttonText, setButtonText] = useState('send test email to my inbox');
  const [loading, setLoading] = useState(false);

  const sendTestEmail = async () => {
    setLoading(true);

    try {
      const body = {
        studentEmail,
        subject,
        text,
        html,
      };
      await sendEmailtoStudent({ body });
      setButtonText('Sent! (check spam if not in inbox)');
    } catch (error) {
      setButtonText('something went wrong, please try again');
    }
    setLoading(false);
  };

  return (
    <Form.Field className={className}>
      <Form.Control>
        <Button
          fullwidth
          loading={loading}
          color='info'
          className='tag'
          textSize={6}
          onClick={sendTestEmail}
        >
          {buttonText}
        </Button>
      </Form.Control>
    </Form.Field>
  );
};

export default SendTestEmailButton;

SendTestEmailButton.propTypes = {
  className: string,
  studentEmail: string.isRequired,
  subject: string.isRequired,
  text: string.isRequired,
  html: string.isRequired,
};

SendTestEmailButton.defaultProps = {
  className: '',
};
