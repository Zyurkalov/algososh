import { ElementStates } from "../types/element-states";

export const getRandomArr = () => {
    const getRandom = (min:number, max:number) => {
      const minCeiled = Math.ceil(min);
      const maxFloored = Math.floor(max);
      return Math.floor(Math.random() * (maxFloored - minCeiled +1) + minCeiled);
    }
    // let arr = new Array(getRandomInt(3, 17))
    // for(let i=0; i<arr.length; i++) {
    //   arr[i] = {valye: getRandomInt(0, 100), state: ElementStates.Default}
    // }
    return Array.from({length: getRandom(3, 17)}, () => ({ value: getRandom(0, 100), state: ElementStates.Default }))
  }
  