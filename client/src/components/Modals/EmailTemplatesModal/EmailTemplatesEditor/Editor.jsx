import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bulma-components';
import { AppContext } from '../../../../context';
import {
  createModel, deleteModel, getTextareaRows, updateModel,
} from '../../../../utils';
import { EmailTemplatesContext } from '../EmailTemplatesProvider';

const Editor = () => {
  const { tutorDetails } = useContext(AppContext);
  const {
    allTemplates, setAllTemplates,
    selectedTemplate, setSelectedTemplate,
    setDisplayComponent,
    setViewHelp,
  } = useContext(EmailTemplatesContext);
  const [disableSaveBtn, setDisableSaveBtn] = useState(false);
  const [rows, setRows] = useState(getTextareaRows(selectedTemplate.body));

  const resetEditor = () => {
    setViewHelp(false);
    setDisplayComponent('default');
    setSelectedTemplate({});
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setSelectedTemplate({ ...selectedTemplate, [name]: value });
  };

  const handleCreateTemplate = async () => {
    const body = { ...selectedTemplate, authorId: tutorDetails._id };
    const { _id } = await createModel({ model: 'email-template', body });
    setAllTemplates({ ...allTemplates, [_id]: { ...body, _id } });
    resetEditor();
  };

  const handleUpdateTemplate = async () => {
    if (!selectedTemplate._id) return;
    await updateModel({ model: 'email-template', body: selectedTemplate });
    setAllTemplates({ ...allTemplates, [selectedTemplate._id]: selectedTemplate });
    resetEditor();
  };

  const handleDeleteTemplate = async () => {
    if (!selectedTemplate._id) return;
    await deleteModel({ model: 'email-template', _id: selectedTemplate._id });
    const copy = { ...allTemplates };
    delete copy[selectedTemplate._id];
    setAllTemplates(copy);
    resetEditor();
  };

  useEffect(() => {
    if (
      !selectedTemplate.name
      || !selectedTemplate.subject
      || !selectedTemplate.body
    ) return setDisableSaveBtn(true);
    return setDisableSaveBtn(false);
  }, [selectedTemplate]);

  useEffect(() => {
    setRows(getTextareaRows(selectedTemplate.body));
  }, [selectedTemplate.body]);

  const getControlButtons = () => (
    selectedTemplate._id
      ? (
        <>
          <Button
            disabled={disableSaveBtn}
            fullwidth
            color='primary'
            onClick={(handleUpdateTemplate)}
          >
            Save Changes
          </Button>
          <hr />
          <Form.Field>
            <Form.Label
              textColor='danger'
              className=''
            >
              Danger Zone
            </Form.Label>
            <Button
              fullwidth
              color='danger'
              className='tag'
              onClick={handleDeleteTemplate}
            >
              Delete this template
            </Button>
          </Form.Field>
        </>
      )
      : (
        <Button
          disabled={disableSaveBtn}
          fullwidth
          color='primary'
          onClick={(handleCreateTemplate)}
        >
          Save New Template
        </Button>
      )
  );

  return (
    <div className='px-3'>

      <Form.Field>
        <Form.Control>
          <Form.Label className='mb-0 is-size-6'>template name</Form.Label>
          <Form.Input
            color={selectedTemplate.name ? 'success' : 'danger'}
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
            name='subject'
            value={selectedTemplate.subject}
            onChange={handleInputChange}
          />
        </Form.Control>
        <Form.Control>
          <Form.Label className='mb-0 is-size-6'>body</Form.Label>
          <Form.Textarea
            color={selectedTemplate.body ? 'success' : 'danger'}
            name='body'
            rows={rows}
            className='template-editor rounded p-1'
            value={selectedTemplate.body}
            onChange={handleInputChange}
          />
        </Form.Control>
      </Form.Field>

      {getControlButtons()}
    </div>

  );
};

export default Editor;
