import React, { ChangeEvent, useState, useEffect, useMemo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./class-list-page";
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
  const newList = useMemo(() => new LinkedList<TElem>(), []);

  const [value, setValue] = useState("");
  const [index, setIndex] = useState("");
  const [loader, setLoader] = useState(false);
  const [addingToHead, setAddingToHead] = useState(false);
  const [addingToTail, setAddingToTail] = useState(false);
  const [removingToHead, setRemovingToHead] = useState(false);
  const [removingToTail, setRemovingToTail] = useState(false);
  const [addingByIndex, setAddingByIndex] = useState(false);
  const [removingByIndex, setRemovingByIndex] = useState(false);
  const [update, setUpdate] = useState(false);
  const timeout = 800;

  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const onChangeIndex = (event: ChangeEvent<HTMLInputElement>) => {
    setIndex(event.target.value);
  };
  const smallCirleHeader = (elem: TElem, index: number) => {
    return elem.replacingHeader ? (
      <Circle
        letter={elem.replacingHeader}
        state={ElementStates.Changing}
        isSmall={true}
      ></Circle>
    ) : index === 0 ? "head" : null;
  };
  const smallCirleBottom = (elem: TElem, index: number) => {
    return elem.replacingBottom ? (
      <Circle
        letter={elem.replacingBottom}
        state={ElementStates.Changing}
        isSmall={true}
      ></Circle>
    ) : index === listSize() ? "tail" : null;
  };
////////////////////////////////////////////////////////////////////////

  const addByTarget = async (str: string, targetIndex: "head" | "tail") => {
    targetIndex === "head" ? setAddingToHead(true) : setAddingToTail(true)
    setLoader(true)
    let isListEmpty = false

    const objModifed = {
      value: str,
      state: ElementStates.Modified,
      replacingHeader: undefined,
    };
    const objNull = {
      value: undefined,
      state: ElementStates.Default,
      replacingHeader: undefined,
    };
    if(listSize() === 0) {
      isListEmpty = true
      targetIndex = "head"
      newList.append(objNull , "head")
    }
    if (targetIndex === "head") {
      newList.returnIt(0)!.replacingHeader = str;
    } else {
      if(listSize() === 1) {
        newList.append(objNull , "tail")
      }
      newList.returnIt(listSize())!.replacingHeader = str;
    }
    
    setTimeout(() => {
      if(isListEmpty) {
        newList.returnIt(0)!.replacingHeader = undefined;
        newList.returnIt(0)!.state = ElementStates.Modified;
        newList.returnIt(0)!.value = str;
      } else {
        newList.append(objModifed, targetIndex);
        if (targetIndex === "head") {
          newList.returnIt(1)!.replacingHeader = undefined;
        } else {
          newList.returnIt(listSize() - 2)!.replacingHeader = undefined;
        }
      }
      setUpdate((prev) => !prev);
    }, timeout);

    setTimeout(() => {
      if (targetIndex === "head") {
        newList.returnIt(0)!.state = ElementStates.Default;
      } else {
        newList.returnIt(listSize())!.state = ElementStates.Default;
      }
      isListEmpty = false;
      targetIndex === "head" ? setAddingToHead(false) : setAddingToTail(false)
      setValue("");
      setLoader(false)
    }, timeout * 2);
  };

////////////////////////////////////////////////////////////////////////
  const addByIndex = async (str: string, targetIndex: number = 0) => {
    setLoader(true)
    setAddingByIndex(true)

    const objDefault = {
      value: undefined,
      state: ElementStates.Changing,
      replacingHeader: value,
    };
    
    if(listSize()<= 0) {
      setAddingByIndex(false)
      addByTarget(str, "head")
      return
    }

    let size = listSize() <= targetIndex ? listSize() : targetIndex;
    const target = listSize() <= targetIndex ? listSize() + 1 : size;
    let current: TElem | undefined = undefined;

    // if(listSize() === 1) {
    //   size--
    // }
    for (let i = 0; i <= size; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          
          current = newList.returnIt(i);
          current!.replacingHeader = str;
          
          if (i > 0) {
            newList.returnIt(i - 1)!.state = ElementStates.Changing;
          }
          
          setUpdate((prev) => !prev);
          current!.replacingHeader = undefined;
          resolve(null);
        }, timeout);
      });
    }
    setTimeout(() => {
      newList.append(objDefault, target);
      setValue("");
    }, timeout * 1);

    setTimeout(() => {
      let obj = newList.returnIt(target);
      if (obj) {
        obj.value = str;
        obj.state = ElementStates.Modified;
        obj.replacingHeader = undefined;
      }
      setUpdate((prev) => !prev);
    }, timeout * 2);

    setTimeout(() => {
      for (let i = 0; i <= size; i++) {
        let obj = newList.returnIt(i);
        if (obj?.state === ElementStates.Default) {
          return;
        }
        obj &&
          (() => {
            obj.state = ElementStates.Default;
          })();
      }
      setAddingByIndex(false)
      setLoader(false)
      setValue("");
      setIndex("");
    }, timeout * 3);
  };

  // const deleteItTarget = (targetIndex: "head" | "tail") => {
  //   if(listSize() === 0) {
  //     return 
  //   }
  //   setLoader(true)
  //   let target = 0
  //   if (targetIndex === "head") {
  //     target = 0
  //   }else{
  //     target = listSize()-1
  //   }
  //   let current = newList.returnIt(target)!.value
  //   newList.returnIt(target)!.value = undefined
  //   newList.returnIt(target)!.replacingBottom = current

  //   setValue("");
  //   setIndex("");
  //   setTimeout(() => {
  //     newList.deleteIt(target)
  //     setLoader(false)
  //   }, timeout);
  // };

  ////////////////////////////////////////////////////////////////////////
  const deleteItTarget = (targetIndex: "head" | "tail") => {
    if (listSize() === 0) {
      return;
    }
    setLoader(true);
    targetIndex === "head" ? setRemovingToHead(true) : setRemovingToTail(true)
    let target = targetIndex === "head" ? 0 : listSize() - 1;
  
    const currentElement = newList.returnIt(target);
    if (currentElement) {
      const currentValue = currentElement.value;
      currentElement.value = undefined;
      currentElement.replacingBottom = currentValue;
    }
    setTimeout(() => {
      newList.deleteIt(target);
      targetIndex === "head" ? setRemovingToHead(false) : setRemovingToTail(false)
      setLoader(false);
    }, timeout);
  };

