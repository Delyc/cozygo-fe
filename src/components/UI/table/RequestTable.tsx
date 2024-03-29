import { Approved, Declined, Eye, Message } from '@/components/svgs/Heart';
import extractTime from '@/helpers/ConvertToTime';
import extractDay from '@/helpers/extractToDay';
import { useFetchBookingRequestsQuery, useFetchSingleHouseQuery, useUpdateAvailabilityMutation, useUpdateBookingRequestMutation } from '@/redux/api/apiSlice';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

// Define a type for the mentor data
type Mentor = {
    id: number;
    name: string;
    mentees: string;
    confirmedDeals: number;
    memberSince: string;
    phone?: string;
    email?: string;
    homeBranch?: string;
    expertise?: string;
    languages?: string;
    joinedDate?: string;
};

// Mock data for mentors
const mentors: Mentor[] = [
    {
        id: 1,
        name: 'Allison Gouse',
        mentees: "160000rwf",
        confirmedDeals: 152,
        memberSince: 'pending',
        phone: '+1 (647) 654-8621',
        email: 'allison.gouse@example.com',
        homeBranch: 'Downtown Toronto',
        expertise: 'Commercial real estate',
        languages: 'English, Russian, French',
        joinedDate: '10 September 2020',
    },
    {
        id: 2,
        name: 'Kadin Carder',
        mentees: "160000rwf",
        confirmedDeals: 16,
        memberSince: 'rejected',
        phone: '+1 (647) 654-8622',
        email: 'kadin.carder@example.com',
        homeBranch: 'Uptown Toronto',
        expertise: 'Residential real estate',
        languages: 'English, Spanish',
        joinedDate: '15 August 2019',
    },
    {
        id: 3,
        name: 'Dulce Baptista',
        mentees: "160000rwf",
        confirmedDeals: 45,
        memberSince: 'approved',
        phone: '+1 (647) 654-8623',
        email: 'dulce.baptista@example.com',
        homeBranch: 'East Toronto',
        expertise: 'Industrial real estate',
        languages: 'English, Portuguese',
        joinedDate: '12 June 2018',
    },
 
    {
        id: 3,
        name: 'Dulce Baptista',
        mentees: "160000rwf",
        confirmedDeals: 45,
        memberSince: 'approved',
        phone: '+1 (647) 654-8623',
        email: 'dulce.baptista@example.com',
        homeBranch: 'East Toronto',
        expertise: 'Industrial real estate',
        languages: 'English, Portuguese',
        joinedDate: '12 June 2018',
    },
    {
        id: 2,
        name: 'Kadin Carder',
        mentees: "160000rwf",
        confirmedDeals: 16,
        memberSince: 'rejected',
        phone: '+1 (647) 654-8622',
        email: 'kadin.carder@example.com',
        homeBranch: 'Uptown Toronto',
        expertise: 'Residential real estate',
        languages: 'English, Spanish',
        joinedDate: '15 August 2019',
    },
];


