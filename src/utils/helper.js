function convertTimestampToDate(timestamp) {
    const date = new Date(timestamp); // Convert timestamp to Date object
    return date.toLocaleString(); // Format the date as a readable string
  }

export default convertTimestampToDate;