////////////////////////////////////////////////////////////////////////
  const deleteItIndex = async(targetIndex: number) => {
    setRemovingByIndex(true)
    if(listSize() === 0) {
      return 
    }
    const size = listSize() <= targetIndex ? listSize()-1 : targetIndex;
    // let current: TElem | undefined = undefined;
    setLoader(true)

    for (let i = 0; i <= size; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          // current = newList.returnIt(i);
          // newList.returnIt(i)!.state = ElementStates.Changing;
          
          // setUpdate((prev) => !prev);
          const current = newList.returnIt(i);
          if (current) {
            current.state = ElementStates.Changing;
          }
          setUpdate((prev) => !prev);
          resolve(null);
        }, timeout);
      });
    } 
      // setTimeout(() => {
      //   current!.state = ElementStates.Default
      //   current!.replacingBottom = current!.value;
      //   current!.value = undefined
      //   setUpdate((prev) => !prev);
      // }, timeout);
      setTimeout(() => {
        if (size >= 0) {
          const current = newList.returnIt(size);
          if (current) {
            current.state = ElementStates.Default;
            current.replacingBottom = current.value;
            current.value = undefined;
          }
          setUpdate((prev) => !prev);
        }
      }, timeout);

      setTimeout(() => {
        newList.deleteIt(size);
        setUpdate((prev) => !prev);
      }, timeout*2);

      setTimeout(() => {
        if(listSize() === 0) {
          setLoader(false)
          setValue("");
          setIndex("");
          return;
        }
        for (let i = 0; i <= size; i++) {
          let obj = newList.returnIt(i);
          
          if (obj === undefined || obj.state === ElementStates.Default ) { 
            setLoader(false)
            setRemovingByIndex(false)
            setValue("");
            setIndex("");
            return;
          }
          obj &&
            (() => {
              obj.state = ElementStates.Default;
            })();
        }
      }, timeout * 3);
  };

  const listSize = (): number => {
    return newList.getSize();
  };
  useEffect(() => {
    newList.append({ value: "1", state: ElementStates.Default });
    newList.append({ value: "33", state: ElementStates.Default });
    newList.append({ value: "02", state: ElementStates.Default }, 1);
    newList.append({ value: "end", state: ElementStates.Default }, 4);
    setUpdate(!update);
  }, []);

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
            onChange={onChangeValue}
            extraClass={`${style.input__size}`}
            disabled={loader}
          ></Input>
          <Button
            text="Добавить в head"
            isLoader={addingToHead}
            onClick={() => addByTarget(value, "head")}
            disabled={value === "" || loader}
            extraClass={`${style.button__size_S}`}
          >
            {" "}
          </Button>
          <Button
            text="Добавить в tail"
            isLoader={addingToTail}
            onClick={() => addByTarget(value, "tail")}
            disabled={value === "" || loader}
            extraClass={`${style.button__size_S}`}
          >
            {" "}
          </Button>
          <Button
            text="Удалить из head"
            isLoader={removingToHead}
            onClick={() => deleteItTarget("head")}
            disabled={listSize() <= 0 || loader}
            extraClass={`${style.button__size_S}`}
          >
            {" "}
          </Button>
          <Button
            text="Удалить из tail"
            isLoader={removingToTail}
            onClick={() => deleteItTarget("tail")}
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
            value={index}
            onChange={onChangeIndex}
            extraClass={`${style.input__size}`}
            disabled={loader}
          ></Input>
          <Button
            text="Добавить по индексу"
            isLoader={addingByIndex}
            onClick={() => addByIndex(value, parseInt(index))}
            disabled={index === "" || value === "" || loader}
            extraClass={`${style.button__size_M}`}
          >
            {" "}
          </Button>
          <Button
            text="Удалить по индексу"
            isLoader={removingByIndex}
            onClick={() => deleteItIndex(parseInt(index))}
            disabled={index === "" || listSize() <= 0 || loader}
            extraClass={`${style.button__size_M}`}
          >
            {" "}
          </Button>
        </div>
        </div>
        <ul className="list-box">
          {newList !== null
            ? newList.displayList().map((elem, index) => {
              return (
                <li className="list-box_circle" key={index}>
                  {index !== 0 ? <ArrowIcon></ArrowIcon> : null}
                  <Circle
                    letter={elem.value}
                    state={elem.state}
                    index={index}
                    head={smallCirleHeader(elem, index)}
                    tail={smallCirleBottom(elem, index+1)}
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
