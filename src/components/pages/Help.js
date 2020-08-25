import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styles from '../Styles';

import Modal from 'react-modal';
Modal.setAppElement('#root');


function Help(){
// var subtitle;
const[modalIsOpen, setIsOpen]= React.useState(false);
function openModal(){
    setIsOpen(true);
}

 
  function closeModal(){
    setIsOpen(false);
  }
 
    return (
      <div>
        <button onClick={openModal}>Need Help?</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={Styles.HelpModalStyle}
          // onRequestClose={closeModal}
          
          contentLabel="Example Modal"
        >
        
          <div className="close">
        {/* <h2 ref={_subtitle => (subtitle = _subtitle)}></h2> */}
          <button  onClick={closeModal}>close</button>
          </div>
      <form>
            <div className="Title">
            <p>Help:</p>
             <p> Submit Query </p>
             </div>
          <div className="content">
            <div className= "emailField">
            <label className= "Text">Your email address</label>
            <input class="inputField"
            name= "email"
            type= "email"
            placeholder= "email" />
            <label className= "Text">Confirm email address</label>
             <input class="inputField"
            name= "email"
            type= "email"
            placeholder= " confirm email" /></div>
            
            <div className="description">
            <label className= "Text">Description of the problem</label>
            <div class="inputField1">
             <input class= "descrip_text"
            name= "text"
            type= "text"
            placeholder= "description of problem" />
            </div>
            
            <button className= "btn-submit">Submit</button>
            </div>
          </div>
      </form>
        </Modal>
      </div>
    );
          
 
}
export default Help;

















