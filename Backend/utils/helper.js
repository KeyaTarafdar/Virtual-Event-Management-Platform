module.exports.formateDate = (date) => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();

  return `${day}/${month}/${year}`;
}
