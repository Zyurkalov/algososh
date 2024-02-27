import React, { ChangeEvent, useState, useMemo } from "react";
import { getDelay } from "../../utility/getDelay";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { useCustomEffect } from "../../utility/use-custom-effect";
import { Stack } from "../../utility/class-stack";
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
  const [adding, setAdding] = useState(false)
  const [deletion, setDeletion] = useState(false)
  const [update, setUpdate] = useState(false);
  
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const onPush = async() => {
    if(input === '') {
      return
    }
    push({value: input, state: ElementStates.Changing})
    setAdding(true)
    
    await getDelay()
    // setTimeout(() => {
      if (peak() !== null) {
        peak()!.state = ElementStates.Default
      }
      setInput('')
      setAdding(false)
    // }, timeout);
  }
  const onPop = async() => {
    if(getContainer().length <= 0) {
      return
    }
    
    if (peak() !== null) {
      peak()!.state = ElementStates.Changing
    }
    setDeletion(true)

    await getDelay()
    // setTimeout(() => {
      // const upd = !update
      pop()
      setDeletion(false)
    // }, timeout);
  }
  const onRemove = async () => {
    setUpdate(true)

    await getDelay()
    // setTimeout(() => {
      remove()
      setUpdate(false)
    // }, timeout);
  }

  const showTop = (index: number) => {
    if( index === getSize()-1) {
      return 'top'
    }
  }
  useCustomEffect(onPush, adding)
  
  return (
    <SolutionLayout title="Стек">
      <div className="box-container">
        <div className={`input-box ${style["input-box__stackPage"]}`}>
          <Input placeholder="Введите значение" isLimitText={true} maxLength={4} type={'text'} onChange={onChange} value={input} disabled={adding || deletion || update}></Input>
          <Button text='Добавить' onClick={() => onPush()} disabled={!input || deletion || update} isLoader={adding}></Button>
          <Button text='Удалить' onClick={() => onPop()} disabled={getSize() <= 0 || adding || update} isLoader={deletion}></Button>
          <Button text='Очистить' onClick={() => onRemove()} extraClass={"ml-40"} disabled={getSize() <= 0 || adding || deletion} isLoader={update}></Button>
        </div>
        <ul className="list-box">
          {getContainer() !== null
              ? getContainer().map((elem, index) => {
                  return <li className="list-box_circle" key={index}>
                    <Circle letter={elem.value} index={index} head={showTop(index)} state={elem.state}></Circle>
                  </li>;
                })
              : null
          }
        </ul>
      </div>
    </SolutionLayout>
  );
};
