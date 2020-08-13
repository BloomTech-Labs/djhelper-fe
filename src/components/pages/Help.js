import React from 'react';
import ReactDOM from "react-dom";
<<<<<<< HEAD
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styles from '../Styles';
import Modal from 'react-modal';
Modal.setAppElement('#root');


=======
import * as Styles from '../Styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';
Modal.setAppElement('#root');

>>>>>>> 7c58f3778f050f6ac26522307433cad08051fdf0
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
        <button onClick={openModal}>Need Help?</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
<<<<<<< HEAD
          onRequestClose={closeModal}
          style={Styles.HelpModalStyle}
=======
          // onRequestClose={closeModal}
          style={Styles.helpModalStyles}
>>>>>>> 7c58f3778f050f6ac26522307433cad08051fdf0
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
 
<<<<<<< HEAD
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
=======
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
>>>>>>> 7c58f3778f050f6ac26522307433cad08051fdf0
          </form>
        </Modal>
      </div>
    );
}
export default Help;

















