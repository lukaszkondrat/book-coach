import { useState, useContext, useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import {
  today,
  businessHours,
  businessHoursStart,
  businessHoursEnd,
} from "./helpers/constants";

import BookingsContext from "./store/bookings-context";

import ModalBooking from "./components/ModalBooking";
import ModalInfo from "./components/ModalInfo";

import "./App.css";

const App = () => {
  const [modalOpen, setModalOpen] = useState({ info: true, booking: false });
  const [bookingDetails, setBookingDetails] = useState(null);

  const bookingCtx = useContext(BookingsContext);

  const removeBooking = (selectionInfo) => {
    const answer = prompt("Are you sure to delete? yes/no");
    const id = selectionInfo.event._def.extendedProps._id;
    if (answer === "yes") {
      selectionInfo.event.remove();
      bookingCtx.removeBooking(id);
    }
  };

  const closeInfoModal = () => {
    setModalOpen({ booking: true });
  };

  const closeBookingModal = () => {
    setModalOpen({ booking: false });
  };

  const readDataFromModal = (data) => {
    setBookingDetails(data);
  };

  const bookEvent = (selectionInfo) => {
    if (selectionInfo.view.type === "dayGridMonth") {
      setModalOpen({ info: true, booking: false });
    }

    const start = +selectionInfo.startStr.slice(11, 13);
    if (start >= businessHoursStart && start < businessHoursEnd) {
      if (!bookingDetails) {
        alert("Enter your name and number first");
        return;
      }

      const title = "Squash";
      const newBooking = {
        title,
        ...bookingDetails,
        start: selectionInfo.startStr,
        end: selectionInfo.endStr,
      };
      bookingCtx.addBooking(newBooking);

      const calendarApi = selectionInfo.view.calendar;
      calendarApi.addEvent(newBooking);

      setBookingDetails(null);
      setModalOpen({ info: false, booking: true });
    } else {
      setModalOpen({ info: true, booking: false });
    }
  };

  return (
    <div>
      <h1>BOOK A SQUASH COACH</h1>

      {modalOpen.booking && !modalOpen.info ? (
        <ModalBooking
          onClose={closeBookingModal}
          onReadData={readDataFromModal}
        />
      ) : null}

      {modalOpen.info && <ModalInfo onClose={closeInfoModal} />}

      {!modalOpen.info && (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next,today",
            center: "title",
            right: "dayGridMonth,timeGridWeek",
          }}
          height="auto"
          initialView="timeGridWeek"
          slotDuration="01:00:00"
          firstDay={[1]}
          validRange={{ start: today }}
          nowIndicator={true}
          businessHours={businessHours}
          selectable={true}
          weekends={false}
          events={bookingCtx.allBookings}
          select={bookEvent}
          eventClick={removeBooking}
          fixedWeekCount={false}
        />
      )}
    </div>
  );
};

export default App;
