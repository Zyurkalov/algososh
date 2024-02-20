import React, { ChangeEvent, useState, useMemo, useEffect } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./class-stack";
import { ElementStates } from "../../types/element-states";
import style from "./stack-page.module.css"
import "../../index.css"

export const StackPage: React.FC = () => {
  type TStackElem = {
    value: string;
    state: ElementStates
  }
  const newStack = useMemo(() => new Stack<TStackElem >(), []);
  const {push, pop, peak, remove, getSize, getContainer} = newStack

  const [input, setInput] = useState('');
  const [update, setUpdate] = useState(false);
  const timeout = 500;
  
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const onPush =  (value: string) => {
    push({value: value, state: ElementStates.Changing})
    setInput('')

    setTimeout(() => {
      if (peak() !== null) {
        peak()!.state = ElementStates.Default
      }
      setUpdate(!update)
    }, timeout);
  }
  const onPop = () => {
    if (peak() !== null) {
      peak()!.state = ElementStates.Changing
    }
    setUpdate(!update)

    setTimeout(() => {
      const upd = !update
      pop()
      setUpdate(!upd)
    }, timeout);
  }

  const showTop = (index: number) => {
    if( index === getSize()-1) {
      return 'top'
    }
  }

  return (
    <SolutionLayout title="Стек">
      <div className="box-container">
        <div className={`input-box ${style["input-box__stackPage"]}`}>
          <Input placeholder="Введите значение" isLimitText={true} maxLength={4} type={'text'} onChange={onChange} value={input}></Input>
          <Button text='Добавить' onClick={() => onPush(input)} disabled={!input}></Button>
          <Button text='Удалить' onClick={() => onPop()} disabled={getSize() <= 0}></Button>
          <Button text='Очистить' onClick={() => {remove(); setUpdate(!update)}} extraClass={"ml-40"} disabled={getSize() <= 0}></Button>
        </div>
        <ul className="list-box">
          {getContainer() !== null
              ? getContainer().map((elem, index) => {
                  return <li className="list-box_circle" key={index}><Circle letter={elem.value} index={index} head={showTop(index)} state={elem.state}></Circle></li>;
                })
              : null
          }
        </ul>
      </div>
    </SolutionLayout>
  );
};
