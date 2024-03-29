const getOrdinalIndicator = (day: number): string => {
    const j = day % 10,
          k = day % 100;
    if (j === 1 && k !== 11) {
      return day + "st";
    }
    if (j === 2 && k !== 12) {
      return day + "nd";
    }
    if (j === 3 && k !== 13) {
      return day + "rd";
    }
    return day + "th";
  }
  
  const extractDay = (dateStr: any) => {
    // Parse the date string to a Date object
    const date = new Date(dateStr);
    
    // Extract the day of the week as a short string (e.g., 'Wed')
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
    
    // Extract the day of the month and format it with the ordinal indicator
    const dayOfMonth = getOrdinalIndicator(date.getDate());
    
    // Extract the month as a short string (e.g., 'Mar')
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    
    // Extract the full year
    const year = date.getFullYear();
    
    // Combine them for the final output
    return `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;
  }

 export default extractDay