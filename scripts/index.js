import { mergeSort } from "./algorithms/mergeSort.js";
import { quickSort } from "./algorithms/quickSort.js";
import { heapSort } from "./algorithms/heapSort.js";
import { bubbleSort } from "./algorithms/bubbleSort.js";
import * as helpers from "./helpers.js"

let arr;
let isSorting = false;

// 1. Functions part
const resetCols = () => {
  if (isSorting) {
    return;
  }
  let number_of_els = document.querySelector("#num_of_cols").value;
  arr = helpers.generateRandArr(number_of_els);
  helpers.drawCols(arr, -1);
}

const activate_sort = async () => {
  if (isSorting) {
    return;
  }
  isSorting = true;
  let timeDelay = 200 - parseInt(document.querySelector("#speed").value);
  let algorithm_options = [
    () => bubbleSort(arr, timeDelay),
    () => heapSort(arr, timeDelay),
    () => mergeSort(arr, 0, arr.length - 1, timeDelay),
    () => quickSort(arr, 0, arr.length - 1, timeDelay),
  ];
  let algorithm_to_use = algorithm_options[helpers.set_algorithm()];

  await algorithm_to_use();

  helpers.drawCols(arr, -1);
  isSorting = false;
};


// 2. Event handler part
document.querySelector("#num_of_cols").oninput = resetCols;
window.addEventListener('DOMContentLoaded', resetCols);
document.querySelector("#generate").onclick = resetCols;
document.querySelector("#sort").onclick = activate_sort;

// keypress listener
document.addEventListener('keydown', (event) => {
  let x = event.key;
  if (x === "G" || x === "g") {
    resetCols();
  }
  if (x === "S" || x === "s") {
    activate_sort();
  }
});
