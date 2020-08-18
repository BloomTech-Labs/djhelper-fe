import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styles from '../Styles';
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
 
  function closeModal(){
    setIsOpen(false);
  }
 
    return (
      <div>
        <button onClick={openModal}>Need Help?</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={Styles.HelpModalStyle}
          // onRequestClose={closeModal}
          
          contentLabel="Example Modal"
        >
        
 
        <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
          <button onClick={closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </div>
    );
          
 
}
export default Help;

















