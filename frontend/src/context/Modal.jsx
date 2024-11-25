import { useRef, useState, useContext, createContext } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

// * 1 Create Context ************
const ModalContext = createContext();

// * 2 Use Content ***************
export const useModal = () => useContext(ModalContext);

// * 3 Create Provider ***********
export function ModalProvider({ children }) {
  // create reference to be attached to the modal's div allowing programmatic access to the DOM elment for the model, such as mounting content dynamically
  const modalRef = useRef();

  //create component state variables
  const [modalContent, setModalContent] = useState(null); // component
  const [onModalClose, setOnModalClose] = useState(null); // callback func

  //create closeModal func to be triggered on modal's closing
  const closeModal = () => {
    setModalContent(null); // clearModal contents

    // if cb func is truthy, call the cb fun and reset to null
    if (typeof onModalClose === "function") {
      setOnModalClose(null);
      onModalClose();
    }
  };

  const contextValue = {
    modalRef, //reference to modal div
    modalContent, //react component inside modal,
    setModalContent,
    setOnModalClose,
    closeModal,
  };

  return (
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

  if (!modalRef || !modalRef.current || !modalContent) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={closeModal}></div>
      <div id="modal-content">{modalContent}</div>
    </div>,
    modalRef.current
  );
}
