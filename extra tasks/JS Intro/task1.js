const findMaxSum = (array) => {
  if (array.length === 0) return 0;

  let maxSum = Math.max.apply(null, array);

  for (let i = 0; i < array.length; i++) {
    for (let k = i; k < array.length; k++) {
      if (array.slice(i, k + 1).reduce((acc, el) => acc + el, 0) > maxSum) {
        maxSum = array.slice(i, k + 1).reduce((acc, el) => acc + el, 0);
      }
    }
  }

  return maxSum;
};

console.log(findMaxSum([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
