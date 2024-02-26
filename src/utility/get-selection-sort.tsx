import { Dispatch, SetStateAction } from "react";
import { TColumnArray } from "../components/sorting-page/sorting-page";
import { TTypeSort } from "../components/sorting-page/sorting-page";
import { ElementStates } from "../types/element-states";

// export const getSelectionSorted = (sortingArr: TColumnArray[], typeSort: TTypeSort) => {
//     let arr = [...sortingArr];
//     let metod = typeSort
  
//     for (let i = 0; i < arr.length - 1; i++) {
//       let comparedValueIndex = i;
//       for (let j = i + 1; j < arr.length; j++) {

//         if(metod === "up") {
//           if (arr[j].value < arr[comparedValueIndex].value) {
//             comparedValueIndex = j;
//           }
//         } else if(metod === "down") {
//           if (arr[j].value > arr[comparedValueIndex].value) {
//             comparedValueIndex = j;
//           }
//         } else {
//           throw new Error("неккоректно указан тип сортировки в вызове selectionSort");
//         }
//       }
//       [arr[i], arr[comparedValueIndex]] = [arr[comparedValueIndex], arr[i]];
//     }
//     return arr;
//   };
const timeout = 400;

  export const getIndex = async (arr: TColumnArray[], start: number, comparedValueIndex: number, metod: TTypeSort, 
    setRandomArray:Dispatch<SetStateAction<TColumnArray[]>>):Promise<number> => {

      if(start >= arr.length) {
        return comparedValueIndex
      }

      await new Promise((resolve) => {     
        setTimeout(() => {
            arr[start].state = ElementStates.Changing;
            arr[comparedValueIndex].state = ElementStates.Changing;
            setRandomArray([...arr]);
          resolve(null);
        }, timeout);
      });
   
    if(metod === "up") {
      if (arr[comparedValueIndex].value > arr[start].value) {
        arr[start].state = ElementStates.Changing;
        arr[comparedValueIndex].state = ElementStates.Default;
        // setRandomArray([...arr]);
        return getIndex(arr, start + 1, start, metod, setRandomArray);
      }
    }
    if(metod === "down") {
      if (arr[comparedValueIndex].value < arr[start].value) {
        arr[start].state = ElementStates.Changing;
        arr[comparedValueIndex].state = ElementStates.Default;
        return getIndex(arr, start + 1, start, metod, setRandomArray);
      }
    }
    await new Promise((resolve) => {
      setTimeout(() => {
        arr[start].state = ElementStates.Default;
        arr[comparedValueIndex].state = ElementStates.Changing;
        // setRandomArray([...arr]);
        resolve(null);
      }, timeout);
    });

    return getIndex(arr, start + 1, comparedValueIndex, metod, setRandomArray)
  }

  export const getSelectionSort = async (
    sortingArr: TColumnArray[], typeSort: TTypeSort, 
    setRandomArray:Dispatch<SetStateAction<TColumnArray[]>>, start = 0): Promise<void> => {

    const arr = [...sortingArr];
    const metod = typeSort;
  
    if (start === arr.length - 1) {
      // return arr;
      return;
    }
    const comparedValueIndex = await getIndex(arr, start+1, start, metod, setRandomArray);
   [arr[start], arr[comparedValueIndex]] = [arr[comparedValueIndex], arr[start]];

    await new Promise((resolve) => {
      setTimeout(() => {
        arr[start].state = ElementStates.Modified;
        if(arr[arr.length-2].state === ElementStates.Modified && arr[arr.length-1].state === ElementStates.Default) {
          arr[arr.length-1].state = ElementStates.Modified
        }
        setRandomArray([...arr])
        resolve(null);
      }, timeout);
    });

    return getSelectionSort(arr, metod, setRandomArray, start + 1);
  };