

'use client'

import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useAddAvailabilityMutation, useFetchingAvailabilitiesQuery, useBookVisitMutation , useUpdateAvailabilityMutation, useFetchBookingRequestsQuery, useUpdateBookingRequestMutation} from '@/redux/api/apiSlice';
import formatDateWithDay from '@/helpers/formatDateWithDay';
import { start } from 'repl';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';
import CustomModal from '@/components/modals/CustomModal';

const Availability = () => {
  const [startDate, setStartDate] = useState<any>(new Date());
  const [startTime, setStartTime] = useState<any>(new Date());
  const [endTime, setEndTime] = useState<any>(new Date());
  const [events, setEvents] = useState([]);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState('month');
  // Destructure the mutation hook
  const [addAvailability, { isLoading, isSuccess, isError, error }] = useAddAvailabilityMutation<any>();
  const localizer = momentLocalizer(moment);
  const [bookVisit, { isLoading: isBooking, isSuccess: isBookingSuccess, isError: isBookingError }] = useBookVisitMutation();
  const { data: bookingRequests, isLoading: fetchingBookingRequests } = useFetchBookingRequestsQuery('fetch');
const [updateBookingRequest] = useUpdateBookingRequestMutation();

  //   Modal.setAppElement('#root');
  const isToday = (someDate: any) => {
    const today = new Date();
    return someDate.getDate() === today.getDate() &&
           someDate.getMonth() === today.getMonth() &&
           someDate.getFullYear() === today.getFullYear();
  };

  const [selectedDayEvents, setSelectedDayEvents] = useState<any>([]);
const [isModalOpen, setIsModalOpen] = useState(false);
const handleSelectSlot = (slotInfo: any) => {
    // Filter events that are within the selected day
    const eventsForDay = events.filter((event: any) => {
        const startOfDay = moment(slotInfo.start).startOf('day');
        const endOfDay = moment(slotInfo.start).endOf('day');
        return moment(event.start).isBetween(startOfDay, endOfDay, null, '[]');
    });

    setSelectedDayEvents(eventsForDay);
    setIsModalOpen(true); // Open the modal
};

const closeModal = () => {
    setIsModalOpen(false);
  };


const fromTimeMinTime = isToday(startDate) ? new Date() : new Date().setHours(0, 0, 0, 0);

  const toTimeMinTime = startTime;
  const toTimeMaxTime = new Date(toTimeMinTime.getTime() + 24 * 60 * 60 * 1000);

  const handleStartTimeChange = (date: any) => {
    setStartTime(date);
    if (date.getTime() >= endTime.getTime()) {
      const adjustedEndTime = new Date(date.getTime() + 30 * 60000);
      setEndTime(adjustedEndTime);
    }
  };

  const handleSubmit = async () => {
    
    try {
      await addAvailability({startTime, endTime, status:"free", day: formatDateWithDay(startDate), id: 4});
    } catch (err) {
    }
  };
  const handleNavigate = (newDate: any) => {
    setCalendarDate(newDate);
  };

  const handleViewChange = (newView: any) => {
    setCalendarView(newView);
  };


  const [selectedAvailId, setSelectedAvailId] = useState(null);
  const [messageModal, setMessageModal] = useState(false)
  const book = (avail: any) => {
    //open message modal for correcsponding avail

    
    setSelectedAvailId(avail);
    console.log("booked", avail)
    setMessageModal(true)
  }

  //fetching availabilities
    const {data: availabilities, isLoading: fetchingAvailabilities} = useFetchingAvailabilitiesQuery('fetch')
    ;
    useEffect(() => {
            if (availabilities) {
                const mappedAvailabilities = availabilities.filter((availability: any) => Number(availability?.user?.id) === 4)
                    .map((availability: any) => ({
                        title: `${availability.status === "free" ? "available" : "Booked"}`,
                        start: new Date(availability.startTime),
                        end: new Date(availability.endTime),
                        allDay: false,
                    }));
                setEvents(mappedAvailabilities);
            }
        }, [availabilities]);
    const userAvailabilities = availabilities?.filter((availability: any) =>  Number(availability?.user?.id) === 4)

    console.log(userAvailabilities, "availabilities")

    const [message, setMessage] = useState()
    console.log("message", message)

const [updateAvailability] = useUpdateAvailabilityMutation();

const handleBookVisit = async () => {
  const requestData = {
    message,
    userId: 4,
    availabilityId: selectedAvailId
  };
  
  try {
    // First, attempt to book the visit
    const bookingResponse = await bookVisit(requestData).unwrap();
    
    // If the booking is successful, proceed to update the availability
    // You may want to adjust what data is sent based on the bookingResponse or other logic
    const updateAvailabilityData = {
      availabilityId: selectedAvailId,
      data: { status: "testingggg" } // Example data structure, adjust as needed
    };
    
    try {
      await updateAvailability(updateAvailabilityData);
      console.log("Update successful");
    } catch (error) {
      console.error("Failed to update availability:", error);
    }
  
    setMessageModal(false);
    
  } catch (err) {
    console.log(err);
  }
};


//fetch bookin requests
useEffect(() => {
    if (bookingRequests) {
        console.log(bookingRequests, "booking requests")
    }
}
, [bookingRequests])
    


const cancelRequest = async (booking: any) => {

  console.log(booking, "booking")
  const bookingId = booking.id; 
  const availabilityId = booking.availability.id; 
  const updateAvailabilityData = {
    availabilityId: booking.availability.id,
    data: { status: "testingggg" } 
  };

  const updateBookingData = {
    bookingId: bookingId,
    data: { status: "cancelled" } 
  };
  await updateBookingRequest(updateBookingData);
  await updateAvailability(updateAvailabilityData);
};


const acceptRequest = async (booking: any) => {

  console.log(booking, "booking")
  const bookingId = booking.id; 
  const availabilityId = booking.availability.id; 
  const updateAvailabilityData = {
    availabilityId: booking.availability.id,
    data: { status: "testingggg" } 
  };

  const updateBookingData = {
    bookingId: bookingId,
    data: { status: "cancelled" } 
  };
  await updateBookingRequest(updateBookingData);
  await updateAvailability(updateAvailabilityData);
};

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Availability</h1>
      <div className="mb-4">
        <p className="mb-2">Add availability</p>
        <DatePicker 
            selected={startDate}
            onChange={(date) => {
                if (date) {
                    const resetTime = new Date(date.setHours(0, 0, 0, 0));
                    setStartDate(date);
                    if (!isToday(date)) {
                        setStartTime(resetTime);
                        setEndTime(new Date(resetTime.getTime() + 30 * 60000));
                    }
                }
            }}
            dateFormat="MMMM d, yyyy"
            minDate={new Date()}
            className="p-2 border rounded-md"
        />
        <div className="flex gap-4">
          <div>
            <DatePicker
              selected={startTime}
              onChange={handleStartTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
              minDate={startDate}
              minTime={new Date(fromTimeMinTime)}
              maxTime={new Date(new Date().setHours(23, 59, 0, 0))}
              className="p-2 border rounded-md"
            />
          </div>
          <div>
            <DatePicker
              selected={endTime}
              onChange={(date) => setEndTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
              minDate={startDate}
              minTime={new Date(toTimeMinTime)}
              maxTime={new Date(new Date().setHours(23, 59, 0, 0))}
              className="p-2 border rounded-md"
            />
          </div>
        </div>
      </div>
      <button 
        onClick={handleSubmit} 
        disabled={isLoading}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        {isLoading ? 'Adding...' : 'Add Availability'}
      </button>
      {isSuccess && <p>Availability added successfully!</p>}
      {isError && <p>Error adding availability: {error?.data?.message || 'Something went wrong'}</p>}
   
   <p>all availabilities</p>
   
    {fetchingAvailabilities && <p>Fetching availabilities...</p>}
    {userAvailabilities?.map((availability: any) => (
        <div key={availability.id} className="flex gap-4">
            <p>{availability.startTime}</p>
            <p>{availability.endTime}</p>
            <p>{availability.day}</p>
 
            <button onClick={() => book(availability.id)} className='py-2 px-6 border'>{availability.status}</button>
            {messageModal && selectedAvailId === availability.id && (
                <div>
        <textarea onChange={(e: any) => {setMessage(e.target.value)}} placeholder="message" className="border p-2"></textarea>
        <button    onClick={handleBookVisit} >send</button>
        </div>
      )}
        </div>
    ))}


<Calendar
    localizer={localizer}
    events={events}
    startAccessor="start"
    endAccessor="end"
    style={{ height: 500, margin: '50px' }}
    onNavigate={handleNavigate}
    date={calendarDate}
    onSelectSlot={handleSelectSlot}
    
        selectable
    views={['month', 'week', 'day', 'agenda']}
/>

<CustomModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Selected Day's Events"
      >
        <h2>Events on {selectedDayEvents.length ? moment(selectedDayEvents[0].start).format('MMMM Do YYYY') : ''}</h2>
        {selectedDayEvents.map((event: any, index: number) => (
          <div key={index}>
            <p>{event.title}</p>
            <p>Start: {moment(event.start).format('hh:mm a')}</p>
            <p>End: {moment(event.end).format('hh:mm a')}</p>
          </div>
        ))}
        <button onClick={closeModal}>Close</button>
      </CustomModal>



<div>bookings</div>

<div>
  {fetchingBookingRequests && <p>Fetching booking requests...</p>}
  {bookingRequests?.map((booking: any) => (
    <div key={booking.id} className="flex gap-4">
      <p>{booking.message}</p>
      <p>{booking.availability.startTime}</p>
      <p>{booking.bookingStatus}</p>
      <p>{booking.availability.endTime}</p>
      <p>{booking.availability.day}</p>

      <button onClick={() => cancelRequest(booking)}>Cancel</button>
      <button onClick={() => acceptRequest(booking)}>Accept</button>
    </div>
  ))}
</div>

    </div>
  );
};

export default Availability;


