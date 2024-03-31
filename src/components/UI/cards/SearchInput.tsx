
import { Search } from "@/components/svgs/Heart";
import React from "react";


const SearchInput = () => {
	return (
		<form className='flex w-full items-center gap-2 relative'>
			<input type='text' placeholder='Search agent ...' className='input input-bordered w-full outline-none rounded-full py-2 px-6' />
			<button type='submit' className='btn btn-circle text-white absolute right-2'>
				<Search fill={"#757B8D"} height={"30px"} width={"30px"} stroke={"#757B8D"} strokeWidth={0} />
			</button>
		</form>
	);
};
export default SearchInput;