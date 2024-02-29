import { TColumnArray } from "../components/sorting-page/sorting-page"
import { ElementStates } from "../types/element-states";

export const resetStates = (arr: TColumnArray[]) => {
    const array = arr.map(item => { 
        if (item.state !== ElementStates.Default) {
          return { ...item, state: ElementStates.Default };
        }
        return item;
      });
    // setAction([...array])
    return array
}