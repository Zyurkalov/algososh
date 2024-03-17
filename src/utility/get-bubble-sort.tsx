import { Dispatch, SetStateAction } from "react";
import { TColumnArray } from "../components/sorting-page/sorting-page";
import { TTypeSort } from "../components/sorting-page/sorting-page";
import { SHORT_DELAY_IN_MS } from "../constants/delays";
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

export const getBubbleSort = async(sortingArr: TColumnArray[], method: TTypeSort, 
  setRandomArray: Dispatch<SetStateAction<TColumnArray[]>>) => {
  //чтобы не созадавать новый массив на каждом вызове bubbleSort
  let arr = [...sortingArr];
  await bubbleSort(arr, method, 0 , setRandomArray);
  return
};

export const bubbleSort = async (arr: TColumnArray[], method: TTypeSort, start: number,
  setRandomArray: Dispatch<SetStateAction<TColumnArray[]>>): Promise<TColumnArray[]> => {
    let youShallNotPass = false
    if (arr.length === 0) {
      return arr; 
    }
    if (start === arr.length - 1) {
      arr[start].state = ElementStates.Modified;
      setRandomArray([...arr]);
      return arr; 
    }

    await innerBubbleSort(arr, method, 0, setRandomArray);
    await new Promise((resolve) => {
      setTimeout(() => {
        let index = 0
        arr[arr.length - start- 1].state = ElementStates.Modified;     
        while(arr[index].state !== ElementStates.Modified) {
          arr[index].state = ElementStates.Default;
          index++
        }
        if(arr[1].state === ElementStates.Modified && arr[0].state === ElementStates.Default) {
          arr[0].state = ElementStates.Modified;
          youShallNotPass = true
        }
        setRandomArray([...arr]);
        resolve(null);
      }, SHORT_DELAY_IN_MS);
    });

    if(!youShallNotPass) {
      return await bubbleSort(arr, method, start + 1, setRandomArray);
    }else{
      return arr
    }
  };

const innerBubbleSort = async (arr: TColumnArray[], method: TTypeSort, next: number,
  setRandomArray: Dispatch<SetStateAction<TColumnArray[]>>) => {

    if (next === arr.length - 1) {
      return;
    }
    if(arr[next + 1].state === ElementStates.Modified) {
      return
    } 
    await new Promise((resolve) => {
      setTimeout(() => {
        arr[next].state = ElementStates.Changing;
        arr[next + 1].state = ElementStates.Changing;
        if(arr[next-1]) {
          arr[next -1].state = ElementStates.Default;
        }
        setRandomArray([...arr]);
        resolve(null);
      }, SHORT_DELAY_IN_MS);
    });

    if (method === "up" && arr[next].value > arr[next + 1].value) {
      [arr[next], arr[next + 1]] = [arr[next + 1], arr[next]];
    }
    if (method === "down" && arr[next].value < arr[next + 1].value) {
      [arr[next], arr[next + 1]] = [arr[next + 1], arr[next]];
    }
    
    setRandomArray([...arr]);
    await innerBubbleSort(arr, method, next + 1, setRandomArray);
  };
  