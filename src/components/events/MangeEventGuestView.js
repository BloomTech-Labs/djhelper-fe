import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Modal from 'react-modal';

import * as eventActions from '../../redux/actions/eventActions';
import * as searchActions from '../../redux/actions/searchActions';
import * as playlistActions from '../../redux/actions/playlistActions';
import * as modalActions from '../../redux/actions/modalActions';

import * as Styles from '../Styles';

import EventGuestViewDetail from './EventGuestViewDetail';
import EditEvent from './EditEvent';
import DashboardWelcome from '../DashboardWelcome';

class MangeEventGuestView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: props.match.params.eventId,
      djId: props.match.params.djId,
      trackSearchModalIsOpen: false,
      editEventModalIsOpen: false,
      eventTrackList: [],
      eventPlayList: [],
      history: props.history
    };
  }

  componentDidMount() {
    const {
      getSingleEvent,
      getTrackList,
      getPlaysLists,
      trackList,
      playlistResults
    } = this.props;
    const { eventId, eventTrackList } = this.state;

    getSingleEvent(eventId);

    if (trackList.length === 0) {
      getTrackList(eventId);
    }

    if (playlistResults.length === 0) {
      getPlaysLists(eventId);
    }

    this.setState({
      eventTrackList: trackList.filter(
        track => track.event_id === parseInt(eventId, 10)
      )
    });

    this.setState({
      eventPlayList: playlistResults.filter(
        track => track.event_id === parseInt(eventId, 10)
      )
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      getSingleEvent,
      getTrackList,
      trackList,
      playlistResults,
      getPlaysLists
    } = this.props;
    const { eventId, eventTrackList, eventPlayList } = this.state;

    const isVoteUpdated =
      prevProps.trackList.filter((prevTrack, prevIndex) => {
        return prevTrack.votes !== trackList[prevIndex].votes;
      }).length > 0;

    if (prevProps.trackList.length !== trackList.length || isVoteUpdated) {
      getSingleEvent(eventId);
      if (trackList.length === 0) {
        getTrackList(eventId);
      }
      this.setState({
        eventTrackList: trackList.filter(
          track => track.event_id === parseInt(eventId, 10)
        )
      });
    }

    // update playlist as array changes

    if (prevProps.playlistResults.length !== playlistResults.length) {
      getSingleEvent(eventId);
      if (playlistResults.length === 0) {
        getPlaysLists(eventId);
      }
      this.setState({
        eventPlayList: playlistResults.filter(
          track => track.event_id === parseInt(eventId, 10)
        )
      });
    }
  }

  toggleTrackSearchModal = () => {
    this.setState({
      trackSearchModalIsOpen: !this.state.trackSearchModalIsOpen
    });
  };

  toggleEditEventModal = () => {
    this.setState({
      editEventModalIsOpen: !this.state.editEventModalIsOpen
    });
  };

  render() {
    const {
      getPredictionResults,
      predictResults,
      deleteTrack,
      moveTrack,
      removePlaylistTrack
    } = this.props;
    const { name, date, notes, isExplicit } = this.props.singleEvent;
    return (
      <div className="eventDashboard">
        <DashboardWelcome isEvent="true" />

        <h1 className="eventDashboard__heading">Event Guest View</h1>
        <EventGuestViewDetail
          eventId={this.state.eventId}
          djId={this.state.djId}
          event={this.props.singleEvent}
          deleteTrack={this.props.deleteTrack}
          removePlaylistTrack={this.props.removePlaylistTrack}
          predictResults={this.props.predictResults}
          getPredictionResults={this.props.getPredictionResults}
          toggleTrackSearchModal={this.toggleTrackSearchModal}
          trackSearchModalIsOpen={this.state.trackSearchModalIsOpen}
          eventTrackList={this.state.eventTrackList}
          eventPlayList={this.state.eventPlayList}
          toggleEditEventModal={this.toggleEditEventModal}
          history={this.state.history}
          addVotes={this.props.addVotes}
          userId={this.props.userId}
          toggleLoginModal={this.props.toggleLoginModal}
          toggleRegisterModal={this.props.toggleRegisterModal}
          loginModalIsOpen={this.props.loginModalIsOpen}
          registerModalIsOpen={this.props.registerModalIsOpen}
        />

        <Modal
          isOpen={this.state.editEventModalIsOpen}
          onRequestClose={this.toggleEditEventModal}
          style={Styles.editEventModalStyles}
        >
          <EditEvent
            event={this.props.singleEvent}
            toggleEditEventModal={this.toggleEditEventModal}
            editEvent={this.props.editEvent}
            eventId={this.state.eventId}
            deleteEvent={this.props.deleteEvent}
            history={this.state.history}
          />
        </Modal>
      </div>
    );
  }
}

// EventDetail.propTypes = {
//   match: PropTypes.oneOfType([PropTypes.object]).isRequired,
//   singleEvent: PropTypes.oneOfType([PropTypes.object]).isRequired,
//   getSingleEvent: PropTypes.func.isRequired
// };

const mapStateToProps = state => {
  return {
    singleEvent: state.eventReducer.singleEvent,
    trackList: state.searchReducer.trackList,
    predictResults: state.searchReducer.predictResults,
    playlistResults: state.searchReducer.playlistResults,
    userId: state.userReducer.id,
    loginModalIsOpen: state.modalReducer.loginModalIsOpen,
    registerModalIsOpen: state.modalReducer.registerModalIsOpen
  };
};

const mapDispatchToProps = {
  getSingleEvent: eventActions.getSingleEvent,
  getTrackList: searchActions.getTrackList,
  getPredictionResults: searchActions.getPredictionResults,
  deleteTrack: searchActions.deleteTrack,
  getPlaysLists: playlistActions.getPlaysLists,
  removePlaylistTrack: playlistActions.removePlaylistTrack,
  editEvent: eventActions.editEvent,
  deleteEvent: eventActions.deleteEvent,
  addVotes: searchActions.addVotes,
  toggleLoginModal: modalActions.toggleLoginModal,
  toggleRegisterModal: modalActions.toggleRegisterModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MangeEventGuestView);
