import {
  oneOfType, string, number, bool,
} from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FaClipboard, FaClipboardCheck } from 'react-icons/fa';

const CopyToClipboardIcon = ({ className, data }) => {
  const [helpText, setHelpText] = useState('');
  const copyToClipboard = async (val) => {
    await navigator.clipboard.writeText(val);
    setHelpText('copied!');
  };
  const [_className] = useState(`mx-2 is-size-5 has-text-primary ${className || ''}`);

  // when helpText is set, set a timer to clear after 5 seconde if component is still mounted
  useEffect(() => {
    let mounted = true;
    if (helpText) setTimeout(() => {
      if (mounted) setHelpText('');
    }, 3000);

    return () => { mounted = false; };
  }, [helpText]);

  if (helpText) return (
    <>
      <FaClipboardCheck
        className={_className}
      />
      {/* <span className='has-text-primary'>{helpText}</span> */}
    </>
  );

  return (
    <FaClipboard
      className={_className}
      onClick={() => copyToClipboard(data)}
    />
  );
};

export default CopyToClipboardIcon;

CopyToClipboardIcon.propTypes = {
  className: string,
  data: oneOfType([string, number, bool]).isRequired,
};
CopyToClipboardIcon.defaultProps = {
  className: '',
};
