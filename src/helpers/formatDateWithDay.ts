function formatDateWithDay(date: any) {
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    let formattedDate = date.toLocaleDateString('en-US', options);
  
    // Extract the day part to append the correct ordinal suffix
    const day = date.getDate();
    let suffix = 'th';
    if (day % 10 === 1 && day !== 11) {
      suffix = 'st';
    } else if (day % 10 === 2 && day !== 12) {
      suffix = 'nd';
    } else if (day % 10 === 3 && day !== 13) {
      suffix = 'rd';
    }
  
    // Replace the numeric part with the numeric + suffix
    formattedDate = formattedDate.replace(/(\d+)(?=\s)/, `$1${suffix}`);
  
    return formattedDate;
  }
  

  export default formatDateWithDay;