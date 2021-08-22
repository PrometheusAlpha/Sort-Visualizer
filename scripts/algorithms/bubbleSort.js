import * as helpers from "../helpers.js"

export const bubbleSort = async (arr, timeDelay) => {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] >= arr[j + 1]) {
        helpers.swap(arr, j + 1, j);
        helpers.drawCols(arr, j + 1);
        // wait time
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, timeDelay)
        );
      }
    }
    // clear highlighted index
    helpers.drawCols(arr, -1);
  }
}