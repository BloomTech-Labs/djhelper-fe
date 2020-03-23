const dtf = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
  day: '2-digit'
});

export default function formatDate(dateString) {
  // dateString is in the format 'YYYY-MM-DD'
  const originalDate = new Date(dateString);
  const adjustedDate = new Date(originalDate);
  adjustedDate.setDate(adjustedDate.getDate() + 1);
  const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(
    adjustedDate
  );
  return `${da} ${mo} ${ye}`;
}
