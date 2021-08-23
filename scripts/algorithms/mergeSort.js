import * as helpers from "../helpers.js";

export const mergeSort = async (arr, l, r, timeDelay) => {
  if (l >= r) {
    return;//returns recursively
  }
  var m = l + Math.floor((r - l) / 2);
  await mergeSort(arr, l, m, timeDelay);
  await mergeSort(arr, m + 1, r, timeDelay);
  await merge(arr, l, m, r, timeDelay);
}

const insert_and_delete = (arr, value, pos, left, right) => {
  for (let i = right; i >= left; i--) {
    if (arr[i] == value) {
      arr.splice(i, 1);
      break;
    }
  }
  arr.splice(pos, 0, value);
}

const merge = async (arr, l, m, r, timeDelay) => {
  var n1 = m - l + 1;
  var n2 = r - m;

  // Create temp arrays
  var L = new Array(n1);
  var R = new Array(n2);

  // Copy data to temp arrays L[] and R[]
  for (var i = 0; i < n1; i++) {
    L[i] = arr[l + i];
  }
  for (var j = 0; j < n2; j++) {
    R[j] = arr[m + 1 + j];
  }

  // Merge the temp arrays back into arr[l..r]

  // Initial index of first subarray
  var i = 0;
  // Initial index of second subarray
  var j = 0;
  // Initial index of merged subarray
  var k = l;

  while (i < n1 && j < n2) {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, timeDelay)
    );

    if (L[i] <= R[j]) {
      insert_and_delete(arr, L[i], k, l, r);
      i++;
    }
    else {
      insert_and_delete(arr, R[j], k, l, r);
      j++;
    }
    helpers.drawCols(arr, k);
    k++;
  }

  // Copy the remaining elements of
  // L[], if there are any
  while (i < n1) {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, timeDelay)
    );
    helpers.drawCols(arr, k);
    insert_and_delete(arr, L[i], k, l, r);
    i++;
    k++;
  }

  // Copy the remaining elements of
  // R[], if there are any
  while (j < n2) {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, timeDelay)
    );
    helpers.drawCols(arr, k);
    insert_and_delete(arr, R[j], k, l, r);
    j++;
    k++;
  }
}
