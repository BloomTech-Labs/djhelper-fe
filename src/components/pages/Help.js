import React from 'react';
import ReactDOM from "react-dom";
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
          contentLabel="Example Modal"
        >
 
          <h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
          <div>
            <button
              type="button"
              className="btn-closeModal"
              onClick={() => setIsOpen(false)}
            >
              <FontAwesomeIcon icon="times" className="btn-closeModal__icon" />
            </button>
          </div>
          
          <div><h1>Help:</h1>
          <h1>Submit Query</h1></div>
          <form>
            <div className= "section1">
           <h2>Your email address</h2>
           <textarea></textarea>
           <h2>Confirm email address</h2>
           <textarea></textarea>
           </div>
            
           
            <div className= "section2">
            <h2>Description of the Problem</h2>
            <textarea></textarea>
            
            <button className= "btn-submit">Submit</button>
            </div>
          </form>
        </Modal>
      </div>
    );
}
export default Help;

















