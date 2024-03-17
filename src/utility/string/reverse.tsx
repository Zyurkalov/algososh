import { TArrayStatus } from "../../components/string/string";
import { ElementStates } from "../../types/element-states";
import { Dispatch, SetStateAction } from "react";
import { getDelay } from "../getDelay";
import { DELAY_IN_MS } from "../../constants/delays";

    // export const reverse = async (arr: TArrayStatus[], setSortableArr: Dispatch<SetStateAction<TArrayStatus[] | null>>, setLoader: Dispatch<SetStateAction<boolean>>, start = 0, end = arr.length - 1) => {
    // const newArr = [...arr];

    // if (start <= end) {
    //     newArr[start].status = ElementStates.Changing;
    //     newArr[end].status = ElementStates.Changing;
    //     setSortableArr(newArr);
    
    //     await getDelay(DELAY_IN_MS);
    //     newArr[start].status = ElementStates.Modified;
    //     newArr[end].status = ElementStates.Modified;
    //     [newArr[start], newArr[end]] = [newArr[end], newArr[start]];
    //     return await reverse(arr, setSortableArr, setLoader, start + 1, end - 1);
    //   } else {
    //     setLoader(false);
    //     setSortableArr(newArr);
    //     return newArr
    //   }
    // };

    export const reverse = async (arr: TArrayStatus[], setSortableArr: Dispatch<SetStateAction<TArrayStatus[] | any>>, setLoader: Dispatch<SetStateAction<boolean>>, start = 0, end = arr.length - 1) : Promise<any> => {
      const newArr = [...arr];
  
      if (start <= end) {
          newArr[start].status = ElementStates.Changing;
          newArr[end].status = ElementStates.Changing;
          setSortableArr(newArr);
  
          await getDelay(DELAY_IN_MS);
  
          newArr[start].status = ElementStates.Modified;
          newArr[end].status = ElementStates.Modified;
  
          [newArr[start], newArr[end]] = [newArr[end], newArr[start]];
  
          return await reverse(newArr, setSortableArr, setLoader, start + 1, end - 1);
      } else {
          setLoader(false);
          setSortableArr(newArr);
          return newArr;
      }
  };