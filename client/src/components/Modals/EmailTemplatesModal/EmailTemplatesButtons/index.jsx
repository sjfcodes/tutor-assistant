import { Button, Heading } from 'react-bulma-components';
import React, { useContext } from 'react';
import { EmailTemplatesContext, NEW_TEMPLATE_FORM } from '../EmailTemplatesProvider';
import { loadTemplateEditorApp } from '../../../../utils';

const EmailTemplatesButtons = () => {
  const {
    allTemplates,
    displayComponent,
    setDisplayComponent,
  } = useContext(EmailTemplatesContext);

  if (displayComponent !== 'default') return '';

  return (
    <Button.Group className='m-3'>
      <Button
        fullwidth
        color='success'
        className='mb-5'
        // onClick={() => loadTemplateEditor(defaultTemplate)}
        onClick={() => setDisplayComponent(NEW_TEMPLATE_FORM)}
      >
        create new template
      </Button>
      <Heading
        size={4}
        className='mb-3'
      >
        Saved templates

      </Heading>
      {Object
        .values(allTemplates)
        .map(({ _id, name }) => (
          <Button
            key={_id}
            fullwidth
            color='primary'
            onClick={() => loadTemplateEditorApp(_id)}
          >
            {name}
          </Button>
        )) }
    </Button.Group>
  );
};

export default EmailTemplatesButtons;
