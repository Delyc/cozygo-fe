function formatDate(messageDate: any) {
    const now = new Date();
    const messageCreatedAt = new Date(messageDate);
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
  
    const isToday = messageCreatedAt.getDate() === now.getDate() &&
                    messageCreatedAt.getMonth() === now.getMonth() &&
                    messageCreatedAt.getFullYear() === now.getFullYear();
  
    const isYesterday = messageCreatedAt.getDate() === yesterday.getDate() &&
                        messageCreatedAt.getMonth() === yesterday.getMonth() &&
                        messageCreatedAt.getFullYear() === yesterday.getFullYear();
  
    if (isToday) {
      return messageCreatedAt.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
    } else if (isYesterday) {
      return 'Yesterday';
    } else {
      return messageCreatedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  }
  

export default formatDate
  