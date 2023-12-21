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
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}


export const getWeekFromDate = (dateString) => {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }
  const year = date.getFullYear();
  const weekNumber = getISOWeekNumber(date);
  const formattedWeek = `${year}-W${weekNumber.toString().padStart(2, '0')}`;

  return formattedWeek;
}
const getISOWeekNumber = (date) => {
  const onejan = new Date(date.getFullYear(), 0, 1);
  const daysInYear = Math.floor((date - onejan) / 86400000);
  return Math.ceil((date.getDay() + 1 + daysInYear) / 7);
}