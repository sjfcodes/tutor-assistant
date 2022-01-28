import React, { useState } from 'react';
import { Heading, Modal } from 'react-bulma-components';
import { useDispatch, useSelector } from 'react-redux';
import EmailTemplatesProvider from './EmailTemplatesProvider';
import ToggleHelpButton from './EmailTemplatesHelp/ToggleHelpButton';
import EmailTemplatesHelp from './EmailTemplatesHelp';
import EmailTemplatesButtons from './EmailTemplatesButtons';
import EmailTemplatesEditor from './EmailTemplatesEditor';
import { CLOSE_MODAL, EMAIL_TEMPLATES_MODAL } from '../../../store/view/actions';

const EmailTemplatesModal = () => {
  const { openModal } = useSelector((state) => state);
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [disableControls, setDisableControls] = useState(false);

  return (
    <Modal
      className='background-blurred-light'
      showClose={!disableControls}
      show={openModal === EMAIL_TEMPLATES_MODAL}
      onClose={() => dispatch({ type: CLOSE_MODAL })}
    >

      <EmailTemplatesProvider>

        <Modal.Card>
          <Modal.Card.Header
            flexDirection='column'
            alignItems='start'
            className='background-clear px-4 pb-0'
            showClose={false}
          >
            <Heading textColor='grey-lighter'>
              Email Templates
            </Heading>
            <ToggleHelpButton />
          </Modal.Card.Header>

          <Modal.Card.Body className='rounded-top p-1 mt-5'>
            <EmailTemplatesHelp />
            <EmailTemplatesButtons />
            <EmailTemplatesEditor />
          </Modal.Card.Body>

        </Modal.Card>

      </EmailTemplatesProvider>
    </Modal>
  );
};
export default EmailTemplatesModal;
