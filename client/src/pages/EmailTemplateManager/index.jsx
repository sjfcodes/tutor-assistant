import React, { useEffect, useState } from 'react';
import {
  Box, Button, Columns,
} from 'react-bulma-components';
import readModel from '../../utils/api/modelCRUD/read';
import formatEmailTemplates from '../../utils/helpers/emailTemplates';
import './style.css';
import {
  HowItWorks, EmailTemplateSelector,
  EmailTemplateEditor, defaultEmailTemplate,
} from '../../components';

const EmailTemplateManager = () => {
  const [templates, setTemplates] = useState({});
  const [selected, setSelected] = useState({});
  const [displayEditor, setDisplayEditor] = useState(false);

  const handledisplayEditor = () => {
    setDisplayEditor(true);
    setSelected({ ...defaultEmailTemplate });
  };

  useEffect(() => {
    let isMounted = true;
    const getTutorsEmailTemplates = async () => {
      try {
        const templateArr = await readModel('email-template');
        if (!isMounted) return;
        setTemplates(formatEmailTemplates(templateArr));
      } catch (error) {
        console.warn(error);
      }
    };
    getTutorsEmailTemplates();

    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <Box className='background-dark-blurred p-3'>
      <Columns>
        <Columns.Column className='pb-0'>
          <EmailTemplateSelector
            className='p-1'
            selected={selected}
            setSelected={setSelected}
            setDisplayEditor={setDisplayEditor}
            templates={templates}
          />
          <HowItWorks />
        </Columns.Column>

        {
          !displayEditor
            ? (
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
            : (
              <Columns.Column className='pt-0'>
                <EmailTemplateEditor
                  selected={selected}
                  setSelected={setSelected}
                  setTemplates={setTemplates}
                />
              </Columns.Column>
            )
        }
      </Columns>
    </Box>
  );
};
export default EmailTemplateManager;
