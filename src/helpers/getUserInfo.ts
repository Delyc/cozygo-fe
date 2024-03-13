const getUserInfo = (): any => {
    const userInfoString = localStorage.getItem("chat-user") || "";
    if (userInfoString) {
        return JSON.parse(userInfoString);
    }
    return null; 
}

export default getUserInfo;
