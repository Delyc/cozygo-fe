// // components/DoubleMonthCalendar.tsx

// import React, { useState } from 'react';
// import { addMonths } from 'date-fns';
// import Calendar from './Calendar';

// const DoubleMonthCalendar: React.FC = () => {
//   const [currentMonth, setCurrentMonth] = useState(new Date());

//   const nextMonth = () => {
//     setCurrentMonth(addMonths(currentMonth, 1));
//   };

//   const prevMonth = () => {
//     setCurrentMonth(addMonths(currentMonth, -1));
//   };

//   // This could be replaced with your actual data fetching logic
//   const getAppointmentsForMonth = (month: Date): number => {
//     // Dummy data: returns 23 for odd months and 9 for even months
//     return month.getMonth() % 2 ? 23 : 9;
//   };

//   return (
//     <div className="flex flex-col items-center justify-center p-4">
//       <div className="flex space-x-4">
//         <Calendar month={currentMonth} appointments={getAppointmentsForMonth(currentMonth)} />
//         <Calendar month={addMonths(currentMonth, 1)} appointments={getAppointmentsForMonth(addMonths(currentMonth, 1))} />
//       </div>
//       <div className="flex justify-center space-x-4 mt-4">
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150"
//           onClick={prevMonth}
//         >
//           Prev
//         </button>
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150"
//           onClick={nextMonth}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DoubleMonthCalendar;
