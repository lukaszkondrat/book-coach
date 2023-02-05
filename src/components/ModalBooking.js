import { useRef } from "react";
import Card from "./Card";
import "./ModalBooking.css";

const Modal = (props) => {
  const nameInputRef = useRef();
  const surnameInputRef = useRef();
  const phoneInputRef = useRef();

  const validateDataHandler = () => {
    if (
      nameInputRef.current.value !== "" &&
      surnameInputRef.current.value !== "" &&
      phoneInputRef.current.value !== ""
    ) {
      props.onValidate();
    }
  };

  const submitDataHandler = (e) => {
    e.preventDefault();
    validateDataHandler();
    const data = {
      name: nameInputRef.current.value,
      surname: surnameInputRef.current.value,
      phone: phoneInputRef.current.value,
    };
    props.onBook(data);
    // }
  };
  return (
    <Card>
      <form onSubmit={submitDataHandler}>
        <div className="first-row">
          <span className="inputs">
            <label htmlFor="name">Your name:</label>
            <input type="text" id="name" ref={nameInputRef} required />
          </span>
          <span className="inputs">
            <label htmlFor="name">Your surname:</label>
            <input type="text" id="name" ref={surnameInputRef} required />
          </span>
        </div>
        <div className="second-row">
          <label htmlFor="name">Phone:</label>
          <input type="text" id="name" ref={phoneInputRef} required />
        </div>
        <div className="btn">
          <button onClick={props.onClose}>X</button>
          <button>Book</button>
        </div>
      </form>
    </Card>
  );
};

export default Modal;
