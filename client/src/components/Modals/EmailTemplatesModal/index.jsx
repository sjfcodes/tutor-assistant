import React, { useState, useContext } from 'react';
import { Heading, Modal } from 'react-bulma-components';
import { ModalContext } from '../../../context';
import EmailTemplatesProvider from './EmailTemplatesProvider';
import ToggleHelpButton from './EmailTemplatesHelp/ToggleHelpButton';
import EmailTemplatesHelp from './EmailTemplatesHelp';
import EmailTemplatesButtons from './EmailTemplatesButtons';
import EmailTemplatesEditor from './EmailTemplatesEditor';

const EmailTemplatesModal = () => {
  const { openModal, setOpenModal } = useContext(ModalContext);
  // eslint-disable-next-line no-unused-vars
  const [disableControls, setDisableControls] = useState(false);

  return (
    <Modal
      className='background-blurred-light'
      showClose={!disableControls}
      show={openModal === 'EmailTemplates'}
      onClose={() => setOpenModal('')}
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
