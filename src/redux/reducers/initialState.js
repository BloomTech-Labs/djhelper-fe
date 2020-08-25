import { getTrackList } from '../actions/searchActions';
// user initia state
export const UserInitialState = {
  username: '',
  name: '',
  email: '',
  phone: '',
  website: '',
  id: localStorage.getItem('id'),
  bio: '',
  profile_img_src: '',
  events: { active: '' }, // { ...allEvents, active: '' }, // if you want to use dummy data
  locations: [],
  registerUserStart: false,
  registerUserError: false,
  loginUserStart: false,
  loginUserError: false,
  logoutUserStart: false,
  logoutUserError: false,
  tokenPresent: localStorage.getItem('token'), // Consider using !!localStorage.getItem('token')
  deleteUserStart: false,
  deleteUserError: false,
  editUserStart: false,
  editUserError: false,
  editUserProcessing: false
};

export const EventInitialState = {
  events: [],
  singleEvent: {},
  addEventStart: false,
  addEventError: false,
  editEventStart: false,
  editEventError: false,
  deleteEventStart: true,
  deleteEventError: false,
  addLocationStart: false,
  addLocationError: false,
  getDJError: false,
  getDJStart: false,
  getEventsStart: false,
  getEventsError: false
};

export const SearchInitialState = {
  searchResults: [],
  trackList: [],
  getSearchResultsError: '',
  addTrackError: '',
  getTrackListError: '',
  deleteTrackError: '',
  playlistResults: [],
  moveTrackError: '',
  getPlaylistError: '',
  removePlaylistTrackError: '',
  getSearchResultStart: false,
  getPredictResultStart: false
};

export const ModalInitialState = {
  loginModalIsOpen: false,
  registerModalIsOpen: false,
  helpModalIsOpen: false
};
