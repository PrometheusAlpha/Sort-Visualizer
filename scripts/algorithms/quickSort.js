import * as helpers from "../helpers.js"

/* This function takes last element as pivot, places
the pivot element at its correct position in sorted
array, and places all smaller (smaller than pivot)
to left of pivot and all greater elements to right
of pivot */
const partition = async (arr, low, high, timeDelay) => {
  let pivot = arr[high]; // pivot
  // Start index of smaller elements and indicates the right position of pivot found so far
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    // If current element is smaller than the pivot
    if (arr[j] < pivot) {
      await new Promise((resolve) =>
        setTimeout(() => resolve(), timeDelay)
      );
      helpers.drawCols(arr, j);
      i++; // increment index of smaller element
      helpers.swap(arr, i, j);
    }
  }
  helpers.swap(arr, i + 1, high);
  return (i + 1);
}

export const quickSort = async (arr, low, high, timeDelay) => {
  if (low < high) {
    /* pi is partitioning index, arr[p] is now
    at right place */
    let pi = await partition(arr, low, high);
    await new Promise((resolve) =>
      setTimeout(() => resolve(), timeDelay)
    );
    await quickSort(arr, low, pi - 1, timeDelay);
    await quickSort(arr, pi + 1, high, timeDelay);
  }
  helpers.drawCols(arr, -1);
}