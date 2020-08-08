import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import * as eventActions from '../../redux/actions/eventActions';
import * as searchActions from '../../redux/actions/searchActions';

import * as Styles from '../Styles';
import TrackSearch from './TrackSearch';
import TrackCard from '../tracks/trackCard';

// eslint-disable-next-line react/prefer-stateless-function
class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: props.match.params.id,
      trackSearchModalIsOpen: false,
      eventTrackList: []
    };
  }

  componentDidMount() {
    const { getSingleEvent, getTrackList, trackList } = this.props;
    const { eventId, eventTrackList } = this.state;

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

  componentDidUpdate(prevProps, prevState) {
    const { getSingleEvent, getTrackList, trackList } = this.props;
    const { eventId, eventTrackList } = this.state;

    if (prevProps.trackList.length !== trackList.length) {
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
  }

  toggleTrackSearchModal = () => {
    this.setState({
      trackSearchModalIsOpen: !this.state.trackSearchModalIsOpen
    });
  };

  render() {
    const { getPredictionResults, predictResults, deleteTrack } = this.props;
    const { name, date, notes, isExplicit } = this.props.singleEvent;
    return (
      <div className="eventDetail">
        <section className="eventDetailTop">
          <div className="eventDetailTop__one">
            <h1 className="heading-primary">{name}</h1>
            <h2 className="heading-secondary">{date}</h2>
          </div>
          <div className="eventDetailTop__two">
            <p>{notes ? `${notes}` : 'no event description available'}</p>
            <span>share link</span>
          </div>
          <div className="eventDetailTop__three">
            <p>
              {isExplicit
                ? `Repeat tracks permitted`
                : `Repeat tracks not permitted`}
            </p>
            <button type="button">Edit Event</button>
          </div>
          <div className="eventDetailTop__four">
            <p>number of days away</p>
          </div>

          <div className="eventDetailTop__five">
            <button type="button" className="btn-voting">
              Voting
            </button>
            <button type="button" className="btn-history">
              History
            </button>
          </div>
        </section>

        <section className="eventDetailMiddle">
          <button
            onClick={this.toggleTrackSearchModal}
            type="button"
            className="btn-trackRequest"
          >
            Request Tract
          </button>
        </section>

        <section className="eventDetailBottom">
          {this.state.eventTrackList.map((track, index) => (
            <TrackCard
              key={track.id}
              track={track}
              index={index}
              getPredictionResults={getPredictionResults}
              predictResults={predictResults}
              eventId={this.state.eventId}
              deleteTrack={deleteTrack}
            />
          ))}
        </section>

        {/* Modal for Track Search */}
        <Modal
          isOpen={this.state.trackSearchModalIsOpen}
          onRequestClose={this.toggleTrackSearchModal}
          style={Styles.trackSearchModalStyles}
        >
          <TrackSearch
            isExplicit={isExplicit}
            eventId={this.state.eventId}
            toggleTrackSearchModal={this.toggleTrackSearchModal}
          />
        </Modal>
      </div>
    );
  }
}

EventDetail.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
  singleEvent: PropTypes.oneOfType([PropTypes.object]).isRequired,
  getSingleEvent: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    singleEvent: state.eventReducer.singleEvent,
    trackList: state.searchReducer.trackList,
    predictResults: state.searchReducer.predictResults
  };
};

const mapDispatchToProps = {
  getSingleEvent: eventActions.getSingleEvent,
  getTrackList: searchActions.getTrackList,
  getPredictionResults: searchActions.getPredictionResults,
  deleteTrack: searchActions.deleteTrack
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
