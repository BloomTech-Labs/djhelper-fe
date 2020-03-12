export default function formatTime(timeString) {
  // timeString is in format of 'hh:mm' in a 24hr format
  const splitter = timeString.indexOf(':');
  let hours = timeString.slice(0, splitter);
  let end = 'am';
  if (hours > 12) {
    hours -= 12;
    end = 'pm';
  }
  const minutes = timeString.slice(splitter);
  const together = `${hours}${minutes}${end}`;
  return together;
}
