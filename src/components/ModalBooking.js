import { useRef } from "react";
import Card from "./Card";
import "./ModalBooking.css";

const ModalBooking = ({ onReadData, onClose }) => {
  const nameInputRef = useRef();
  const surnameInputRef = useRef();
  const phoneInputRef = useRef();

  const submitForm = (event) => {
    event.preventDefault();
    const data = {
      name: nameInputRef.current.value,
      surname: surnameInputRef.current.value,
      phone: phoneInputRef.current.value,
    };
    onReadData(data);
    onClose();
  };

  return (
    <Card>
      <form onSubmit={submitForm}>
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
          <button>Book</button>
        </div>
      </form>
    </Card>
  );
};

export default ModalBooking;
