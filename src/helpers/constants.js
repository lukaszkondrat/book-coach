export const today = new Date().toISOString();

export const businessHours = [
  {
    daysOfWeek: [1, 2, 3, 4, 5],
    startTime: "07:00",
    endTime: "21:00",
  },
];

export const businessHoursStart = +businessHours[0].startTime.slice(0, 2);
export const businessHoursEnd = +businessHours[0].endTime.slice(0, 2);
