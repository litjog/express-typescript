export default function getCurrentDate(): string {
  const d = new Date();

  return [
    ...[d.getDate(), d.getMonth() + 1].map((n) => (n < 10 ? `0${n}` : n)),
    d.getFullYear(),
  ].join('-');
}
