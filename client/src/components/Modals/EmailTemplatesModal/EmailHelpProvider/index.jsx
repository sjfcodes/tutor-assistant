import React, { createContext, useMemo, useState } from 'react';

export const EmailHelpContext = createContext();

// eslint-disable-next-line react/prop-types
const EmailHelpProvider = ({ children }) => {
  const [viewHelp, setViewHelp] = useState(false);
  const helpContext = useMemo(() => ({
    viewHelp, setViewHelp,
  }), [viewHelp]);
  return (
    <EmailHelpContext.Provider value={helpContext}>
      {children}
    </EmailHelpContext.Provider>
  );
};

export default EmailHelpProvider;
