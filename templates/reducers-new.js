import {
  /* new type import */
} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /* new reducer */
    default:
      return state;
  }
};
