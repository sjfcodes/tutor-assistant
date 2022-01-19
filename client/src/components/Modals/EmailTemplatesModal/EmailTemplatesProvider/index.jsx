import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { formatEmailTemplates, readModel } from '../../../../utils';

export const EmailTemplatesContext = createContext();

const defaultTemplate = {
  name: '',
  subject: 'Welcome, [student-firstName]!',
  body: 'Hi [tutor-firstName]!\n\nClick "Show Help" for more info.',
};

// eslint-disable-next-line react/prop-types
const EmailTemplatesProvider = ({ children }) => {
  const [viewHelp, setViewHelp] = useState(false);
  const [allTemplates, setAllTemplates] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [displayComponent, setDisplayComponent] = useState('default');

  const helpContext = useMemo(() => ({
    defaultTemplate,
    viewHelp,
    setViewHelp,
    allTemplates,
    setAllTemplates,
    selectedTemplate,
    setSelectedTemplate,
    displayComponent,
    setDisplayComponent,
  }), [viewHelp, allTemplates, selectedTemplate, displayComponent]);

  useEffect(() => {
    let isMounted = true;

    const getTutorsEmailTemplates = async () => {
      const templateArr = await readModel({ model: 'email-template' });
      if (!isMounted) return;
      setAllTemplates(formatEmailTemplates(templateArr));
    };

    getTutorsEmailTemplates();

    return () => { isMounted = false; };
  }, []);

  // useEffect(() => {
  //   console.log(allTemplates);
  // }, [allTemplates]);

  // useEffect(() => {
  //   console.log(displayComponent);
  // }, [displayComponent]);

  return (
    <EmailTemplatesContext.Provider value={helpContext}>
      {children}
    </EmailTemplatesContext.Provider>
  );
};

export default EmailTemplatesProvider;
