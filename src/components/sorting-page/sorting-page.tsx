import React, {useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { getRandomArr } from "../../utility/get-random";
import { Button} from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction"
import { ElementStates } from "../../types/element-states";
import style from "./sorting-page.module.css"

type TColumnArray = {
  value: number;
  state: ElementStates;
}

export const SortingPage: React.FC = () => {
  const [loader, setLoader] = useState(false)
  const [choiсeMetod, setChoiсeMetod] = useState(true)
  const [bubbleMetod, setBubbleMetod] = useState(false)
  const [randomArray, setRandomArray] = useState<TColumnArray[]>([])

  const handleClick =() => {}

  const handleRadioClick =() => {
    setChoiсeMetod(!choiсeMetod)
    setBubbleMetod(!bubbleMetod)
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className="box-container">
        <div className={`input-box ${style["input-box__radio"]}`}> 
          <RadioInput label={"Выбор"} checked={choiсeMetod} onClick={() => handleRadioClick()} extraClass={"mr-15"}></RadioInput>
          <RadioInput label={"Пузырёк"} checked={bubbleMetod} onClick={() => handleRadioClick()} extraClass={"mr-20"}></RadioInput>
          <Button text='По возврастанию' onClick={handleClick} isLoader={loader} disabled={false} sorting={Direction.Ascending}> </Button> 
          <Button text='По убыванию' onClick={handleClick} isLoader={loader} disabled={false} sorting={Direction.Ascending}> </Button>   
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
