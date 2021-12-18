/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Icon } from 'react-bulma-components';
import { AppContext } from '../../context';
import readModel from '../../utils/api/modelCRUD/read';
import formatEmailTemplates from '../../utils/helpers/emailTemplates';
import './style.css';
import TemplateSelector from '../../components/EmailManager/TemplateSelector';
import InputValues from '../../components/EmailManager/InputValues';

const defaultLayout = {
  _id: '',
  name: '',
  values: {},
  template: '',
};

const EmailManager = () => {
  //   {
  //     "_id": "61bc0f049a7e2491c818fc0a",
  //     "name": "new-student",
  //     "tutorId": "61bc0c0dc3a0a4429a77522d",
  //     "values": "['Alice','Bob', 'BobRoss','https://calendly.com/samueljfox-2u/tutor-session']",
  // eslint-disable-next-line max-len
  //     "template": "Hi {{0}},\n\nNice to e-meet you! My name is {{1}}, and I was assigned to be your tutor for the duration of the Bootcamp.\n\nI am a Full Stack Web Developer and Bootcamp graduate, so I understand the challenges you may be facing.\n\nI just sent an invite to our Slack tutoring workspace, Tutors & Students.\nThis is a separate Slack workspace (not a channel) where we will communicate by direct message (DM).\nLet me know if you don't see the invite or have any issues getting set up.\n\nPlease send me (@{{2}}) a DM once you create your account there.\nAlso, make sure to have that Slack available on your mobile phone to message me if there are problems with wifi, etc.\n\nMaximum tutorial meetings per week - our week is Monday - Sunday.\nPart-time (6-month boot camp) students are entitled to 1 meeting per week.\nFull-time (3-month boot camp) students are entitled to 2 meetings per week. \n\nSchedule your weekly meeting at: {{3}}\nOn the Calendly page, be sure you have the correct time zone selected in the section labeled 'Times are in' \n\nIf our availability doesn’t sync, let me know and I'll see f we can figure something out!\n\nEach meeting takes place over Zoom.us (video chat/screen sharing) and lasts about 50 minutes.\nI'll email you the Zoom.us link the day before our scheduled time.\nIf you have not used zoom before, please join the meeting at least 15 minutes early as you ay have to download & install some software.\n\nAll I need from you:\n- Be on Slack 5 minutes before your time slot.\n- Make sure your computer/mic/internet connection is working.\n- Make sure your workspace is quiet and free from interruptions.\n\nAt the end of the meeting, I will provide you with a link to a 2-minute evaluation form that you are required to complete.\n\nPlease Slack or email me with any questions.  I look forward to our first meeting!\n\nCC Central Support on all emails by always using REPLY ALL.",
  //     "createdAt": 1639789315,
  //     "__v": 0
  // }
  const [templates, setTemplates] = useState({});
  const [selected, setSelected] = useState(defaultLayout);
  const [preview, setPreview] = useState('');

  const handleSelectChange = ({ target }) => {
    if (target.value === 'select') return setSelected(defaultLayout);
    return setSelected(templates[target.value]);
  };

  const collectAllInstances = (str) => str.match(/\{\{(([a-zA-Z0-9]+))\}\}/g);
  const extractVariablesFromString = (str) => {
    const arrOfInstances = collectAllInstances(str);
    const valuesObject = {};
    arrOfInstances?.forEach((val) => {
      // need to validate the key characters can be object properties
      const key = val.match(/\{\{(([a-zA-Z0-9]+))\}\}/)[1];
      valuesObject[key] = selected.values[key] || '';
    });
    return valuesObject;
  };

  const buildTemplateOutput = (template, templateValues) => {
    let updatedTemplate = template;
    Object.entries(templateValues).forEach(([key, value]) => {
      updatedTemplate = updatedTemplate.replace(`{{${key}}}`, value);
    });

    return updatedTemplate;
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'template' && value) {
      const values = extractVariablesFromString(value);
      setSelected({ ...selected, values });
    }

    setSelected((curr) => ({ ...curr, [name]: value }));
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
    setPreview(buildTemplateOutput(selected.template, selected.values));
  }, [selected]);

  const { tutorDetails: { githubUsername } } = useContext(AppContext);
  return (
    <Box className='pt-0'>

      <Link to={`/${githubUsername}`} className='mt-0 pl-0'>
        <Icon className='fas fa-chevron-left is-small' />
        home
      </Link>
      <Box>
        <TemplateSelector
          selected={selected}
          templates={templates}
          handleSelectChange={handleSelectChange}
        />

      </Box>
      {
        selected._id
        && (
          <>

            <Box>
              <h1>Values</h1>
              <InputValues
                selected={selected}
                setSelected={setSelected}

              />
            </Box>
            <Box>
              <h1>Editor</h1>
              <textarea
                name='template'
                className='template-editor p-2'
                value={selected.template}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <h1>Preview</h1>
              <textarea
                className='template-editor p-2'
                value={preview}
                onChange={() => null}
              />
            </Box>
          </>
        )
      }
    </Box>
  );
};
export default EmailManager;
