export const numberToPrice = (num: number) => {
  if (typeof num !== 'number') {
    console.error('input is not a number');
  }
  return new Intl.NumberFormat('en-US').format(num);
};
