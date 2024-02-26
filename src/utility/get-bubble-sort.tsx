import { TColumnArray } from "../components/sorting-page/sorting-page";
import { TTypeSort } from "../components/sorting-page/sorting-page";
import { ElementStates } from "../types/element-states";

// export const getBubbleSort = (sortingArr: TColumnArray[], metod: TTypeSort) => {
//   let arr = [...sortingArr];

//   for (let i = 0; i <= arr.length - 2; i++) {
//     for (let j = i + 1; j <= arr.length - 1; j++) {
//       if (metod === "up" && arr[i].value > arr[j].value) {
//         [arr[i], arr[j]] = [arr[j], arr[i]];
//       }
//       if (metod === "down" && arr[i].value < arr[j].value) {
//         [arr[i], arr[j]] = [arr[j], arr[i]];
//       }
//     }
//   }
//   return arr
// };

export const getBubbleSort = (sortingArr: TColumnArray[], method: TTypeSort) => {
  //чтобы не созадавать новый массив на каждом вызове bubbleSort
  let arr = [...sortingArr];
  return bubbleSort(arr, method, 0);
};

const bubbleSort = (arr: TColumnArray[], method: TTypeSort, start: number): TColumnArray[] => {
    if (start === arr.length - 1) {
      return arr;
    }
    innerBubbleSort(arr, method, 0);
    return bubbleSort(arr, method, start + 1);
  };

const innerBubbleSort = (arr: TColumnArray[], method: TTypeSort, next: number) => {
    if (next === arr.length - 1) {
      return;
    }
    if (method === "up" && arr[next].value > arr[next + 1].value) {
      [arr[next], arr[next + 1]] = [arr[next + 1], arr[next]];
    }
    if (method === "down" && arr[next].value < arr[next + 1].value) {
      [arr[next], arr[next + 1]] = [arr[next + 1], arr[next]];
    }
    innerBubbleSort(arr, method, next + 1);
  };
  