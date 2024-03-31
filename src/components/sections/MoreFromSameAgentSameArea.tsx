import { useState } from 'react';
import Select from 'react-select';
import PropertyCard from '../UI/cards/House';
import { useFetchHousesQuery } from '@/redux/api/apiSlice';
import { Next, Prev } from '../svgs/Heart';
import { convertDateToReadableFormat } from '@/helpers/convertDate';
import BookVisitModal from '../modals/BookVisitModal';
import ShareHouseModal from '../modals/ShareHouseModal';

const FromSameAgentSameArea = ({ price, agentId }: any) => {
  const { isLoading, data } = useFetchHousesQuery("iii");

  const [activeTab, setActiveTab] = useState('similarHouses');
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const filteredHouses = data?.filter((house) => house.agentId === Number(agentId)) || [];
  const maxIndex = Math.ceil(filteredHouses && filteredHouses.length / itemsPerPage) - 1;
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : maxIndex));
  };

  const currentHouses = filteredHouses.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );
  const appointment = [
    { value: '', label: '15th July 2024 5:00PM' },
    { value: '1', label: '15th July 2024 5:00PM' },
    { value: '2', label: '15th July 2024 5:00PM' },
    { value: '3', label: '15th July 2024 5:00PM' },
  ];

  const [formData, setFormData] = useState({

    appointmentDate: '',
  });

  const [shareLink, setShareLink] = useState('');
  const [shareHouse, setShareHouse] = useState(false);
  // const [agentId, setAgentId] = useState();
  const generateShareLink = async (id: any) => { 
    try {
      const response = await fetch(`http://localhost:8080/public/share/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const link = data.shareLink;
      setShareLink(link);
      navigator.clipboard.writeText(link)
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  const copyLinkAgain = () => {
    navigator.clipboard.writeText(shareLink);
    alert('Link copied to clipboard!');
  };
  const { isLoading: loader, data : any} = useFetchHousesQuery("iii");
  const [bookTour, setBookTour] = useState(false);

  const onCloseBookingModal = () =>{
    setBookTour(false)
  }

  const onCloseShareModal = () =>{
    setShareHouse(false)
  }
 
  const stopScrollingWhenShareHouse = (shareHouse: any) => {
    if (shareHouse) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  const [ToVisitHouse, setToVisitHouse] = useState<any>();

  return (
    <div className="w-full  bg-slate-100 pb-20">
      <div className=' max-w-[80rem] mx-auto py-20 flex flex-col items-center'>


        <div className='flex flex-col gap-2.5 items-center'>
          <h3 className='font-semibold text-3xl'>More Available In The Same Area</h3>
          <p className='text-primary_gray text-sm leading-6 w-1/2 text-center'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry{"'"}s standard dummy text ever since the 1500s</p>
        </div>
        <div className="flex  border-b mb-6 w-2/5 mt-10 gap-10">
          <button
            className={`flex-1 pb-2 text-start ${activeTab === 'similarHouses' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('similarHouses')}
          >
            Similar Houses
          </button>
          <button
            className={`flex-1 pb-2 text-start ${activeTab === 'similarAgent' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('similarAgent')}
          >
            From same agent
          </button>
        </div>
        {activeTab === 'similarHouses' ? (
          <div className="w-full  px-16 lg:px-20 mx-auto grid  lg:grid-cols-3 gap-5 ">
            {
              data?.slice(-3).map((house, index) => (
                <PropertyCard
                    key={index}
                    bedrooms={house.bedRooms}
                    baths={Number(house.bathRooms)}
                    area={Number(house.area)}
                    price={Number(house.price)}
                    title={house.title}
                    description={house.description}
                    id={house.id} coverImage={house.coverImageUrl}
                    onShare={() => {
                      generateShareLink(house.id);
                      setShareHouse(!shareHouse)

                    } }

                    onBookVisit={() => {
                      setToVisitHouse(house);
                      setBookTour(!bookTour)
                    }
                    }
              
                    lastUpdated={convertDateToReadableFormat(house.updatedAt)} setBookTour={setBookTour}  bookTour={bookTour}   setShareHouse={setShareHouse}   shareHouse={shareHouse}     
                    />

              ))
            }
 {bookTour && <BookVisitModal onCloseBookingModal={onCloseBookingModal} ToVisitHouse={ToVisitHouse} />}

{shareHouse &&  <ShareHouseModal onCloseShareModal={onCloseShareModal} shareLink={shareLink} copyLinkAgain={copyLinkAgain} />}

          </div>
        ) : (
          <div className='relative'>

            <div className=" px-16 grid grid-cols-3 gap-4 w-full">
              {currentHouses.length > 0 ? (
                currentHouses.map((house, index) => (
                  <PropertyCard
                  key={index}
                  bedrooms={house.bedRooms}
                  baths={Number(house.bathRooms)}
                  area={Number(house.area)}
                  price={Number(house.price)}
                  title={house.title}
                  description={house.description}
                  id={house.id} coverImage={house.coverImageUrl}
                  onShare={() => {
                    generateShareLink(house.id);
                    setShareHouse(!shareHouse)

                  } }

                  onBookVisit={() => {
                    setToVisitHouse(house);
                    setBookTour(!bookTour)
                  }
                  }
            
                  lastUpdated={convertDateToReadableFormat(house.updatedAt)} setBookTour={setBookTour}  bookTour={bookTour}   setShareHouse={setShareHouse}   shareHouse={shareHouse}     
                  />
               
               
                    ))

                
              ) : (
                
                <div className="col-span-3">No properties available.</div>

                
              )}
               {bookTour && <BookVisitModal onCloseBookingModal={onCloseBookingModal} ToVisitHouse={ToVisitHouse} />}

{shareHouse &&  <ShareHouseModal onCloseShareModal={onCloseShareModal} shareLink={shareLink} copyLinkAgain={copyLinkAgain} />}

            </div>
           
            <div className="flex  absolute justify-between top-1/2 w-full">
              <button
                onClick={handlePrev}
                className="animate-bounce flex items-start text-gray-800 rounded  disabled:bg-gray-200 disabled:animate-none"
                disabled={currentIndex <= 0}
              >
                <Prev fill={'#4f46e5'} height={'30px'} width={'30px'} stroke={''} strokeWidth={0} />

              </button>
              <button
                onClick={handleNext}
                className="animate-bounce flex items-end text-gray-800 rounded  disabled:bg-gray-200 disabled:animate-none"
                disabled={currentIndex >= maxIndex}
              >
                <Next fill={'#4f46e5'} height={'30px'} width={'30px'} stroke={''} strokeWidth={0} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FromSameAgentSameArea;
