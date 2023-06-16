import Card from "./Card";
import { businessHours } from "../helpers/constants";

import "./ModalInfo.css";

const ModalInfo = ({ onClose }) => {
  return (
    <Card>
      <div>
        <h1>INFO</h1>
        <div>
          <ul>
            <li>
              To book a coach for a specific time, please switch to WEEKLY view
            </li>
            <li>Enter your name, surname and phone number first</li>
            <li>
              Every session lasts for exactly 1 hour and there can be only 1
              reservation at a given time.
            </li>
            <li>{`First available booking hour starts at: ${businessHours[0].startTime}`}</li>
            <li>{`Last available booking hour ends at: ${businessHours[0].endTime}`}</li>
          </ul>
        </div>
        <div className="close-btn">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </Card>
  );
};

export default ModalInfo;
