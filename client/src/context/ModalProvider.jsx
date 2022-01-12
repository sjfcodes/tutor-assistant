import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { node } from 'prop-types';
import { preventBodyScroll } from '../utils';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState('');

  const modalMemo = useMemo(() => ({ openModal, setOpenModal }), [openModal, setOpenModal]);

  useEffect(() => {
    preventBodyScroll(!!openModal);
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
