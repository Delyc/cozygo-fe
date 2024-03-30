import { useFetchBookingRequestsQuery } from "@/redux/api/apiSlice";
import RequestTable from "../UI/table/RequestTable"

const AllRequests = () => {
  const { data: bookingRequests, isLoading: fetchingBookingRequests } = useFetchBookingRequestsQuery('fetch');

    return(

        <>
<div className=" w-full px-20 py-10">
<RequestTable />

</div>


        </>
    )
}

export default AllRequests