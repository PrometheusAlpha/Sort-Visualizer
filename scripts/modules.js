export const generateRandArr = (num) => {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(Math.floor(1 + Math.random() * 89));
  }
  return arr;
}

export const drawCols = (arr, colored_col_index) => {
  let main = document.querySelector(".main");
  main.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let col = document.createElement("div");
    col.classList.add("el");
    if (i === colored_col_index) {
      col.classList.add("targeted");
    }
    col.style.height = arr[i] + "vh";
    col.style.width = 40 / arr.length + "vw";
    main.appendChild(col);
  }
}

export const swap = (arr, i, j) => {
  let temp = arr[j];
  arr[j] = arr[i];
  arr[i] = temp;
}

export const merge = async (arr, l, m, r, timeDelay) => {
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
      // arr[k] = L[i];
      i++;
    }
    else {
      insert_and_delete(arr, R[j], k, l, r);
      // arr[k] = R[j];
      j++;
    }
    drawCols(arr, k);
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
    drawCols(arr, k);
    insert_and_delete(arr, L[i], k, l, r);

    // arr[k] = L[i];
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
    drawCols(arr, k);
    insert_and_delete(arr, R[j], k, l, r);

    // arr[k] = R[j];
    j++;
    k++;
  }
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


// To heapify a subtree rooted with node i which is
// an index in arr[]. n is size of heap
export const heapify = (arr, n, i) => {
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

    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest);
  }
}