import React, { useContext } from 'react';
import { Button, Heading } from 'react-bulma-components';
import { EmailTemplatesContext } from '../EmailTemplatesProvider';

const EmailTemplatesButtons = () => {
  const {
    defaultTemplate,
    allTemplates, setSelectedTemplate,
    displayComponent, setDisplayComponent,
  } = useContext(EmailTemplatesContext);

  if (displayComponent !== 'default') return '';

  const loadTemplateEditor = (template) => {
    setSelectedTemplate(template);
    setDisplayComponent('EmailTemplatesEditor');
  };

  return (
    <Button.Group className='m-3'>
      <Button
        fullwidth
        color='success'
        className='mb-5'
        onClick={() => loadTemplateEditor(defaultTemplate)}
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
        .map((template) => (
          <Button
            key={template._id}
            fullwidth
            color='primary'
            onClick={() => loadTemplateEditor(template)}
          >
            {template.name}
          </Button>
        )) }
    </Button.Group>
  );
};

export default EmailTemplatesButtons;
