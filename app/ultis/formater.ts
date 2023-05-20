function formatSequence(str: string): string {
  const arr = str.split("").reverse();
  const reverseIndex = arr.findIndex((item) => item !== "0");
  const cutZero = arr.slice(reverseIndex, arr.length);
  return cutZero.reverse().toString().replaceAll(",", "");
}

export const formater = {
  formatSequence,
};
