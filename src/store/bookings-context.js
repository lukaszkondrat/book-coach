import React, { useEffect, useState } from "react";

const BookingsContext = React.createContext({
  allBookings: [],
  addBooking: (newBooking) => {},
  removeBooking: (bookingId) => {},
});

export const BookingsContextProvider = ({ children }) => {
  const [allBookings, setAllBookings] = useState([]);

  useEffect(() => {
    const getAllBookings = async () => {
      const fetchedDBBookings = await fetch("http://localhost:8000/bookings");
      const fetchedDBBookingsJson = await fetchedDBBookings.json();
      setAllBookings(fetchedDBBookingsJson.allBookings);
    };
    getAllBookings();
  }, []);

  const addBooking = (newBooking) => {
    fetch("http://localhost:8000/bookings", {
      method: "POST",
      body: JSON.stringify(newBooking),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setAllBookings((prevBookings) => [...prevBookings, newBooking]);
  };

  const removeBooking = (bookingId) => {
    fetch(`http://localhost:8000/bookings/${bookingId}`, { method: "DELETE" });
    setAllBookings((prevBookings) =>
      prevBookings.filter((booking) => booking.id !== bookingId)
    );
  };

  const context = {
    allBookings,
    addBooking,
    removeBooking,
  };

  return (
    <BookingsContext.Provider value={context}>
      {children}
    </BookingsContext.Provider>
  );
};

export default BookingsContext;
