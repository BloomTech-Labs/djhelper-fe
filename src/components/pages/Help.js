import React from 'react';
import ReactDOM from "react-dom";

import Modal from 'react-modal';
Modal.setAppElement('#root');

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
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
        <button onClick={openModal}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
          <button onClick={closeModal}>close</button>
          <div>Help</div>
          <form>
            <input />
            <h1>Submit Query</h1>
            <p>Description of the problem</p>
            <button>Back</button>
            <button>Request</button>
          </form>
        </Modal>
      </div>
    );
}
export default Help;

















