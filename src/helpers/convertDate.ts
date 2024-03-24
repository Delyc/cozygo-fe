export function convertDateToReadableFormat(dateString: any) {
    const date = new Date(dateString);
  
    const monthNames = [
      "January", "February", "March",
      "April", "May", "June",
      "July", "August", "September",
      "October", "November", "December"
    ];
  
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    return `${month} ${year}`;
  }
  
//   // Example usage:
//   const dateString = "2024-03-16T18:59:14.486643";
//   const readableDate = convertDateToReadableFormat(dateString);
  
//   console.log(readableDate); // Output: March 2024
  