import {
  getLocalStorageValueFor, LS_SELECTED_COMPONENT, LS_SELECTED_COMPONENT_ITEM_ID, updateLocalStorage,
} from '../../store_local';
import {
  SET_OPEN_MODAL,
  CLOSE_MODAL,
  SET_ACTIVE_COMPONENT,
} from './actions';

const defaultState = {
  openModal: '',
  activeComponent: {
    selectedComponent: getLocalStorageValueFor({ key: LS_SELECTED_COMPONENT }) || '',
    selectedComponentItemId: getLocalStorageValueFor({ key: LS_SELECTED_COMPONENT_ITEM_ID }) || '',
  },
};

// eslint-disable-next-line default-param-last
const tutorReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
  case SET_ACTIVE_COMPONENT: {
    Object.entries(payload).forEach(([key, value]) => {
      updateLocalStorage({ key, value });
    });
    return {
      ...state,
      activeComponent: {
        ...state.activeComponent,
        ...payload,
      },
    };
  }

  case SET_OPEN_MODAL: {
    return {
      ...state,
      openModal: payload,
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
