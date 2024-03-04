import { useState } from 'react';
import Select from 'react-select';

const PropertyActions = ({price}: any) => {
  const [activeTab, setActiveTab] = useState('bookTour');
  const appointment = [
    { value: '', label: '15th July 2024 5:00PM' },
    { value: '1', label: '15th July 2024 5:00PM' },
    { value: '2', label: '15th July 2024 5:00PM' },
    { value: '3', label: '15th July 2024 5:00PM' },
  ];

  const [formData, setFormData] = useState({

    appointmentDate: '', 
  });

  return (
    <div className="w-full md:w-[24rem] mx-auto p-6 bg-white shadow-md">
      <h2 className="text-lg mb-4 text-xs text-primary_gray">Property for rent</h2>
      <p className="text-5xl mb-6">{price} USD</p>
      <div className="flex  border-b mb-6">
        <button
          className={`flex-1 pb-2 text-start ${activeTab === 'bookTour' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('bookTour')}
        >
          Book a Tour
        </button>
        <button
          className={`flex-1 pb-2 text-start ${activeTab === 'requestQuote' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('requestQuote')}
        >
          Request Quote
        </button>
      </div>
      {activeTab === 'bookTour' ? (
        // Form for booking a tour
        <form className="space-y-4">
        
          <Select
          id="accountType"
          name="accountType"
          value={appointment.find(option => option.value === formData.appointmentDate)}
        //   onChange={handleSelectChange}
          options={appointment}
          classNamePrefix="select"
      // setFormError={setFormError}
      // schema={accountSchema}
          
        />
                    <textarea className="w-full text-xs border p-2 h-24" placeholder="Additional Message here" />

          <button className="w-full bg-indigo-600 text-white p-2 rounded">Book a Tour</button>
        </form>
      ) : (
        // Form for requesting a quote
        <form className="space-y-4">
          <textarea className="w-full border p-2" placeholder="Your Message" />
          <input className="w-full border p-2" type="email" placeholder="Enter your Email" />
          <button className="w-full bg-blue-500 text-white p-2 rounded">Request Quote</button>
        </form>
      )}
    </div>
  );
};

export default PropertyActions;
