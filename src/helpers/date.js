
/**
 * 
 * @param {Date | null} date 
 * @returns {string |null}
 */

export function dateToString(date) {
  if (date === null) return null;

  const dateFormatter = Intl.DateTimeFormat('es-AR', {
    year: "numeric", month: '2-digit', day: '2-digit',
    hour: "2-digit", minute: '2-digit',
  }).format(date);
  return dateFormatter.replace(',', '');
};