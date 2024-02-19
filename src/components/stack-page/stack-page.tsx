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
    state: ElementStates.Changing
  }

  const newStack = useMemo(() => new Stack<string>(), []);
  const {push, pop, remove, getSize} = newStack

  const [value, setValue] = useState('');
  const [update, setUpdate] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const showTop = (index: number) => {
    if( index === getSize()-1) {
      return 'top'
    }
  }

  return (
    <SolutionLayout title="Стек">
      <div className="box-container">
        <div className={`input-box ${style["input-box__stackPage"]}`}>
          <Input placeholder="Введите значение" isLimitText={true} maxLength={4} type={'text'} onChange={onChange} value={value}></Input>
          <Button text='Добавить' onClick={() => {push(value); setUpdate(!update); setValue('')}} disabled={!value}></Button>
          <Button text='Удалить' onClick={() => {pop(); setUpdate(!update)}} disabled={getSize() <= 0}></Button>
          <Button text='Очистить' onClick={() => {remove(); setUpdate(!update)}} extraClass={"ml-40"} disabled={getSize() <= 0}></Button>
        </div>
        <ul className="list-box">
          {newStack.getContainer() !== null
              ? newStack.getContainer().map((elem, index) => {
                  return <li className="list-box_circle" key={index}><Circle letter={elem} index={index} head={showTop(index)}/*state={elem.status}*/></Circle></li>;
                })
              : null
          }
        </ul>
      </div>
    </SolutionLayout>
  );
};
