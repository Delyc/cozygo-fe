import { Approved, Declined, Eye, FilterIcon, HeartIcon, Message } from '@/components/svgs/Heart';
import extractTime from '@/helpers/ConvertToTime';
import extractDay from '@/helpers/extractToDay';
import { useFetchBookingRequestsQuery, useFetchSingleHouseQuery, useUpdateAvailabilityMutation, useUpdateBookingRequestMutation } from '@/redux/api/apiSlice';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { set } from 'zod';

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
    const [showStatusActions, setShowStatusActions] = useState<boolean>(false);
    const { data: bookingRequests, isLoading: fetchingBookingRequests } = useFetchBookingRequestsQuery('fetch');
    const itemsPerPage = 11;
    const [currentPage, setCurrentPage] = useState(1);
  const totalItems = bookingRequests?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = bookingRequests?.slice(startIndex, endIndex);
const [bookedHouseId, setBookedHouseId] = useState()
  const setPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Generating page numbers for navigation
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginationRange = (currentPage: number, totalPages: number) => {
    let range = [];
    if (totalPages <= 5) {
      // Less than 5 total pages so show all
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      // More than 5 total pages, calculate range
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      range.push(1); // Always include the first page
      if (start > 2) {
        range.push('...'); // Ellipsis to indicate skipped pages
      }
      
      for (let i = start; i <= end; i++) {
        range.push(i);
      }
      
      if (end < totalPages - 1) {
        range.push('...'); // Ellipsis to indicate skipped pages
      }
      range.push(totalPages); // Always include the last page
    }
    return range;
  };
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

    useEffect(() => {
        currentItems?.map((booking: any) => {
            console.log("testtttt", booking.houseId)
            setBookedHouseId(booking.houseId)
        })
    }, [currentItems])
   
    // const { data: house } = useFetchSingleHouseQuery(String(houseId));

     const { data: house } = useFetchSingleHouseQuery(String(bookedHouseId));

     console.log("bookedddd", house)



    const cancelRequest = async (booking: any) => {

        try {
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
        } catch (err) {
            console.log(err)
        }
    };


    const acceptRequest = async (booking: any) => {
        const bookingId = booking.id;
        const availabilityId = booking.availability.id;
        try {
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

        } catch (err) {
            console.log(err)
        }
    };

    const declineRequest = (bookingRequests?.filter((booking: any) => booking.bookingStatus === 'cancelled'));
    const acceptedRequest = (bookingRequests?.filter((booking: any) => booking.bookingStatus === 'accepted'));
    const pendingRequest = (bookingRequests?.filter((booking: any) => booking.bookingStatus === 'pending'));
    //  console.log("declineRequest", declineRequest?.length)

    const sortClicked = () => {
        console.log("sort clicked")
        setShowStatusActions(!showStatusActions)
    }

    const sortPending = () => {
        console.log("sort pending")
        bookingRequests?.filter((booking: any) => booking.bookingStatus === 'pending')
        setShowStatusActions(false)
    }

    const districts: any[] = [
        { value: "gasabo", label: "Gasabo" },
        { value: "nyarugenge", label: "Nyarugenge" },
        { value: "kicukiro", label: "Kicukiro" },
    ];


    const [selectedDistrict, setSelectedDistrict] = useState<any | null>(null);

    const handleSelectDistrict = (option: any | null) => {
        setSelectedDistrict(option);

    };

    const pageRange = paginationRange(currentPage, totalPages);
    return (
        <div className="flex flex-col overflow-x-scroll w-full gap-5">
            <ToastContainer />
            <div className='grid grid-cols-2 md:grid-cols-4  gap-5 lg:gap-10'>
                <RequestsCountingsCrad number={bookingRequests?.length} description={"total requests"} status="all" />
                <RequestsCountingsCrad number={pendingRequest?.length} description={"Pending requests"} status="pending" />
                <RequestsCountingsCrad number={acceptedRequest?.length} description={"Accepted  requests"} status="accepted" />
                <RequestsCountingsCrad number={declineRequest?.length} description={"Rejected requests"} status={"cancelled"} />
            </div>
            {/* <div className='bg-white px-10 rounded w-full flex items-center justify-between gap-4 py-2'>
                <input placeholder='Search by name ...' className='outline-none' />
                <Select
                    className=' text-sm w-[10rem]'
                    value={selectedDistrict}
                    onChange={handleSelectDistrict}
                    options={districts}
                    placeholder="District..."
                />

                <Select
                    className=' text-sm w-[10rem]'
                    value={selectedDistrict}
                    onChange={handleSelectDistrict}
                    options={districts}
                    placeholder="Day..."
                />
                <Select
                    className=' text-sm w-[10rem]'
                    value={selectedDistrict}
                    onChange={handleSelectDistrict}
                    options={districts}
                    placeholder="Time slot..."
                />
                <Select
                    className=' text-sm w-[10rem]'
                    value={selectedDistrict}
                    onChange={handleSelectDistrict}
                    options={districts}
                    placeholder="Status..."
                />
                <button className='text-white text-sm flex items-center gap-2 bg-indigo-600 px-6 py-2 rounded'><FilterIcon fill={''} height={'20px'} width={'20px'} stroke={'white'} strokeWidth={1} />Filter</button>
            </div> */}
            <table className="bg-white  max-w-[10rem]  overflow-x-scroll shadow-3xl rounded-md">
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
                        <th scope="col" className="px-6 py-3 relative text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Status
                            <button onClick={sortClicked}>sort</button>
                            {showStatusActions && <div className='absolute bg-white shadow-lg rounded-md right-0'>
                                <p>Sort by</p>
                                <button onClick={sortPending}>pending</button>
                                <p>accepted</p>
                                <p>cancelled</p></div>}
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

                    {currentItems?.map((booking: any, index: number) => {




return (
    <React.Fragment key={index} >
        <tr className='border' >
            <td className='px-5 py-2'>{booking?.user?.fullname}</td>
            <td className='px-5'>{"Gasabo"}</td>
            <td className='px-5'>{extractDay(booking?.availability.startTime)}</td>
            <td className='px-5'>{extractTime(booking.availability.startTime)} - {extractTime(booking.availability.endTime)}</td>
            <td className='px-5'>
                <div className={`${booking.bookingStatus === 'pending' ? ' text-yellow-500 brder ' : booking.bookingStatus === 'accepted' ? ' text-green-500' : ' text-red-500'} flex items-center gap-2 rounded-2xl r w-20 text-xs `}><div className={`${booking.bookingStatus === 'pending' ? ' bg-yellow-500  ' : booking.bookingStatus === 'accepted' ? 'bg-green-500' : 'bg-red-500'} w-1.5 h-1.5 rounded-full`}></div>{booking.bookingStatus}</div>
            </td>
            <td className='px-5'>
                <button
                    onClick={() => toggleExpand(booking.id)}
                    className="px-4 py-1 text-xs  bg-indigo-600/20 text-indigo-600  rounded hover:bg-blue-700"
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
                            <div><strong>Phone:</strong> {booking.user.phone}</div>
                            <div><strong>Email:</strong> {booking.user.email}</div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p>Message</p>
                            <p className='text-sm text-primary_gray leading-5'>{booking.message}</p>

                        </div>

                        <div className='flex flex-col gap-2'>
                            <h3>House Details</h3>
                            <div><strong>price:</strong> {house?.price} RWF</div>
                            {/* <div><strong>description:</strong> {house?.description}</div> */}
                            <button className='flex items-center text-sm underline gap-1'><Eye fill={'black'} height={'20px'} width={'20px'} stroke={''} strokeWidth={0} />View house</button>

                            <div className='flex gap-3'>
                                <button onClick={() => acceptRequest(booking)} className='flex items-center px-5 py-2 text-sm text-white bg-green-700 rounded gap-1'> <Approved fill={'white'} height={'15px'} width={'15px'} stroke={''} strokeWidth={0} /> Approve</button>
                                <button onClick={() => cancelRequest(booking)} className='flex items-center px-5 py-2 text-sm text-white bg-red-500 rounded gap-1'><Declined fill={'white'} height={'15px'} width={'15px'} stroke={''} strokeWidth={0} /> Decline</button>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 w-[16rem]'>
                            <img src={house?.coverImageUrl} className='rounded' />
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
)

                    })
                    
                    }
                </tbody>
            </table>
                                <div className="flex justify-center items-center gap-4 my-4">
                <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage <= 1}>
                    Prev
                </button>
                {pageRange.map((number: number | string, index: number) => (
                    <button
                        key={index}
                        onClick={() => typeof number === 'number' && setPage(number)}
                        className={`px-4 py-2 ${currentPage === number ? 'bg-blue-500 text-white' : number === '...' ? 'bg-transparent' : 'bg-gray-200 text-gray-700'}`}
                        disabled={number === '...'}
                    >
                        {number}
                    </button>
                ))}
                <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage >= totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default RequestTable;



const RequestsCountingsCrad = ({ number, description, status }: any) => {
    return (
        <div className='rounded bg-white shadow flex items-center gap-3 px-5 py-5'>
            <div className={`${status === 'pending' ? ' bg-yellow-500/20' : status === 'accepted' ? ' bg-green-500/10' : status === 'cancelled' ? ' bg-red-500/10' : 'bg-blue-500/20'} h-12 w-12 grid place-content-center rounded`}>
                {status === 'pending' ? <HeartIcon fill={''} height={'20px'} width={'20px'} stroke={'yellow'} strokeWidth={1} /> : status === 'accepted' ? <HeartIcon fill={''} height={'20px'} width={'20px'} stroke={''} strokeWidth={0} /> : <HeartIcon fill={''} height={'20px'} width={'20px'} stroke={''} strokeWidth={0} />}
            </div>
            <div>
                <h1 className='text-3xl text-primary_gray'>{number}</h1>
                <p className='text-primary_gray'>{description}</p>
            </div>
        </div>
    );
}