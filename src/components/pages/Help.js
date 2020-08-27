/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styles from '../Styles';
import * as ModalActions from '../../redux/actions/modalActions';

Modal.setAppElement('#root');

function Help({ helpModalIsOpen, toggleHelpModal }) {
  return (
    <div>
      <Modal
        isOpen={helpModalIsOpen}
        onRequestClose={toggleHelpModal}
        style={Styles.HelpModalStyle}
      >
        <div className="close">
          <button
            className="close__btn"
            type="button"
            onClick={toggleHelpModal}
          >
            <FontAwesomeIcon icon="times" className="close__icon" />
          </button>
        </div>
        <form>
          <div className="Title">
            <p>Help:</p>
            <p> Submit Query </p>
          </div>
          <div className="content">
            <div className="emailField">
              <label className="Text">
                Your email address
                <input
                  className="inputField"
                  name="email"
                  type="email"
                  placeholder="email"
                />
              </label>
              <label className="Text">
                Confirm email address
                <input
                  className="inputField"
                  name="email"
                  type="email"
                  placeholder=" confirm email"
                />
              </label>
            </div>

            <div className="description">
              <div className="inputField1">
                <label className="Text">
                  Description of the problem
                  <input
                    className="descrip_text"
                    name="text"
                    type="text"
                    placeholder="description of problem"
                  />
                </label>
              </div>

              <button type="submit" className="btn-submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    helpModalIsOpen: state.modalReducer.helpModalIsOpen
  };
};

const mapDispatchToProps = {
  toggleHelpModal: ModalActions.toggleHelpModal
};
export default connect(mapStateToProps, mapDispatchToProps)(Help);
