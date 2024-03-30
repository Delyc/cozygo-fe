import extractTime from '@/helpers/ConvertToTime';
import extractDay from '@/helpers/extractToDay';
import { useFetchBookingRequestsQuery } from '@/redux/api/apiSlice';
import React, { useState, useMemo } from 'react';
import { CalendarIcon, Clock } from '../svgs/Heart';

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Fetch bookings
    const { data: bookingRequests, isLoading: fetchingBookingRequests } = useFetchBookingRequestsQuery('fetch');
    console.log("reqqqqqq", bookingRequests)
    const acceptedBookings = useMemo(() => bookingRequests?.filter((booking: any) => booking.bookingStatus === 'accepted'), [bookingRequests]);

    // Parse booked dates into a more easily comparable format
    const bookedDates = useMemo(() => acceptedBookings?.map((booking: any) => {
        const dateStr = extractDay(booking?.availability?.startTime); 
        console.log("date stringifyError", dateStr)
        const [dayName, day, month, year] = dateStr.split(' ');
        const date = new Date(`${month} ${parseInt(day)} ${year}`);
        return dateStr;
    }), [acceptedBookings]);

    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const renderMonth = (year: number, month: number) => {
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = new Date(year, month).getDay();
        const daysArray = Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));

        return (
            <div className='w-full bg-white px-5 rounded-xl py-5'>
                <div className="text-lg font-bold text-center">{`${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`}</div>
                <div className="grid grid-cols-7 mt-1">
                    {daysOfWeek.map((day) => (
                        <div key={day} className="text-center font-medium">{day}</div>
                    ))}
                </div>
                <div className="grid gap-x-5 gap-y-3 grid-cols-7">
                    {Array.from({ length: firstDay }, (_, i) => i).map((_, index) => (
                        <div key={index} /> // Empty cells before the first day of the month
                    ))}
                    {daysArray.map((date) => {
                        console.log("datessss", extractDay(date))
                        console.log("bookeddaesss", bookedDates)
                        const isBooked = bookedDates.includes(extractDay(date));
                        console.log("isBooked", isBooked)
                        return (
                            <div key={date.getDate()} className={`text-center py-1 text-primary_gray ${isBooked ? 'rounded-full border bg-indigo-600 text-white text-sm border-indigo-600' : ''} `}>{date.getDate()}</div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const goToPrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const nextMonthDate = new Date(year, month + 1);
    const nextYear = nextMonthDate.getFullYear();
    const nextMonth = nextMonthDate.getMonth();

    console.log("acceptedBookings", acceptedBookings)

    const [expandedBookingId, setExpandedBookingId] = useState(acceptedBookings[0]?.id || null);

    const toggleExpandedBooking = (id: string) => {
        if (expandedBookingId === id) {
            // If the clicked booking is already expanded, collapse it
            setExpandedBookingId(null);
        } else {
            // Expand the clicked booking
            setExpandedBookingId(id);
        }
    };


    return (
        <div className='w-full flex gap-20  justify-center'>

            <div className="  w-[30rem] rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-300" onClick={goToPrevMonth}>Prev</button>
                    <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-300" onClick={goToNextMonth}>Next</button>
                </div>
                <div className="flex flex-col gap-10">
                    {renderMonth(year, month)}
                    {renderMonth(nextYear, nextMonth)}
                </div>
            </div>

           

            <div className='w-2/5 h-fit bg-white px-5 mt-20 py-6'>
                {acceptedBookings?.map((booking: any) => {
                    console.log("bookings", booking);
                    const dateStr = extractDay(booking?.availability?.startTime);
                    return (
                        <div
                            key={booking.id}
                            className={`p-4 my-2 ${expandedBookingId === booking.id ? 'bg-indigo-50 rounded' : 'bg-white border-b'} cursor-pointer`}
                            onClick={() => toggleExpandedBooking(booking.id)}
                        >
                                                               <div className='flex items-center gap-2 text-primary_gray text-sm'><div className='bg-indigo-600/10 px-1.5 py-1.5 rounded-xl shadow w-fit'><CalendarIcon fill={'#4f46e5'} height={'15px'} width={'15px'} stroke={'#4f46e5'} strokeWidth={0} /> </div> {extractDay(booking?.availability.startTime)}</div>

                            {expandedBookingId === booking.id && (
                                <div className='mt-2'>

                                    <div className='flex flex-col gap-2'>

                                    <div className='flex items-center gap-2 text-primary_gray text-sm'><div className='bg-indigo-600/10 px-1.5 py-1.5 rounded w-fit'><Clock fill={'#4f46e5'} height={'15px'} width={'15px'} stroke={''} strokeWidth={0} /> </div> {extractTime(booking?.availability?.startTime)} - {extractTime(booking?.availability?.endTime)}</div>
                                    {/* <div className='flex items-center gap-2 text-primary_gray text-sm'><div className='bg-indigo-600/10 px-1.5 py-1.5 rounded w-fit'><CalendarIcon fill={'#4f46e5'} height={'15px'} width={'15px'} stroke={'#4f46e5'} strokeWidth={0} /> </div> {extractDay(booking?.availability.startTime)}</div> */}
</div>
                                    <p className='mt-5 mb-4 font-medium'>Booked by</p>
                                    <div className='flex items-center gap-2'>
                                    <img className='w-12 h-12 rounded-full' src={booking?.user?.profilePictureUrl} />
                                    <div>
                                    <p className='text-primary_gray text-sm'>{booking?.user?.fullname}</p>
                                    {/* <p className='text-primary_gray text-sm'>{booking?.user?.email}</p> */}
                                    <p className='text-primary_gray text-sm mt-1'>{booking?.user?.phone}</p>
</div></div>
                                    <p className='mt-5 mb-4 font-medium'>Additional Message</p>
                                    <p className='text-sm text-primary_gray'>{booking?.message}</p>

                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
