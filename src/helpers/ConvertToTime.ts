const  extractTime =(dateTime:any) => {
    // Parse the date string to a Date object
    const date = new Date(dateTime);
    
    // Extract the time in HH:MM AM/PM format
    const options: any = { hour: 'numeric', minute: 'numeric', hour12: true };
    const time = date.toLocaleTimeString('en-US', options);
    
    return time;
  }

  export default extractTime