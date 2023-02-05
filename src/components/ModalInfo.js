import Card from "./Card";
import { businessHours } from "../App";

import "./ModalInfo.css";

const ModalInfo = (props) => {
  return (
    <Card>
      <div>
        <h1>INFO</h1>
        <div>
          <ul>
            <li>
              To book a coach for a specific time, please switch to weekly or
              daily view
            </li>
            <li>Every session lasts for exactly 1 hour </li>
            <li>{`First available booking hour starts at: ${businessHours[0].startTime}`}</li>
            <li>{`Last available booking hour ends at: ${businessHours[0].endTime}`}</li>
          </ul>
        </div>
        <div className="close-btn">
          <button onClick={props.onClose}>Close</button>
        </div>
      </div>
    </Card>
  );
};

export default ModalInfo;
