import React, { useState, useContext } from 'react';
import { Modal } from 'react-bulma-components';
import { ModalContext } from '../../../context';
import EmailHelpProvider from './EmailHelpProvider';
import EmailTemplatesCard from './EmailTemplatesCard';

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
      <EmailHelpProvider>
        <EmailTemplatesCard />
      </EmailHelpProvider>
    </Modal>
  );
};
export default EmailTemplatesModal;
