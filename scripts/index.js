import { mergeSort } from "./algorithms/mergeSort.js";
import { quickSort } from "./algorithms/quickSort.js";
import { heapSort } from "./algorithms/heapSort.js";
import { bubbleSort } from "./algorithms/bubbleSort.js";
import * as helpers from "./helpers.js"

var arr;

// 1. Functions part
const resetCols = () => {
  let number_of_els = document.querySelector("#num_of_cols").value;
  arr = helpers.generateRandArr(number_of_els);
  helpers.drawCols(arr, -1);
}


// 2. Event handler part
document.querySelector("#num_of_cols").oninput = resetCols;
window.addEventListener('DOMContentLoaded', resetCols);
document.querySelector("#generate").onclick = resetCols;

document.querySelector("#sort").onclick = async () => {
  let timeDelay = 200 - parseInt(document.querySelector("#speed").value);
  let algorithm_options = [
    () => bubbleSort(arr, timeDelay),
    () => heapSort(arr, timeDelay),
    () => mergeSort(arr, 0, arr.length - 1, timeDelay),
    () => quickSort(arr, 0, arr.length - 1, timeDelay),
  ];

  let algorithm_to_use = algorithm_options[helpers.set_algorithm()];
  
  document.querySelectorAll("button, input").forEach(i => i.disabled = true);
  await algorithm_to_use();
  document.querySelectorAll("button, input").forEach(i => i.disabled = false);

  helpers.drawCols(arr, -1);
};
