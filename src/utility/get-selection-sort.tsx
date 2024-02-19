import { TColumnArray } from "../components/sorting-page/sorting-page";
import { TTypeSort } from "../components/sorting-page/sorting-page";
import { ElementStates } from "../types/element-states";

// export const getSelectionSorted = (sortingArr: TColumnArray[], typeSort: TTypeSort) => {
//     let arr = [...sortingArr];
//     let metod = typeSort
  
//     for (let i = 0; i < arr.length - 1; i++) {
//       let maxValueIndex = i;
//       for (let j = i + 1; j < arr.length; j++) {

//         if(metod === "up") {
//           if (arr[j].value < arr[maxValueIndex].value) {
//             maxValueIndex = j;
//           }
//         } else if(metod === "down") {
//           if (arr[j].value > arr[maxValueIndex].value) {
//             maxValueIndex = j;
//           }
//         } else {
//           throw new Error("неккоректно указан тип сортировки в вызове selectionSort");
//         }
//       }
//       [arr[i], arr[maxValueIndex]] = [arr[maxValueIndex], arr[i]];
//     }
//     return arr;
//   };

  export const getMaxValueIndex = (arr: TColumnArray[], start: number, maxValueIndex: number, metod: TTypeSort):number => {
    if(start === arr.length-1) {
      return maxValueIndex
    }
    if(metod === "up") {
      if (arr[start + 1].value < arr[maxValueIndex].value) {
        return getMaxValueIndex(arr, start + 1, start + 1, metod);
      }
    }
    if(metod === "down") {
      if (arr[start + 1].value > arr[maxValueIndex].value) {
        return getMaxValueIndex(arr, start + 1, start + 1, metod);
      }
    }
    return getMaxValueIndex(arr, start + 1, maxValueIndex, metod)
  }

  export const getSelectionSort = (sortingArr: TColumnArray[], typeSort: TTypeSort, start = 0): TColumnArray[] => {
    let arr = [...sortingArr];
    let metod = typeSort;
  
    if (start === arr.length - 1) {
      return arr;
    }
    const maxValueIndex = getMaxValueIndex(arr, start, start, metod);

    [arr[start], arr[maxValueIndex]] = [arr[maxValueIndex], arr[start]];
    return getSelectionSort(arr, metod, start + 1);
  };