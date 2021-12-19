/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Button, Columns, Content, Form, Icon, Level,
} from 'react-bulma-components';
import { AppContext } from '../../context';
import readModel from '../../utils/api/modelCRUD/read';
import formatEmailTemplates from '../../utils/helpers/emailTemplates';
import './style.css';
import TemplateSelector from '../../components/EmailTemplateManager/TemplateSelector';

const defaultLayout = {
  _id: null,
  name: 'new-template',
  template: 'Hi [tutor-firstName]',
};

const demoStudent = {
  firstName: 'Sam',
  lastName: 'fox',
  email: 'sam@email.com',
  meetingLink: 'https://zoom.us/',
  githubUsername: 'samuelfox1',
};

const EmailTemplateManager = () => {
  const [templates, setTemplates] = useState({});
  const [selected, setSelected] = useState(defaultLayout);
  const [preview, setPreview] = useState('');
  const [viewHelp, setViewHelp] = useState(true);

  const handleSelectChange = ({ target }) => {
    if (target.value === 'select') return setSelected(defaultLayout);
    console.log(templates[target.value]);
    return setSelected(templates[target.value]);
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setSelected({ ...selected, [name]: value });
  };

  const handleStartNewTemplate = () => {
    setSelected({ ...defaultLayout, _id: '1' });
  };

  const handleSaveTemplate = () => {
    console.log('clicked');
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
    if (!selected) return;

    const buildTemplatePreview = (template) => {
      let updatedTemplate = template;
      Object.entries(demoStudent).forEach(([key, value]) => {
        updatedTemplate = updatedTemplate.replace(`[${key}]`, value);
      });
      return updatedTemplate;
    };

    setPreview(buildTemplatePreview(selected.template, selected.values));
  }, [selected]);

  const { tutorDetails: { githubUsername } } = useContext(AppContext);
  return (
    <Box className='background-dark-blurred p-3'>
      <Columns>
        <Columns.Column className='pb-0'>

          <Box className='mb-1 p-3'>
            <Level renderAs='div' className='is-mobile'>
              <Level.Side>
                <Link to={`/${githubUsername}`} className='mt-0 pl-0'>
                  <Icon className='fas fa-chevron-left is-small' />
                  home
                </Link>
              </Level.Side>
              <Level.Side>
                <Level.Item>
                  <TemplateSelector
                    className='p-1'
                    selected={selected}
                    templates={templates}
                    handleSelectChange={handleSelectChange}
                  />
                </Level.Item>
              </Level.Side>
            </Level>
          </Box>

          <Box className='mb-1 px-3 py-1'>
            <Level
              renderAs='div'
              className='is-mobile px-0 mb-0'
              onClick={() => setViewHelp((current) => !current)}
            >
              <Level.Side>
                <Level.Item className=''>
                  <h1 className='is-size-5 has-text-weight-bold'>How it works</h1>
                </Level.Item>
              </Level.Side>

              <Level.Side>
                <Level.Item>
                  <p>{viewHelp ? 'hide' : 'show'}</p>
                  <Icon className=''>
                    <i
                      className={`fas fa-chevron-${viewHelp ? 'up' : 'down'}`}
                    />
                  </Icon>
                </Level.Item>
              </Level.Side>
            </Level>

            {viewHelp && (
              <Content>
                <blockquote className='is-size-7 py-1 rounded border has-text-centered'>
                  <p className='mb-0'>
                    A template can be used for
                    {' '}
                    <span className='has-text-weight-bold'>all</span>
                    {' '}
                    students.
                  </p>
                  <p className='mb-2'>Use the available placeholder keywords to to represent student information.</p>
                  <Columns centered className='is-mobile has-text-left'>
                    <Columns.Column narrow>
                      <p className='mb-0'>Available student keywords are:</p>
                      <p className='ml-4 mb-0'>[student-firstName]</p>
                      <p className='ml-4 mb-0'>[student-lastName]</p>
                      <p className='ml-4 mb-0'>[student-meetingLink]</p>
                      <p className='ml-4 mb-2'>[student-githubUsername]</p>
                    </Columns.Column>
                    <Columns.Column narrow>
                      <p className='mb-0'>Available tutor keywords are:</p>
                      <p className='ml-4 mb-0'>[tutor-firstName]</p>
                      <p className='ml-4 mb-0'>[tutor-lastName]</p>
                      <p className='ml-4 mb-0'>[tutor-calendlyLink]</p>
                      <p className='ml-4 mb-0'>[tutor-githubUsername]</p>
                      <p className='ml-4 mb-2'>[tutor-email]</p>
                    </Columns.Column>
                  </Columns>
                </blockquote>
              </Content>
            )}
          </Box>
        </Columns.Column>

        {
          !selected._id
            ? (
              <Columns.Column size={12}>
                <Button
                  fullwidth
                  color='primary'
                  className=''
                  onClick={handleStartNewTemplate}
                >
                  create new template
                </Button>
              </Columns.Column>
            )
            : (
              <Columns.Column className='pt-0'>
                <Box className='mb-1 py-1'>
                  <h1 className='is-size-5 has-text-centered has-text-weight-bold'>Editor</h1>

                  <form>
                    <Form.Field>
                      <Form.Label className='mb-0'>name</Form.Label>
                      <Form.Control>
                        <Form.Input
                          name='name'
                          value={selected.name}
                          onChange={handleInputChange}
                        />
                      </Form.Control>
                    </Form.Field>

                    <Form.Field>
                      <Form.Label className='my-0'>template</Form.Label>
                      <Form.Control>
                        <textarea
                          name='template'
                          className='template-editor rounded p-2'
                          value={selected.template}
                          onChange={handleInputChange}
                        />
                      </Form.Control>
                    </Form.Field>
                  </form>
                </Box>
                <Box className='mb-1 pt-1'>
                  <h1 className='is-size-5 has-text-centered has-text-weight-bold'>Preview</h1>
                  <textarea
                    className='template-preview rounded p-2'
                    value={preview}
                    onChange={() => null}
                  />
                  <Button
                    fullwidth
                    color='primary'
                    className='mt-5'
                    onClick={handleSaveTemplate}
                  >
                    Save
                  </Button>
                </Box>
              </Columns.Column>
            )
        }
      </Columns>
    </Box>
  );
};
export default EmailTemplateManager;
