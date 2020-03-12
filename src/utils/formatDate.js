const dtf = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
  day: '2-digit'
});

export default function formatDate(dateString) {
  const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(
    new Date(dateString)
  );
  return `${da} ${mo} ${ye}`;
}
