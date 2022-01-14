import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bulma-components';
import { EmailHelpContext } from '../EmailHelpProvider';

const getHelpButtonText = (status) => (status ? 'hide help' : 'show help');

const ToggleHelpButton = () => {
  const { viewHelp, setViewHelp } = useContext(EmailHelpContext);
  const [helpButtonText, sethelpButtonText] = useState(getHelpButtonText(viewHelp));

  const toggleViewHelp = () => setViewHelp((currentVal) => !currentVal);

  useEffect(() => {
    sethelpButtonText(getHelpButtonText(viewHelp));
  }, [viewHelp, helpButtonText]);
  return (

    <Button
      fullwidth
      color='info'
      className='tag'
      onClick={toggleViewHelp}
    >
      {helpButtonText}
    </Button>
  );
};
export default ToggleHelpButton;
