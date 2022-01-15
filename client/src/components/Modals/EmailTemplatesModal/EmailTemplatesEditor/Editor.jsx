import React, { useContext } from 'react';
import { Button, Form } from 'react-bulma-components';
import { AppContext } from '../../../../context';
import { createModel, updateModel } from '../../../../utils';
import { EmailTemplatesContext } from '../EmailTemplatesProvider';

const Editor = () => {
  const { tutorDetails } = useContext(AppContext);
  const {
    allTemplates, setAllTemplates,
    selectedTemplate, setSelectedTemplate,
    setDisplayComponent,
    setViewHelp,
  } = useContext(EmailTemplatesContext);
  console.log(selectedTemplate);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setSelectedTemplate({ ...selectedTemplate, [name]: value });
  };

  const handleSaveTemplate = async () => {
    if (selectedTemplate._id) {
      await updateModel({ model: 'email-template', body: selectedTemplate });
      setAllTemplates({ ...allTemplates, [selectedTemplate._id]: selectedTemplate });
    } else {
      const { name, subject, body: emailBody } = selectedTemplate;

      const newTemplate = {
        name, subject, body: emailBody, authorId: tutorDetails._id,
      };

      const { _id } = await createModel({ model: 'email-template', body: newTemplate });
      setAllTemplates({ ...allTemplates, [_id]: { ...newTemplate, _id } });
    }
    setViewHelp(false);
    setDisplayComponent('default');
    setSelectedTemplate({});
  };
  return (
    <div className='px-3'>

      <Form.Field>
        <Form.Control>
          <Form.Input
            color={selectedTemplate.name ? 'success' : 'danger'}
            placeholder='enter a template name'
            name='name'
            value={selectedTemplate.name}
            onChange={handleInputChange}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Control>
          <Form.Label className='mb-0 is-size-6'>subject</Form.Label>
          <Form.Input
            color={selectedTemplate.subject ? 'success' : 'danger'}
            placeholder='enter a template name'
            name='name'
            value={selectedTemplate.subject}
            onChange={handleInputChange}
          />
        </Form.Control>
        <Form.Control>
          <Form.Label className='mb-0 is-size-6'>body</Form.Label>
          <Form.Textarea
            color={selectedTemplate.body ? 'success' : 'danger'}
            name='template'
            rows={20}
            className='template-editor rounded p-1'
            value={selectedTemplate.body}
            onChange={handleInputChange}
          />
        </Form.Control>
      </Form.Field>
      <Button
      // disabled={!selectedTemplate.name || !selectedTemplate.template}
        disabled
        fullwidth
        color='primary'
        onClick={(handleSaveTemplate)}
      >
        Save
      </Button>
    </div>

  );
};

export default Editor;
