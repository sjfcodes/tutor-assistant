import { SET_CALENDLY_MEETINGS } from './actions';

// eslint-disable-next-line default-param-last
const calendlyMeetingReducer = (state = '', action) => {
  switch (action.type) {
  case SET_CALENDLY_MEETINGS: {
    return {
      ...action.payload,
    };
  }
  default: return state;
  }
};

export default calendlyMeetingReducer;
