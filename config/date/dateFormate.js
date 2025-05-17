module.exports = {
  getCurrentDateTime: () => {
    // Get current UTC time and convert to IST (+5:30)
    const dateNow = new Date();
    const utcTime = dateNow.getTime() + dateNow.getTimezoneOffset() * 60000;
    const istOffset = 5.5 * 60 * 60000; // 5 hours 30 minutes in milliseconds
    const istTime = new Date(utcTime + istOffset);

    const day = istTime.getDate().toString().padStart(2, "0");
    const month = (istTime.getMonth() + 1).toString().padStart(2, "0");
    const year = istTime.getFullYear();
    const dateFormate = `${day}-${month}-${year}`;
    const dayName = istTime.toLocaleString("en-US", { weekday: "long", timeZone: "Asia/Kolkata" });
    const monthName = istTime.toLocaleString("en-US", { month: "long", timeZone: "Asia/Kolkata" });

    const timeIn12HourFormat = istTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });

    return { day, dayName, month, monthName, year, dateFormate, timeIn12HourFormat };
  },
};
