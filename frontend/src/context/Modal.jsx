// frontend/src/context/Modal.jsx

import { createContext, useRef, useState, useContext } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ModalContext = createContext(); // We are creating context which allows us to share modal-related state and functions across the component tree without passing props down manually.

export function ModalProvider({ children }) {
  // this function will encapsulate the logic for managing the modal state; children can use this context
  const modalRef = useRef(); // used to reference the DOM element where the modal will be rendered
  const [modalContent, setModalContent] = useState(null); // will hold the React component (or content) that will be displayed in the modal
  const [onModalClose, setOnModalClose] = useState(null); // callback function that will be called when modal is closing

  const closeModal = () => {
    setModalContent(null); // 1) close modal
    if (typeof onModalClose === "function") {
      //if CB is truthy
      setOnModalClose(null); // a) resets to null
      onModalClose(); // b)
    }
  };

  const contextValue = {
    // ? define WHAT to give the component that consumes this context
    modalRef, // Reference to modal div
    modalContent, // React component to render inside modal
    setModalContent, // Function to set the React component to render inside modal
    setOnModalClose, // Function to set the callback function to be called when modal is closing
    closeModal, // Function to close the modal
  };

  return (
    // return  JSX fragment
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal() {
  const { modalRef, modalContent, closeModal } = useContext(ModalContext);

  // If there is no div referenced by the modalRef or modalContent is not a truthy value, render nothing:
  if (!modalRef || !modalRef.current || !modalContent) return null;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    // RENDER modal outside normal DOM hierarchy
    <div id="modal">
      <div id="modal-background" onClick={closeModal} />
      <div id="modal-content">{modalContent}</div>
    </div>,
    modalRef.current
  );
}

export const useModal = () => useContext(ModalContext);
