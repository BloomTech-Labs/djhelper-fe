import React from 'react';
import ReactDOM from "react-dom";
import * as Styles from '../Styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';
Modal.setAppElement('#root');

function Help(){
var subtitle;
const[modalIsOpen, setIsOpen]= React.useState(false);
function openModal(){
    setIsOpen(true);
}
function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
 
  // function closeModal(){
  //   setIsOpen(false);
  // }
 
    return (
      <div>
        <button onClick={openModal}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          // onRequestClose={closeModal}
          style={Styles.helpModalStyles}
          contentLabel="Example Modal"
        >
          <div>
            <button
              type="button"
              className="btn-closeModal"
              onClick={() => setIsOpen(false)}
            >
              <FontAwesomeIcon icon="times" className="btn-closeModal__icon" />
            </button>
          </div>
 
          <h2 ref={_subtitle => (subtitle = _subtitle)}>HELP</h2>
          {/* <button onClick={closeModal}>close</button> */}
          <div>Help</div>
          <form>
            <input />
            <p>Your email address</p>
            <p>Confirm email address</p>
            <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                 
              />
              <h1>Submit Query</h1>
            
            
            <p>Description of the problem</p>
           
            <button>Submit</button>
          </form>
        </Modal>
      </div>
    );
}
export default Help;

















