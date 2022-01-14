import React, { useContext, useEffect, useState } from 'react';
import { Button, Heading, Modal } from 'react-bulma-components';
import { v4 as uuidv4 } from 'uuid';
import { EmailHelpContext } from '../EmailHelpProvider';
import HowDoesThisWork from '../HowDoesThisWork';
import ToggleHelpButton from '../ToggleHelpButton';

const EmailTemplatesCard = () => {
  const { viewHelp } = useContext(EmailHelpContext);
  const [component, setComponent] = useState('');

  useEffect(() => {
    if (!viewHelp) return setComponent(
      <>
        <Button
          fullwidth
          color='info'
        >
          template-1
        </Button>
        <Button
          fullwidth
          color='info'
        >
          template-2
        </Button>
      </>,
    );
    return setComponent(
      <HowDoesThisWork
        key={uuidv4()}
      />,
    );
  }, [viewHelp]);

  return (
    <Modal.Card>
      <Modal.Card.Header
        flexDirection='column'
        alignItems='start'
        className='background-clear mx-2 pb-0'
        showClose={false}
      >
        <Heading textColor='grey-lighter'>
          Email Templates
        </Heading>

        <ToggleHelpButton />

      </Modal.Card.Header>
      <Modal.Card.Body className='rounded-top p-1 mt-5'>
        {component}

      </Modal.Card.Body>
    </Modal.Card>

  );
};
export default EmailTemplatesCard;
