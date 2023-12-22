export const formatDateTime = (inputDate) => {
  const date = new Date(inputDate);

  const options = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedDate = formatter.format(date);

  const [datePart, timePart] = formattedDate.split(", ");
  const [month, day, year] = datePart.split("/");
  const formattedTime = timePart.slice(0, -3);

  return `${year}/${month}/${day}, ${formattedTime}`;
};

export const getCurrentDateTime = () => {
  const currentDate = new Date();
  const formattedDateTime = currentDate
    .toISOString()
    .replace("T", " ")
    .slice(0, -1);
  return formattedDateTime;
};

export function formatDateToYYYYMMDD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const getDateInFormat = (date) => {
  var finalDate =
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
  return finalDate;
};

export function getDateFromWeek(year, weekNumber) {
  const januaryFirst = new Date(year, 0, 1);
  const dayOfWeek = januaryFirst.getDay();
  const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
  const firstMonday = new Date(januaryFirst);
  firstMonday.setDate(januaryFirst.getDate() + daysUntilMonday);
  console.log("weekNumber", weekNumber);
  // Calculate the start date of the specified week
  const daysToAdd = (weekNumber - 1) * 7;
  const resultDate = new Date(firstMonday);

  const getFirstMondayOfWeek = resultDate.setDate(
    firstMonday.getDate() + daysToAdd
  );
  const startWeekDate = new Date(getFirstMondayOfWeek);
  startWeekDate.setDate(startWeekDate.getDate() + 6);

  const startDate = getDateInFormat(resultDate);
  const endDate = getDateInFormat(startWeekDate);

  return { startDate, endDate };
}

export const getWeekFromDate = (dateString) => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const year = date.getFullYear();
  const weekNumber = getISOWeekNumber(date);
  const formattedWeek = `${year}-W${weekNumber.toString().padStart(2, "0")}`;

  return formattedWeek;
};

const getISOWeekNumber = (date) => {
  const dt = new Date(date);
  dt.setDate(dt.getDate() + 4 - (dt.getDay() || 7));
  const yearStart = new Date(dt.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((dt - yearStart) / 86400000 + 1) / 7);

  return weekNumber;
};
