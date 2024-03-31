import extractTime from "@/helpers/ConvertToTime";
import { useBookVisitMutation, useFetchingAvailabilitiesQuery, useUpdateAvailabilityMutation } from "@/redux/api/apiSlice";
import { useEffect, useState } from "react";
import Select from 'react-select'
import { ToastContainer, toast } from "react-toastify";


const BookVisitModal = ({ onCloseBookingModal, ToVisitHouse }: any) => {
    const [events, setEvents] = useState([]);
  const [bookVisit, { isLoading: isBooking, isSuccess: isBookingSuccess, isError: isBookingError }] = useBookVisitMutation();

    const [selectedAvailability, setSelectedAvailability] = useState(null); 
    const [message, setMessage] = useState('');
    const { data: availabilities, isLoading: fetchingAvailabilities } = useFetchingAvailabilitiesQuery('fetch');
    const [updateAvailability] = useUpdateAvailabilityMutation();
    useEffect(() => {
        if (availabilities) {
            const mappedAvailabilities = availabilities.filter((availability: any) => Number(availability?.user?.id) === 4)
                .map((availability: any) => ({
                    title: availability.status === "free" ? "Available" : "Booked",
                    start: new Date(availability.startTime),
                    end: new Date(availability.endTime),
                    allDay: false,
                }));
            setEvents(mappedAvailabilities);
        }
    }, [availabilities]);

    const userAvailabilities = availabilities?.filter((availability: any) => Number(availability?.user?.id) === 4 && availability.status === "free");
    const availabilityOptions = userAvailabilities?.map((availability: any) => ({
        value: availability.id,
        label: `${availability.day}, ${extractTime(availability.startTime)} - ${extractTime(availability.endTime)}`
    }));

    const handleSelectChange = (selectedOption: any) => {
        setSelectedAvailability(selectedOption.value);
    };

    const handleMessageChange = (event: any) => {
        setMessage(event.target.value);
    };

    const handleBookVisit = async (event: any) => {
        event.preventDefault();
        if (!selectedAvailability) {
            toast.error("Please select an availability");
            return;
        } 

        const requestData = {
            message,
            userId: 4, 
            houseId: ToVisitHouse?.id,
            bookingStatus: "pending", 
            availabilityId: selectedAvailability,
        };

        try {
            const bookingResponse = await bookVisit(requestData).unwrap();
            console.log("Booking successful", bookingResponse);

            const updateAvailabilityData = {
                availabilityId: selectedAvailability,
                data: { status: "pending" } 
            };

            await updateAvailability(updateAvailabilityData);
            console.log("Availability updated");
            toast.success("Booking successful");
            setTimeout(() => {
                onCloseBookingModal();
            }, 3000);

        } catch (error) {
            console.error("Booking or update failed:", error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center px-5 z-50">
            <div className="w-[25rem] pb-10  bg-white flex flex-col items-center justify-center rounded-xl">
                <div className="w-full flex px-10 justify-end pt-5">
                    <p className="font-medium text-xl cursor-pointer" onClick={onCloseBookingModal}>X</p>
                </div>
                <ToastContainer />
                {availabilityOptions?.length > 0 ?  <form onSubmit={handleBookVisit} className="w-4/5 mt-3 space-y-4">
                    <div>
                        <label htmlFor="house" className="block text-sm font-medium text-gray-700">House ID</label>
                        <input
                            type="text"
                            id="house"
                            name="house"
                            value={ToVisitHouse?.id}
                            readOnly
                            className="mt-1 block w-full border border-gray-300 p-2 shadow-sm sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="availability" className="block text-sm font-medium text-gray-700">Availability</label>
                        {}
                        <Select
                            id="availability"
                            name="availability"
                            value={availabilityOptions?.find((option: any) => option.value === selectedAvailability)}
                            onChange={handleSelectChange}
                            options={availabilityOptions}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            className="mt-1 block w-full border border-gray-300 p-2 shadow-sm sm:text-sm"
                            placeholder="Additional message here..."
                            value={message}
                            onChange={handleMessageChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-2 rounded"
                        disabled={isBooking}>
                        Book a Tour
                    </button>
                </form> : <p>No availability found</p>}
           
            </div>
        </div>
    );
}

export default BookVisitModal;
