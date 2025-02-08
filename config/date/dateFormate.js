module.exports = {
  getCurrentDateTime: () => {
    const dateNow = new Date();
    const day = dateNow.getDate().toString().padStart(2, "0");
    const month = (dateNow.getMonth() + 1).toString().padStart(2, "0");
    const year = dateNow.getFullYear();
    const dateFormate = `${day}-${month}-${year}`;
    const dayName = dateNow.toLocaleString("en-US", { weekday: "long" });
    const monthName = dateNow.toLocaleString("en-US", { month: "long" });

    const timeIn12HourFormat = dateNow.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Use 12-hour clock (AM/PM)
    });

    return { day, dayName, month, monthName, year, dateFormate, timeIn12HourFormat };
  },
};
