import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import * as eventActions from '../../redux/actions/eventActions';
import * as Styles from '../Styles';
import TrackSearch from './TrackSearch';

// eslint-disable-next-line react/prefer-stateless-function
class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: props.match.params.id,
      trackModalIsOpen: false
    };
  }

  componentDidMount() {
    const { getSingleEvent } = this.props;
    const { eventId } = this.state;
    getSingleEvent(eventId);
  }

  toggleTrackModal = () => {
    this.setState({ trackModalIsOpen: !this.state.trackModalIsOpen });
  };

  render() {
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
            onClick={this.toggleTrackModal}
            type="button"
            className="btn-trackRequest"
          >
            Request Tract
          </button>
        </section>

        <section className="eventDetailBottom">
          <p>Tract List</p>
        </section>

        {/* Modal for Track Search */}
        <Modal
          isOpen={this.state.trackModalIsOpen}
          onRequestClose={this.toggleTrackModal}
          style={Styles.trackModalStyles}
        >
          <TrackSearch toggleTrackModal={this.toggleTrackModal} />
        </Modal>
      </div>
    );
  }
}

EventDetail.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
  singleEvent: PropTypes.oneOfType([PropTypes.object]).isRequired
};

const mapStateToProps = state => {
  return {
    singleEvent: state.eventReducer.singleEvent
  };
};

const mapDispatchToProps = {
  getSingleEvent: eventActions.getSingleEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
