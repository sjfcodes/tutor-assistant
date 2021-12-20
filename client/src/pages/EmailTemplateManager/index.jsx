import React, { useEffect, useState } from 'react';
import {
  Box, Button, Columns,
} from 'react-bulma-components';
import readModel from '../../utils/api/modelCRUD/read';
import formatEmailTemplates from '../../utils/helpers/emailTemplates';
import './style.css';
import {
  HowItWorks, EmailTemplateSelector,
  EmailTemplateEditor,
} from '../../components';
import { EmailTemplatePreview } from '../../components/EmailTemplateManager';

export const defaultEmailTemplate = {
  name: '',
  template: 'Hi [tutor-firstName]!\n\nCheck out "How it works" for more info.',
};

const EmailTemplateManager = () => {
  const [displayEditor, setDisplayEditor] = useState(false);
  const [allTemplates, setAllTemplates] = useState({});
  const [selected, setSelected] = useState({});
  const [viewHelp, setViewHelp] = useState(true);
  const [helpMessage, setHelpMessage] = useState('');
  const [preview, setPreview] = useState('');

  const handledisplayEditor = () => {
    setSelected({ ...defaultEmailTemplate });
    setViewHelp(false);
    setHelpMessage('');
    setDisplayEditor(true);
  };

  useEffect(() => {
    let isMounted = true;
    const getTutorsEmailTemplates = async () => {
      try {
        const templateArr = await readModel('email-template');
        if (!isMounted) return;
        setAllTemplates(formatEmailTemplates(templateArr));
      } catch (error) {
        console.warn(error);
      }
    };
    getTutorsEmailTemplates();

    return () => { isMounted = false; };
  }, []);

  // useEffect(() => {
  //   console.log(allTemplates);
  // }, [allTemplates]);

  return (
    <Box className='background-dark-blurred p-3 '>
      <Columns>
        <Columns.Column className='pb-0' size={12}>
          <EmailTemplateSelector
            className='p-1'
            helpMessage={helpMessage}
            selected={selected}
            setSelected={setSelected}
            setDisplayEditor={setDisplayEditor}
            allTemplates={allTemplates}
          />
        </Columns.Column>
        {
          displayEditor
          && (
            <Columns.Column className='pb-0' size={12}>
              <EmailTemplatePreview preview={preview} />
            </Columns.Column>
          )
        }

        <Columns.Column className='pb-0' size={12}>
          <HowItWorks
            viewHelp={viewHelp}
            setViewHelp={setViewHelp}
          />
        </Columns.Column>

        {
          !displayEditor
          && (
            <Columns.Column size={12}>
              <Button
                fullwidth
                color='primary'
                className=''
                onClick={handledisplayEditor}
              >
                create new template
              </Button>
            </Columns.Column>
          )
        }

        {
          displayEditor
          && (
            <Columns.Column className='' size={12}>
              <EmailTemplateEditor
                selected={selected}
                setPreview={setPreview}
                setViewHelp={setViewHelp}
                setHelpMessage={setHelpMessage}
                setSelected={setSelected}
                allTemplates={allTemplates}
                setAllTemplates={setAllTemplates}
                setDisplayEditor={setDisplayEditor}
              />
            </Columns.Column>
          )
        }
      </Columns>
    </Box>
  );
};
export default EmailTemplateManager;
