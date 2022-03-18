export const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getHours = (start, end) => {
  var start_hours =
    start.includes("pm") && !start.includes("12")
      ? Number(start.match(/^(\d+)/)[1]) + 12
      : Number(start.match(/^(\d+)/)[1]);
  var start_minutes = Number(start.match(/:(\d+)/)[1]);
  var end_hours =
    end.includes("pm") && !end.includes("12")
      ? Number(end.match(/^(\d+)/)[1]) + 12
      : Number(end.match(/^(\d+)/)[1]);
  var end_minutes = Number(end.match(/:(\d+)/)[1]);

  var min_diff =
    end_hours * 60 + end_minutes - (start_hours * 60 + start_minutes);
  var hour_diff = Math.floor(min_diff / 60);

  return { hours: hour_diff, minutes: min_diff - hour_diff * 60 };
};
