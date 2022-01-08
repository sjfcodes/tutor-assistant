import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { node } from 'prop-types';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState('');

  const modalMemo = useMemo(() => ({ openModal, setOpenModal }), [openModal, setOpenModal]);

  useEffect(() => {
    const bodyClass = document.querySelector('body').classList;
    if (openModal) return bodyClass.add('is-fixed');
    return bodyClass.remove('is-fixed');
  }, [openModal]);

  return (
    <ModalContext.Provider value={modalMemo}>
      {children}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: node.isRequired,
};
