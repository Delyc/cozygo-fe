
import React from 'react';
import Calendar from './Calendar';

const Appointments: React.FC = () => {
  const currentMonth = new Date().getMonth(); // Get current month
  const currentYear = new Date().getFullYear(); // Get current year

  return (
    <div className="container mx-auto   p-4 flex ">
      <Calendar  />
    </div>
  );
};

export default Appointments;
