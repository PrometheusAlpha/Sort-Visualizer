export const generateRandArr = (num) => {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(Math.floor(12 + Math.random() * 165) / 2);
  }
  return arr;
}

export const drawCols = (arr, colored_col_index) => {
  let main = document.querySelector(".main");
  let isSmallNumberOfCols = arr.length <= 25;
  main.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let col = document.createElement("div");
    if (isSmallNumberOfCols) {
      col.innerHTML = arr[i] * 2;
    }
    col.classList.add("el");
    if (i === colored_col_index) {
      col.classList.add("targeted");
    }
    col.style.height = arr[i] + "vh";
    col.style.width = 60 / arr.length + "vw";
    main.appendChild(col);
  }
}

export const swap = (arr, i, j) => {
  let temp = arr[j];
  arr[j] = arr[i];
  arr[i] = temp;
}

export const set_algorithm = () => {
  let radios = document.getElementsByName('algorithm');

  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return i;
    }
  }
}
