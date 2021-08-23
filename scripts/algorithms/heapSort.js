import * as helpers from "../helpers.js"

// To heapify a subtree rooted with node i which is
// an index in arr[]. n is size of heap
const heapify = async (arr, n, i, timeDelay) => {
  var largest = i; // Initialize largest as root
  var l = 2 * i + 1; // left = 2*i + 1
  var r = 2 * i + 2; // right = 2*i + 2

  // If left child is larger than root
  if (l < n && arr[l] > arr[largest])
    largest = l;

  // If right child is larger than largest so far
  if (r < n && arr[r] > arr[largest])
    largest = r;

  // If largest is not root
  if (largest != i) {
    var swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, timeDelay)
    );

    helpers.drawCols(arr, i);

    // Recursively heapify the affected sub-tree
    await heapify(arr, n, largest);
  }
}


export const heapSort = async (arr, timeDelay) => {
  var n = arr.length;

  // Build heap (rearrange array)
  for (var i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(arr, n, i, timeDelay);
  }

  // One by one extract an element from heap
  for (var i = n - 1; i > 0; i--) {
    // Move current root to end
    var temp = arr[0];
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