const Message =({message}: any) => {
console.log({message})

  const user = JSON.parse(localStorage.getItem('chat-user') || "{}");
  // 
    const fromMe = message.senderId  === user?._id
    // const chatFromMe = 
    return(
        <div className={` w-full flex bg-pink-500 ${fromMe ? 'bg-yellow-500  justify-end ' :'bg-green-500 justify-start'}` }>
{/* <div className="bg-green-500 w-2/5"> */}
            <div>
                <img src="/assets/person.jpeg" className="rounded-full h-12 w-12"/>
            </div>
            <div>
                <p>{message.message}</p>
                <p>12:03 am</p>
            </div>
            {/* </div> */}
        </div>
    )
}

export default Message