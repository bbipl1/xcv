module.exports = {
  getCurrentDateTime: () => {
    const dateNow = new Date();

    // Date and day info in IST
    const dateInIST = new Date(dateNow.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

    const day = dateInIST.getDate().toString().padStart(2, "0");
    const month = (dateInIST.getMonth() + 1).toString().padStart(2, "0");
    const year = dateInIST.getFullYear();
    const dateFormate = `${day}-${month}-${year}`;
    const dayName = dateInIST.toLocaleString("en-US", { weekday: "long", timeZone: "Asia/Kolkata" });
    const monthName = dateInIST.toLocaleString("en-US", { month: "long", timeZone: "Asia/Kolkata" });

    const timeIn12HourFormat = dateInIST.toLocaleTimeString("en-US", {
      hour: "numeric",      // no leading zero
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });

    return { day, dayName, month, monthName, year, dateFormate, timeIn12HourFormat };
  },
};
