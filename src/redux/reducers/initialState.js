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
// song initial states

export const SongInitialState = {
  results: [],
  eventPlaylists: {
    event1: {
      playlist: [],
      requests: []
    },
    event2: {
      playlist: [],
      requests: []
    },
    event3: {
      playlist: [],
      requests: []
    },
    event4: {
      playlist: [],
      requests: []
    },
    event5: {
      playlist: [],
      requests: []
    },
    event6: {
      playlist: [],
      requests: []
    }
  },
  addToSongReducerStarted: false,
  searchStarted: false,
  searchError: false,
  getPreviewStarted: false,
  getPreviewError: false,
  addSongStarted: false,
  addSongError: false,
  editModeOn: false,
  removeSongStarted: false,
  removeSongError: false,
  addVoteStarted: false,
  addVoteError: false,
  currentPreview: '',
  getPlaylistStart: false,
  getPlaylistError: false,
  editQueueNumStart: false,
  editQueueNumError: false
};

export const SearchInitialState = {
  searchResults: [],
  predictResults: [],
  trackList: [],
  addTrackError: '',
  getTrackListError: '',
  deleteTrackError: ''
};
