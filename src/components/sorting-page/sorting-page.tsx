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
import style from "./sorting-page.module.css"

export type TTypeSort = "up" | "down"
export type TColumnArray = {
  value: number;
  state: ElementStates;
}

export const SortingPage: React.FC = () => {
  const [loader, setLoader] = useState(false)
  const [choiсeMetod, setChoiсeMetod] = useState(true)
  const [bubbleMetod, setBubbleMetod] = useState(false)
  const [randomArray, setRandomArray] = useState<TColumnArray[]>([])

  const handleRadioClick =() => {
    setChoiсeMetod(!choiсeMetod)
    setBubbleMetod(!bubbleMetod)
  }
  const handleSelectionSort = (typeSort: TTypeSort ) => {
    if(randomArray.length > 0) {
      if(bubbleMetod) {
        setRandomArray(getBubbleSort(randomArray, typeSort))
      }
      if(choiсeMetod) {
        setRandomArray(getSelectionSort(randomArray, typeSort))
      }   
    }else{
      return
    }
  }
  return (
    <SolutionLayout title="Сортировка массива">
      <div className="box-container">
        <div className={`input-box ${style["input-box__radio"]}`}> 
          <RadioInput label={"Выбор"} checked={choiсeMetod} onChange={() => handleRadioClick()} extraClass={"mr-15"}></RadioInput>
          <RadioInput label={"Пузырёк"} checked={bubbleMetod} onChange={() => handleRadioClick()} extraClass={"mr-20"}></RadioInput>
          <Button text='По возврастанию' onClick={() =>handleSelectionSort("up")} isLoader={loader} disabled={false} sorting={Direction.Ascending}> </Button> 
          <Button text='По убыванию' onClick={() =>handleSelectionSort("down")} isLoader={loader} disabled={false} sorting={Direction.Ascending}> </Button>   
          <Button text='Новый массив' onClick={() => setRandomArray(getRandomArr())} isLoader={loader} disabled={false} extraClass={"ml-35"}> </Button>
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
