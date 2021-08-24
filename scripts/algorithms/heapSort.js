import * as helpers from "../helpers.js"

// To heapify a subtree rooted with node i which is
// an index in arr[]. n is size of heap
const heapify = async (arr, size, i, timeDelay) => {
  let largest = i; // Initialize largest as root
  let l = 2 * i + 1; // left = 2*i + 1
  let r = 2 * i + 2; // right = 2*i + 2

  // If left child is larger than root
  if (l < size && arr[l] > arr[largest])
    largest = l;

  // If right child is larger than largest so far
  if (r < size && arr[r] > arr[largest])
    largest = r;

  // If largest is not root
  if (largest != i) {
    let swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, timeDelay)
    );

    helpers.drawCols(arr, i);

    // Recursively heapify the affected sub-tree
    await heapify(arr, size, largest);
  }
}


export const heapSort = async (arr, timeDelay) => {
  let length = arr.length;

  // Build heap (rearrange array)
  for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
    await heapify(arr, length, i, timeDelay);
  }

  // One by one extract an element from heap
  for (let i = length - 1; i > 0; i--) {
    // Move current root to end
    let temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, timeDelay)
    );

    await heapify(arr, i, 0, timeDelay);
  }
  helpers.drawCols(arr, -1);
}