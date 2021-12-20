import { string } from 'prop-types';
import React from 'react';
import { Box, Form } from 'react-bulma-components';

export const EmailTemplatePreview = ({ preview }) => (
  <Box className='px-3 py-1'>
    <h1 className='is-size-5 has-text-weight-bold'>Preview</h1>
    <Form.Field>
      <Form.Control>
        <Form.Textarea
          color='primary'
          className='template-preview rounded p-2'
          value={preview}
          onChange={() => null}
        />
      </Form.Control>
    </Form.Field>
  </Box>
);
export default EmailTemplatePreview;

EmailTemplatePreview.propTypes = {
  preview: string.isRequired,
};
