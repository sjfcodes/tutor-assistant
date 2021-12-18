import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Icon } from 'react-bulma-components';
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from '../../context';
import readModel from '../../utils/api/modelCRUD/read';
import formatEmailTemplates from '../../utils/helpers/emailTemplates';
import './style.css';

const EmailManager = () => {
  const [templates, setTemplates] = useState({});
  const [id, setId] = useState('');

  const handleSelectedTemplate = ({ target }) => {
    if (!target.value) setId('');
    setId(target.value);
  };

  useEffect(() => {
    let isMounted = true;
    const getTutorsEmailTemplates = async () => {
      try {
        const templateArr = await readModel('email-template');
        if (!isMounted) return;
        setTemplates(formatEmailTemplates(templateArr));
      //   {
      //     "id": "61bc0f049a7e2491c818fc0a",
      //     "name": "new-student",
      //     "tutorId": "61bc0c0dc3a0a4429a77522d",
      //     "templateValues": "['Alice','Bob', 'BobRoss','https://calendly.com/samueljfox-2u/tutor-session']",
      // eslint-disable-next-line max-len
      //     "template": "Hi {{0}},\n\nNice to e-meet you! My name is {{1}}, and I was assigned to be your tutor for the duration of the Bootcamp.\n\nI am a Full Stack Web Developer and Bootcamp graduate, so I understand the challenges you may be facing.\n\nI just sent an invite to our Slack tutoring workspace, Tutors & Students.\nThis is a separate Slack workspace (not a channel) where we will communicate by direct message (DM).\nLet me know if you don't see the invite or have any issues getting set up.\n\nPlease send me (@{{2}}) a DM once you create your account there.\nAlso, make sure to have that Slack available on your mobile phone to message me if there are problems with wifi, etc.\n\nMaximum tutorial meetings per week - our week is Monday - Sunday.\nPart-time (6-month boot camp) students are entitled to 1 meeting per week.\nFull-time (3-month boot camp) students are entitled to 2 meetings per week. \n\nSchedule your weekly meeting at: {{3}}\nOn the Calendly page, be sure you have the correct time zone selected in the section labeled 'Times are in' \n\nIf our availability doesn’t sync, let me know and I'll see f we can figure something out!\n\nEach meeting takes place over Zoom.us (video chat/screen sharing) and lasts about 50 minutes.\nI'll email you the Zoom.us link the day before our scheduled time.\nIf you have not used zoom before, please join the meeting at least 15 minutes early as you ay have to download & install some software.\n\nAll I need from you:\n- Be on Slack 5 minutes before your time slot.\n- Make sure your computer/mic/internet connection is working.\n- Make sure your workspace is quiet and free from interruptions.\n\nAt the end of the meeting, I will provide you with a link to a 2-minute evaluation form that you are required to complete.\n\nPlease Slack or email me with any questions.  I look forward to our first meeting!\n\nCC Central Support on all emails by always using REPLY ALL.",
      //     "createdAt": 1639789315,
      //     "__v": 0
      // }
      } catch (error) {
        console.warn(error);
      }
    };
    getTutorsEmailTemplates();

    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(templates);
  }, [templates]);

  const { tutorDetails: { githubUsername } } = useContext(AppContext);
  return (
    <Box className='pt-0'>

      <Link to={`/${githubUsername}`} className='mt-0 pl-0'>
        <Icon className='fas fa-chevron-left is-small' />
        home
      </Link>
      <Box>
        <select
          className='p-1'
          onInput={handleSelectedTemplate}
        >
          <option>{templates[id] ? templates[id].name : '-'}</option>
          {
            Object.keys(templates).length
          && Object.values(templates)
            .map(({ _id, name }) => <option key={uuidv4()} value={_id}>{name}</option>)
          }
        </select>

      </Box>
      {
        templates[id]
        && (
          <>
            {/* <div class="is-flex is-align-items-center mb-2">
        <label class="label is-size-7 mb-0 mr-1" htmlFor=${name}">1. name it ➡️</label>
        <input type=text data-i="${i}" name="${name}"
        aria-label="name" value="${name}" id="template-for-${i}" >
      </div>  */}
            <Box>
              <h1>Values</h1>
            </Box>
            <Box>
              <h1>Editor</h1>
              <textarea className='template-editor' value={templates[id].template} />
            </Box>
            <Box>
              <h1>Preview</h1>
            </Box>
          </>
        )
      }
    </Box>
  );
};
export default EmailManager;
