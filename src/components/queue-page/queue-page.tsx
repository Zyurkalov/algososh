import React, { ChangeEvent, useState, useMemo } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { useCustomEffect } from "../../utility/use-custom-effect";
import { Queue } from "./class-queue";
import { ElementStates } from "../../types/element-states";
import style from "./queue-page.module.css"
import "../../index.css"

export const QueuePage: React.FC = () => {
  type TStackElem = {
    value: string;
    state: ElementStates
  }

  const newQueue = useMemo(() => new Queue<TStackElem >(7), []);
  const {enqueue, dequeue, isHeader, isTail, isEmpty, getContainer, remove, interrupt} = newQueue

  const [input, setInput] = useState('');
  const [update, setUpdate] = useState(false);
  const [enqueueLoader, setEnqueueLoader] = useState(false);
  const [dequeueLoader, setDequeueLoader] = useState(false);
  const timeout = 500;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const onPush =  () => {
    if(input === '') {
      return
    }
    enqueue({value: input, state: ElementStates.Changing})
    setEnqueueLoader(true)

    setTimeout(() => {
      if (isTail() !== undefined) {
        isTail()!.state = ElementStates.Default
      }
      setEnqueueLoader(false)
      setInput('')
    }, timeout);
  }

  const onPop = () => {
    if (isHeader() !== undefined) {
      isHeader()!.state = ElementStates.Changing
    }
    setDequeueLoader(true)

    setTimeout(() => {
      if(isHeader() === isTail()) {
        remove()
      } else {
        dequeue()
      }
      setDequeueLoader(false)
    }, timeout);
  }
  const onRemoveAll = () => {
    setUpdate(true)

    setTimeout(() => {
      remove()
      setUpdate(false)
    }, timeout);
  }

  const showHead = (index: number) => {
    if(getContainer()[index]?.value) {
      if(getContainer()[index] === isHeader()) {
        return "head"
      }
      return null
    }
  }
  const showTail = (index: number) => {
    if(getContainer()[index]?.value) { 
      if(getContainer()[index] === isTail()) {
        return "tail"
      }
      return null
    }
  }
  useCustomEffect(onPush, enqueueLoader)

  return (
    <SolutionLayout title="Очередь">
       <div className="box-container">
        <div className={`input-box ${style["input-box__stackPage"]}`}>
          <Input placeholder="Введите значение" isLimitText={true} maxLength={4} type={'text'} onChange={onChange} value={input} disabled={dequeueLoader || enqueueLoader || update}></Input>
          <Button text='Добавить' onClick={() => onPush()} disabled={!input || interrupt() || dequeueLoader || update} isLoader={enqueueLoader}></Button>
          <Button text='Удалить' onClick={() => onPop()} disabled={isEmpty() || enqueueLoader || update} isLoader={dequeueLoader}></Button>
          <Button text='Очистить' onClick={() => onRemoveAll()} extraClass={"ml-40"} disabled={isEmpty() || dequeueLoader || enqueueLoader} isLoader={update}></Button>
        </div>
        <ul className="list-box">
        
        {Array.from({ length: getContainer().length }).map((elem, index) => (
          <li className="list-box_circle" key={index}>
            <Circle letter={getContainer()[index]?.value} index={index} state={getContainer()[index]?.state} head={showHead(index)} tail={showTail(index)}/>
          </li>
        ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
