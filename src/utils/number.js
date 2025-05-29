export const isNumber = (num) => {
  if (
    !isNaN(num) &&
    num != null &&
    num != undefined &&
    num != Infinity &&
    typeof num == "number"
  )
    return num;
  return false;
};
