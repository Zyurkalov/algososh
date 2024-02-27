import React, {ChangeEvent, useState} from "react";
import { getFibonacci } from "../../utility/get-fibonacci";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { DELAY_IN_MS } from "../../constants/delays";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { useCustomEffect } from "../../utility/use-custom-effect";
import "../../index.css"
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState(0)
  const [loader, setLoader] = useState(false)
  const [fibonacci, setFibonacci] = useState<number[]>([])

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value, 10));
  }
   const handleClick = () => {
    setLoader(true)
    setFibonacci([])
    if(value < 20) {
      visualizer(value)
    }
  };
   const visualizer = async (value: number) => {
    const fibList = getFibonacci(value);
    let i = 0;

    if(fibList.length === 1) {
      setLoader(false)
      return
    }
    const interval = setInterval(() => {
      if (i <= fibList.length - 1 && i <20) {
        setFibonacci(prevState => [...prevState, fibList[i]]);
        i++;
      } else {
        setLoader(false);
        clearInterval(interval);
      }
    }, DELAY_IN_MS);
  }
  useCustomEffect(handleClick, loader)

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={`box-container ${styles["box-container__fibonacci"]}`}>
        <div className="input-box">
            <Input placeholder="Введите число" isLimitText={true} max={19} onChange={onChange} type={'number'} disabled={loader}></Input>
            <Button text='Рассчитать' onClick={handleClick} isLoader={loader} disabled={value <= 0 || value > 19}> </Button>
        </div>
        <ul className="list-box">
          {fibonacci !== null
            ? fibonacci.map((elem, index) => 
                <li className="list-box_circle" key={index}>
                  <Circle letter={elem.toString()} index={index} state={ElementStates.Default}></Circle>
                </li>  
              )
            : null}
        </ul>
      </div>
    </SolutionLayout>
  );
};