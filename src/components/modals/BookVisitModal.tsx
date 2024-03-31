import extractTime from "@/helpers/ConvertToTime";
import { useFetchingAvailabilitiesQuery } from "@/redux/api/apiSlice";
import Image from "next/image"
import { useEffect, useState } from "react";
import Select from 'react-select'

const BookVisitModal = ({ onCloseBookingModal, ToVisitHouse }: any) => {

    console.log("house to viit", ToVisitHouse)
    const [events, setEvents] = useState([]);
    const [selectedAvailability, setSelectedAvailability] = useState('');
    //fetching availabilities
    const { data: availabilities, isLoading: fetchingAvailabilities } = useFetchingAvailabilitiesQuery('fetch')
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
    const userAvailabilities = availabilities?.filter((availability: any) => Number(availability?.user?.id) === 4 && availability.status === "free");

    console.log(userAvailabilities, "availabilities")
    const availabilityOptions = userAvailabilities?.map((availability: any) => ({
        value: availability.id,
        label: `${availability.day}, ${extractTime(availability.startTime)} - ${extractTime(availability.endTime)}`
    }));

    const handleSelectChange = (selectedOption: any) => {
        setSelectedAvailability(selectedOption.value);
    };

    const [message, setMessage] = useState()
    console.log("message", message)


    const [formData, setFormData] = useState({

        appointmentDate: '',
    });
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
            <div className="w-[30rem]  py-10 bg-white flex flex-col items-center justify-center rounded-xl">
                
<div className="flex w-full justify-end px-5">
<button onClick={onCloseBookingModal}>X</button>

</div>
                <div className="w-4/5">
                    <form className="space-y-4 w-full">

                        <input placeholder="house" value={ToVisitHouse?.id} />
                        <Select
                            id="appointmentDate"
                            name="appointmentDate"
                            value={availabilityOptions?.find((option: any) => option.value === selectedAvailability)}
                            onChange={handleSelectChange}
                            options={availabilityOptions}
                            classNamePrefix="select day and time"
                        />
                        <textarea className="w-full text-xs border p-2 h-24" placeholder="Additional Message here" />

                        <button className="w-full bg-indigo-600 text-white p-2 rounded">Book a Tour</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BookVisitModal