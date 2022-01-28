import { SET_OPEN_MODAL, CLOSE_MODAL } from './actions';

const defaultState = {
  openModal: '',
};

// eslint-disable-next-line default-param-last
const tutorReducer = (state = defaultState, action) => {
  switch (action.type) {
  case SET_OPEN_MODAL: {
    return {
      ...state,
      openModal: action.payload,
    };
  }

  case CLOSE_MODAL: {
    return {
      ...state,
      openModal: '',
    };
  }

  default: return state;
  }
};

export default tutorReducer;
