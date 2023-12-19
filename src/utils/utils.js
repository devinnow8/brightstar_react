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