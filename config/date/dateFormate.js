module.exports = {
  getCurrentDateTime: () => {
    const dateNow = new Date();

    const options = { timeZone: "Asia/Kolkata" };
    const locale = "en-IN";

    const day = new Intl.DateTimeFormat(locale, { ...options, day: "2-digit" }).format(dateNow);
    const month = new Intl.DateTimeFormat(locale, { ...options, month: "2-digit" }).format(dateNow);
    const year = new Intl.DateTimeFormat(locale, { ...options, year: "numeric" }).format(dateNow);
    const dayName = new Intl.DateTimeFormat("en-US", { ...options, weekday: "long" }).format(dateNow);
    const monthName = new Intl.DateTimeFormat("en-US", { ...options, month: "long" }).format(dateNow);

    const timeIn12HourFormat = dateNow.toLocaleTimeString("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });

    const dateFormate = `${day}-${month}-${year}`;

    return { day, dayName, month, monthName, year, dateFormate, timeIn12HourFormat };
  },
};
