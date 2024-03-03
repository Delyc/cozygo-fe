const getToken = (): string => {

    return  (`${localStorage.getItem("token")}`);
  
  }
  
  export default getToken