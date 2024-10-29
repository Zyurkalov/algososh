import React, { useState, useMemo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Node, SinglyLinkedList } from "../../utility/list-page/class-singly-linked-list";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { getDelay } from "../../utility/getDelay";
import { useForm } from "../../utility/hooks/useForm";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import style from "./list-page.module.css";
import "../../index.css";

export const ListPage: React.FC = () => {
  type TElem = {
    value: string | undefined;
    state: ElementStates;
    replacingHeader?: string | undefined;
    replacingBottom?: string | undefined;
  };

  const nodes = useMemo(
    () => [
      new Node({ value: "1", state: ElementStates.Default }),
      new Node({ value: "22", state: ElementStates.Default }),
      new Node({ value: "3", state: ElementStates.Default }),
      new Node({ value: "end", state: ElementStates.Default }),
    ],
    []
  );
  const nodeList = useMemo(() => new SinglyLinkedList<TElem>(nodes), [nodes]);

  const [loader, setLoader] = useState(false);
  const [addingToHead, setAddingToHead] = useState(false);
  const [addingToTail, setAddingToTail] = useState(false);
  const [removingToHead, setRemovingToHead] = useState(false);
  const [removingToTail, setRemovingToTail] = useState(false);
  const [addingByIndex, setAddingByIndex] = useState(false);
  const [removingByIndex, setRemovingByIndex] = useState(false);
  const [update, setUpdate] = useState(false); //служит для обновления стилей
  const {index, setIndex, handleIndexChange, value, setValue, handleValueChange} = useForm('', '')

  const allSetReset = () => {
    setLoader(false)
    setAddingToHead(false)
    setAddingToTail(false)
    setRemovingToHead(false)
    setRemovingToTail(false)
    setAddingByIndex(false)
    setRemovingByIndex(false)
  }

  const smallCirleHeader = (elem: TElem, index: number) => {
    return elem.replacingHeader ? (
      <Circle
        letter={elem.replacingHeader}
        state={ElementStates.Changing}
        isSmall={true}
      ></Circle>
    ) : index === 0 ? (
      "head"
    ) : null;
  };
  const smallCirleBottom = (elem: TElem, index: number) => {
    return elem.replacingBottom ? (
      <Circle
        letter={elem.replacingBottom}
        state={ElementStates.Changing}
        isSmall={true}
      ></Circle>
    ) : index === listSize() ? (
      "tail"
    ) : null;
  };
  ////////////////////////////////////////////////////////////////////////
  const addValue = async (str: string, targetIndex: number = 0) => {
    setLoader(true);

    const objDefault = {
      value: undefined,
      state: ElementStates.Changing,
      replacingHeader: value,
    };

    const target = Math.min(listSize(), targetIndex);
    if(nodeList.getSize() > 0){
    for (let i = 0; i <= target; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          if (i > 0) {
            nodeList.getIt(i - 1)!.state = ElementStates.Changing;
          }
          const current = nodeList.getIt(i);
          current!.replacingHeader = str;
          setUpdate((prev) => !prev);
          current!.replacingHeader = undefined;
          resolve(null);
        }, SHORT_DELAY_IN_MS);
      });
    }}

    await getDelay(); ////// delay
    nodeList.append(objDefault, target);
    setValue("");

    await getDelay(); ////// delay
    const obj = nodeList.getIt(target);
    if (obj) {
      obj.value = str;
      obj.state = ElementStates.Modified;
      obj.replacingHeader = undefined;
    }
    setUpdate((prev) => !prev);

    await getDelay(); ////// delay
    for (let i = 0; i <= target; i++) {
      const obj = nodeList.getIt(i);
      if (obj?.state === ElementStates.Default) {
        return;
      }
      obj && (obj.state = ElementStates.Default);
    }
    
    allSetReset();
    setValue("");
    setIndex("");
};
  ////////////////////////////////////////////////////////////////////////
  const deleteValue = async (targetIndex: number) => {
    // setRemovingByIndex(true);
    if (listSize() === 0) {
      return;
    }
    const deletTarget =
      listSize() <= targetIndex ? listSize() - 1 : targetIndex;
    setLoader(true);

    if(targetIndex === listSize()-1) {
      const current = nodeList.getIt(targetIndex)
      current.state = ElementStates.Changing;
      setUpdate((prev) => !prev);

      await getDelay(); ////////// delay
      current.state = ElementStates.Default;
      current.replacingBottom = current.value;
      current.value = undefined;
      setUpdate((prev) => !prev);

      await getDelay(); ////////// delay
      nodeList.delete(targetIndex)
      allSetReset()
      return;
    }

    for (let i = 0; i <= deletTarget; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          const current = nodeList.getIt(i);
          current.state = ElementStates.Changing;
          setUpdate((prev) => !prev);
          resolve(null);
        }, SHORT_DELAY_IN_MS);
      });
    }
    await getDelay(); ////////// delay
    if (deletTarget >= 0) {
      const current = nodeList.getIt(deletTarget);
      current.state = ElementStates.Default;
      current.replacingBottom = current.value;
      current.value = undefined;
      setUpdate((prev) => !prev);
    }
    await getDelay(); ////////// delay
    nodeList.delete(deletTarget);
    setUpdate((prev) => !prev);

    await getDelay(); ////////// delay
    if (listSize() === 0) {
      allSetReset()
      setValue("");
      setIndex("");
      return;
    }
    for (let i = 0; i <= deletTarget; i++) {
      let obj = nodeList.getIt(i);

      if (obj === undefined || obj.state === ElementStates.Default) {
        allSetReset()
        setValue("");
        setIndex("");
        return;
      }
      obj &&
        (() => {
          obj.state = ElementStates.Default;
        })();
    }
    setRemovingByIndex(false);
  };
  const listSize = (): number => {
    return nodeList.getSize();
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={`box-container ${style.boxContainer__hight}`}>
        <div className={style.boxContainer_inputBox}>
          <div className="input-box">
            <Input
              placeholder="Введите значение"
              isLimitText={true}
              maxLength={4}
              value={value}
              onChange={handleValueChange}
              extraClass={`${style.input__size}`}
              disabled={loader}
            ></Input>
            <Button
              text="Добавить в head"
              isLoader={addingToHead}
              onClick={() => {addValue(value); setAddingToHead(true)}}
              disabled={value === "" || loader}
              extraClass={`${style.button__size_S}`}
            >
              {" "}
            </Button>
            <Button
              text="Добавить в tail"
              isLoader={addingToTail}
              onClick={() => {addValue(value, nodeList.getSize()); setAddingToTail(true)}}
              disabled={value === "" || loader}
              extraClass={`${style.button__size_S}`}
            >
              {" "}
            </Button>
            <Button
              text="Удалить из head"
              isLoader={removingToHead}
              onClick={() => {deleteValue(0); setRemovingToHead(true)}}
              disabled={listSize() <= 0 || loader}
              extraClass={`${style.button__size_S}`}
            >
              {" "}
            </Button>
            <Button
              text="Удалить из tail"
              isLoader={removingToTail}
              onClick={() => {deleteValue(nodeList.getSize() - 1); setRemovingToTail(true)}}
              disabled={listSize() <= 0 || loader}
              extraClass={`${style.button__size_S}`}
            >
              {" "}
            </Button>
          </div>
          <div className="input-box">
            <Input
              placeholder="Введите индекс"
              type="number"
              isLimitText={parseInt(index) > listSize() -1}
              max={listSize() -1}
              value={index}
              onChange={handleIndexChange}
              extraClass={`${style.input__size}`}
              disabled={loader}
            ></Input>
            <Button
              text="Добавить по индексу"
              isLoader={addingByIndex}
              onClick={() => {addValue(value, parseInt(index)); setAddingByIndex(true)}}
              disabled={index === "" || parseInt(index) < 0 || value === "" || loader || parseInt(index) > listSize() -1}
              extraClass={`${style.button__size_M}`}
            >
              {" "}
            </Button>
            <Button
              text="Удалить по индексу"
              isLoader={removingByIndex}
              onClick={() => {deleteValue(parseInt(index)); setRemovingByIndex(true)}}
              disabled={index === "" || listSize() <= 0 || loader || parseInt(index) > listSize() -1}
              extraClass={`${style.button__size_M}`}
            >
              {" "}
            </Button>
          </div>
        </div>
        <ul className="list-box">
          {nodeList !== null
            ? nodeList.getList().map((elem, index) => {
                return (
                  <li className="list-box_circle" key={index}>
                    {index !== 0 ? <ArrowIcon></ArrowIcon> : null}
                    <Circle
                      letter={elem.value}
                      state={elem.state}
                      index={index}
                      head={smallCirleHeader(elem, index)}
                      tail={smallCirleBottom(elem, index + 1)}
                    ></Circle>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </SolutionLayout>
  );
};
