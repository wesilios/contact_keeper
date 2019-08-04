import {
  ADD_CONTACT,
  GET_CONTACTS,
  CLEAR_CONTACTS,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACT,
  CLEAR_FILTER,
  SET_ALERT,
  CONTACT_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact._id !== action.payload
        ),
        loading: false
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filtered: null,
        current: null,
        loading: true
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(
          contact =>
            (contact._id === action.payload._id && action.payload) || contact
        ),
        loading: false
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_CONTACT:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return contact.name.match(regex) || contact.email.match(regex);
        }),
        loading: false
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
        loading: false
      };
    case SET_ALERT:
      return {
        ...state
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
