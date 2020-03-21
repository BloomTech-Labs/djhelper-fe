export default function formatDateForInput(dateString) {
  // "2020-03-20T00:00:00.000Z" -> "yyyy-MM-dd"
  if (dateString.length === 24) {
    return dateString.slice(0, 10);
  }
  return dateString;
}
