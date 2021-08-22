import * as modules from "./modules.js";
var arr;

// 1. Functions part
const resetCols = () => {
  let number_of_els = document.querySelector("#num_of_cols").value;
  arr = modules.generateRandArr(number_of_els);
  modules.drawCols(arr, -1);
}


const bubbleSort = async () => {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] >= arr[j + 1]) {
        modules.swap(arr, j + 1, j);
        modules.drawCols(arr, j + 1);
        // wait time
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, 20)
        );
      }
    }
    // clear highlighted index
    modules.drawCols(arr, -1);
  }
}

const mergeSort = async (arr, l, r, timeDelay) => {
  document.querySelector("button").disabled = true;
  if (l >= r) {
    return;//returns recursively
  }
  var m = l + Math.floor((r - l) / 2);
  await mergeSort(arr, l, m, timeDelay);
  await mergeSort(arr, m + 1, r, timeDelay);
  await modules.merge(arr, l, m, r, timeDelay);
  document.querySelector("button").disabled = false;
}

const heapSort = async () => {
  var n = arr.length;

  // Build heap (rearrange array)
  for (var i = Math.floor(n / 2) - 1; i >= 0; i--) {
    modules.heapify(arr, n, i);
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
      }, 200)
    );

    modules.drawCols(arr, i);

    modules.heapify(arr, i, 0);
  }
  modules.drawCols(arr, -1);
}

const quickSort = (arr) => {

  if (arr.length < 2) return arr;

  // *** lấy phần tử cuối của 'arr' làm 'pivot'
  const pivotIndex = arr.length - 1;
  const pivot = arr[pivotIndex];

  const left = [];
  const right = [];

  let currentItem;
  // *** 'i < pivotIndex' => chúng ta sẽ không loop qua 'pivot' nữa
  for (let i = 0; i < pivotIndex; i++) {
    currentItem = arr[i];

    if (currentItem < pivot) {
      left.push(currentItem);
    } else {
      right.push(currentItem);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

/* This function takes last element as pivot, places
   the pivot element at its correct position in sorted
   array, and places all smaller (smaller than pivot)
   to left of pivot and all greater elements to right
   of pivot */
const partition = async (arr, low, high) => {
  let pivot = arr[high]; // pivot
  let i = low - 1; // Index of smaller element and indicates the right position of pivot found so far

  for (let j = low; j <= high - 1; j++) {
    // If current element is smaller than the pivot
    if (arr[j] < pivot) {
      modules.drawCols(arr, high);
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 200)
      );
      i++; // increment index of smaller element
      modules.swap(arr, i, j);
    }
  }
  modules.swap(arr, i + 1, high);
  return (i + 1);
}

const quickSort2 = async (arr, low, high) => {
  if (low < high) {
    /* pi is partitioning index, arr[p] is now
    at right place */
    let pi = await partition(arr, low, high);

    await quickSort2(arr, low, pi - 1);
    await quickSort2(arr, pi + 1, high);
  }
  modules.drawCols(arr, -1);
}

// 2. Event handler part
document.querySelector("#num_of_cols").oninput = resetCols;

window.addEventListener('DOMContentLoaded', resetCols);

document.querySelector("#generate").onclick = resetCols;

// document.querySelector("#sort").onclick = bubbleSort;

// document.querySelector("#sort").onclick = heapSort;

// document.querySelector("#sort").onclick = () => quickSort2(arr, 0, arr.length - 1);

document.querySelector("#sort").onclick = async () => {
  let time = 100 - parseInt(document.querySelector("#speed").value);
  await mergeSort(arr, 0, arr.length - 1, time);
  modules.drawCols(arr, -1);
};