const RequestTable: React.FC = () => {
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const { data: bookingRequests, isLoading: fetchingBookingRequests } = useFetchBookingRequestsQuery('fetch');
const [updateBookingRequest] = useUpdateBookingRequestMutation();
const [updateAvailability] = useUpdateAvailabilityMutation();

console.log("booking requetssss", bookingRequests)
    const toggleExpand = (id: number) => {
        if (expandedId === id) {
            setExpandedId(null); 
        } else {
            setExpandedId(id); 
        }
    };

    const houseId = 2

    const { data: house } = useFetchSingleHouseQuery(String(houseId));

    console.log("houseeeeeeee one houseee", house?.pictures[0].imageUrl)

    const cancelRequest = async (booking: any) => {

        try{
            console.log(booking, "booking")
            const bookingId = booking.id; 
            const availabilityId = booking.availability.id; 
            const updateAvailabilityData = {
              availabilityId: booking.availability.id,
              data: { status: "free" } 
            };
            const updateBookingData = {
              bookingId: bookingId,
              data: { bookingStatus: "cancelled" } 
            };
            await updateBookingRequest(updateBookingData);
            await updateAvailability(updateAvailabilityData);
            toast.success("Booking Cancelled");
        }catch(err) {
            console.log(err)
        }
      };
      
      
      const acceptRequest = async (booking: any) => {
        const bookingId = booking.id; 
        const availabilityId = booking.availability.id; 
        try{
            const updateAvailabilityData = {
                availabilityId: booking.availability.id,
                data: { status: "booked" } 
              };
              const updateBookingData = {
                bookingId: bookingId,
                data: { bookingStatus: "accepted" } 
              };
              await updateBookingRequest(updateBookingData);
              await updateAvailability(updateAvailabilityData);
              toast.success("Booking Accepted");
      
        }catch(err) {
            console.log(err)
        }       
      };
    return (
        <div className="flex flex-col overflow-x-scroll gap-5">
      <ToastContainer />
         
            <table className="bg-white  shadow-3xl rounded-md">
                <thead className="bg-gray-200 rounded-t-md">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Names
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            House Location
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Day
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Time Slot
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            More
                        </th>
                        {/* <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Action
                        </th> */}
                    </tr>
                </thead>

                <tbody className='text-sm text-primary_gray'>
  {fetchingBookingRequests && <p>Fetching booking requests...</p>}

                    {bookingRequests?.map((booking: any) => (
                        <React.Fragment key={booking.id}>
                            <tr className='border'>
                                <td className='px-5 py-2'>{booking?.user?.fullname}</td>
                                <td className='px-5'>{"Gasabo"}</td>
                                <td className='px-5'>{extractDay(booking?.availability.startTime)}</td>
                                <td className='px-5'>{extractTime(booking.availability.startTime) } - {extractTime(booking.availability.endTime)}</td>
                                <td className='px-5'>
                                    <div  className={`${booking.bookingStatus === 'pending' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500' : booking.bookingStatus === 'accepted' ? 'bg-green-500/20 border border-green-500 text-green-500' : 'bg-red-500/20 border border-red-500 text-red-500'} capitalize rounded-2xl grid place-content-center w-20 text-xs py-1 font-medium`}>{booking.bookingStatus}</div>
                                    </td> 
                                <td className='px-5'>
                                    <button
                                        onClick={() => toggleExpand(booking.id)}
                                        className="px-4 py-1 text-xs font-bold text-indigo-600 border border-indigo-600 rounded hover:bg-blue-700"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                            {expandedId === booking.id && (
                                <tr>
                                    <td colSpan={5}>
                                        <div className="p-4 grid grid-cols-4 gap-10">
                                            <div className='flex flex-col gap-2'>
                                                <h3>Contact Details</h3>
                                                <div><strong>Price:</strong> {booking.user.phone}</div>
                                                <div><strong>Email:</strong> {booking.user.email}</div>
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <p>Message</p>
                                                <p className='text-sm text-primary_gray leading-5'>{booking.message}</p>
                                             
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <h3>House Details</h3>
                                                <div><strong>Phone:</strong> {house?.price} RWF</div>
                                                {/* <div><strong>description:</strong> {house?.description}</div> */}
                                                <button className='flex items-center text-sm underline gap-1'><Eye fill={'black'} height={'20px'} width={'20px'} stroke={''} strokeWidth={0} />View house</button>

                                                <div className='flex gap-3'>
                                                    <button onClick={() => acceptRequest(booking)} className='flex items-center px-5 py-2 text-sm text-white bg-green-700 rounded gap-1'> <Approved fill={'white'} height={'15px'} width={'15px'} stroke={''} strokeWidth={0} /> Approve</button>
                                                    <button onClick={() => cancelRequest(booking)} className='flex items-center px-5 py-2 text-sm text-white bg-red-500 rounded gap-1'><Declined fill={'white'} height={'15px'} width={'15px'} stroke={''} strokeWidth={0} /> Decline</button>
                                                </div>
                                            </div>

                                            <div className='flex flex-col gap-2 w-[16rem]'>
                                                <img src={house?.coverImageUrl}className='rounded' />
                                                <div className='grid grid-cols-2 gap-2 h-16'>
                                                    <img src={house?.pictures[0].imageUrl} className='rounded max-h-full h-16 w-full' />
                                                    <img src={house?.pictures[1].imageUrl} className='rounded max-h-full h-16 w-full' />


                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RequestTable;



