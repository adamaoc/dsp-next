export function timeConvert(time: string) {
  switch (time) {
    case '10':
      return '10:00 am';
    case '15':
      return '3:00 pm';
    case '18':
      return '6:00 pm';
    default:
      return;
  }
}