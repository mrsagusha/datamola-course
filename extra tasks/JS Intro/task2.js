const findMaxProfit = (prices) => {
  const profitArrays = [];
  let currentIndex = null;

  for (let i = 0; i < prices.length; i++) {
    if (prices[i + 1] > prices[i]) {
      if (currentIndex === null) {
        currentIndex = i;
      }
    } else {
      if (currentIndex !== null) {
        profitArrays.push(prices.slice(currentIndex, i + 1));
        currentIndex = null;
      }
    }
  }

  return profitArrays.reduce((acc, el) => acc + (el[el.length - 1] - el[0]), 0);
};

console.log(findMaxProfit([1, 7, 13, 6, 1, 5, 5, 3, 3, 6, 8]));
