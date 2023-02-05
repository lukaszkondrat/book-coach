import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import ModalBooking from "./components/ModalBooking";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import "./App.css";
import ModalInfo from "./components/ModalInfo";

const createId = () => {
  return Math.random().toString();
};
const today = new Date().toISOString();
// const currHour = +today.slice(11, 13);

export const businessHours = [
  {
    daysOfWeek: [1, 2, 3, 4, 5],
    startTime: "07:00",
    endTime: "21:00",
  },
];
const businessHoursStart = +businessHours[0].startTime.slice(0, 2);
const businessHoursEnd = +businessHours[0].endTime.slice(0, 2);

const App = () => {
  const [modalBookingOpen, setModalBookingOpen] = useState(false);
  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [events, setEvents] = useState([]);
  const [updatedEvents, setUpdatedEvents] = useState([]);

  const manageBookingDataHandler = (data) => {
    setModalBookingOpen(false);
    const newEvent = [{ ...events[0], ...data }];
    setUpdatedEvents((prevEvents) => [newEvent, ...prevEvents]);
  };

  const removeEventHandler = (selectionInfo) => {
    const answer = prompt("Are you sure to delete? yes/no");
    if (answer === "yes") {
      selectionInfo.event.remove();
    }
  };

  const validateDataHandler = () => {
    setIsValid(true);
  };

  const closeModalHandler = () => {
    setModalInfoOpen(false);
    setModalBookingOpen(false);
    setIsValid(false);
  };

  const selectDateHandler = (selectionInfo) => {
    const start = +selectionInfo.startStr.slice(11, 13);

    const title = "Squash";
    let calendarApi = selectionInfo.view.calendar;

    // calendarApi.unselect(); // clear date selection

    if (selectionInfo.view.type === "dayGridMonth") {
      setModalInfoOpen(true);
    } else {
      if (
        start >= businessHoursStart &&
        // start > currHour + 1 &&
        start < businessHoursEnd
      ) {
        setModalBookingOpen(true);
        if (isValid) {
          const newEvent = {
            id: createId(),
            title,
            ...selectionInfo,
          };
          calendarApi.addEvent(newEvent);
          setEvents((prevEv) => [newEvent, ...prevEv]);
        }
      } else {
        setModalInfoOpen(true);
      }
    }
  };

  return (
    <div>
      <h1>Book a coach</h1>
      {modalBookingOpen && (
        <ModalBooking
          onBook={manageBookingDataHandler}
          onClose={closeModalHandler}
          onValidate={validateDataHandler}
        />
      )}
      {modalInfoOpen && <ModalInfo onClose={closeModalHandler} />}
      {!modalBookingOpen && (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next,today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height="auto"
          initialView="timeGridWeek"
          slotDuration="01:00:00"
          firstDay={[1]}
          validRange={{ start: today }}
          nowIndicator={true}
          navLinks={true}
          businessHours={businessHours}
          selectable={true}
          weekends={false}
          events={events}
          select={selectDateHandler}
          eventClick={removeEventHandler}
          fixedWeekCount={false}
        />
      )}
    </div>
  );
};

export default App;
