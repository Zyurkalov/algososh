import React, {useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { getRandomArr } from "../../utility/get-random";
import { Button} from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction"
import { ElementStates } from "../../types/element-states";
import { getSelectionSort } from "../../utility/get-selection-sort";
import { getBubbleSort } from "../../utility/get-bubble-sort";
import { resetStates } from "../../utility/reset-states";
import style from "./sorting-page.module.css"

export type TTypeSort = "up" | "down"
export type TColumnArray = {
  value: number;
  state: ElementStates;
}
export const SortingPage: React.FC = () => {
  const [choiсeMetod, setChoiсeMetod] = useState(true)
  const [bubbleMetod, setBubbleMetod] = useState(false)
  const [ascendingMetod, setAscendingMetod] = useState(false)
  const [descendingMetod, setDescendingMetod] = useState(false)
  const [randomArray, setRandomArray] = useState<TColumnArray[]>([])

  const handleRadioClick =() => {
    setChoiсeMetod(!choiсeMetod)
    setBubbleMetod(!bubbleMetod)
  }
  const handleSelectionSort = async (typeSort: TTypeSort ) => {
    if(typeSort === "up") {
      setAscendingMetod(true)
    } else {
      setDescendingMetod(true)
    }
    
    if(randomArray.length > 0) {
      
      if(bubbleMetod) {
        // setRandomArray(await getBubbleSort(resetStates(randomArray), typeSort, setRandomArray))
        await getBubbleSort(resetStates(randomArray), typeSort, setRandomArray)   
      }
      if(choiсeMetod) {
        // setRandomArray(await getSelectionSort(resetStates(randomArray), typeSort, setRandomArray))
        await getSelectionSort(resetStates(randomArray), typeSort, setRandomArray)      
      } 
    }else{
      return
    } 
    setDescendingMetod(false)
    setAscendingMetod(false)
  }
  return (
    <SolutionLayout title="Сортировка массива">
      <div className="box-container">
        <div className={`input-box ${style["input-box__radio"]}`}> 
          <RadioInput label={"Выбор"} checked={choiсeMetod} onChange={() => handleRadioClick()} extraClass={"mr-15"} disabled={descendingMetod || ascendingMetod}></RadioInput>
          <RadioInput label={"Пузырёк"} checked={bubbleMetod} onChange={() => handleRadioClick()} extraClass={"mr-20"} disabled={descendingMetod || ascendingMetod}></RadioInput>
          <div className={`${style.bottonContainer}`}>
          <Button text='По возрастанию' onClick={() =>handleSelectionSort("up")} isLoader={ascendingMetod} disabled={descendingMetod} 
          sorting={Direction.Ascending} extraClass={`mr-4 ${style.bottonContainer__ascending}`}> </Button> 
          <Button text='По убыванию' onClick={() =>handleSelectionSort("down")} isLoader={descendingMetod} disabled={ascendingMetod} 
          sorting={Direction.Descending} extraClass={`mr-4 ${style.bottonContainer__descending}`}> </Button>   
          </div>
          <Button text='Новый массив' onClick={() => setRandomArray(getRandomArr())} disabled={descendingMetod || ascendingMetod} extraClass={"ml-35"}> </Button>
        </div>
        <ul className={`list-box ${style["list-box__column"]}`}>
          {randomArray !== null &&
            randomArray.map(({value, state}, index) => (
              <li className="list-box_circle" key={index}>
                <Column index={value} state={state}></Column>
              </li>
            ))
          }
        </ul>
      </div>
    </SolutionLayout>
  );
};
