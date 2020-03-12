const dtf = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
  day: '2-digit'
});

export default function formatDate(dateString) {
  // dateString is in the format 'YYYY-MM-DD'
  const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(
    new Date(dateString)
  );
  return `${da} ${mo} ${ye}`;
}
