import React, { createContext, useMemo, useState } from 'react';
import { node } from 'prop-types';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState();

  const modalMemo = useMemo(() => ({ openModal, setOpenModal }), [openModal, setOpenModal]);

  return (
    <ModalContext.Provider value={modalMemo}>
      {children}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: node.isRequired,
};
