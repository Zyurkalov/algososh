import React, { ChangeEvent, useState, useEffect} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import "../../index.css"

export type TArrayStatus = {
  letter: string;
  status: ElementStates;
}
export const StringComponent: React.FC = () => {
  const [value, setValue] = useState('')
  const [loader, setLoader] = useState(false)
  const [sortableArr, setSortableArr] = useState<TArrayStatus[] | null>(null)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  const handleReverse = () => {
    if(value !== '') {
      const defaultArray = value.split('').map(elem => ({letter: elem, status: ElementStates.Default}))
      setSortableArr(defaultArray)
      setLoader(true)

      setTimeout(() => {
        reverse(defaultArray)
      }, 1000);
    }
  };
  const reverse = (arr: TArrayStatus[], start = 0, end = arr.length - 1) => {
    const newArr = [...arr];

    if (start <= end) {
      newArr[start].status = ElementStates.Changing;
      newArr[end].status = ElementStates.Changing;
      setSortableArr(newArr);
  
      setTimeout(() => {
        newArr[start].status = ElementStates.Modified;
        newArr[end].status = ElementStates.Modified;
        [newArr[start], newArr[end]] = [newArr[end], newArr[start]];
        reverse(newArr, start + 1, end - 1);
      }, 1000);
    } else {
      setLoader(false)
    }
    setSortableArr(newArr)
  }
  useEffect(() => {
    const handleKeyPressEnter = (event:KeyboardEvent) => {
      if(event.key === 'Enter' && !loader) {
          handleReverse()
      }
    }
    document.addEventListener('keydown', handleKeyPressEnter)
    return () => {
      document.removeEventListener('keydown', handleKeyPressEnter)
    }
  },[handleReverse])

  return (
    <SolutionLayout title="Строка">
      <div className="box-container">
        <div className="input-box">
            <Input placeholder="Введите текст" isLimitText={true} maxLength={11} value={value} onChange={onChange}></Input>
            <Button text='Развернуть' onClick={handleReverse} isLoader={loader} /*disabled={loader}*/> </Button>
        </div>
        <ul className="list-box">
          {sortableArr !== null
            ? sortableArr.map((elem, index) => {
                return <li className="list-box_circle" key={index}><Circle letter={elem.letter} state={elem.status}></Circle></li>;
              })
            : null}
        </ul>
      </div>
    </SolutionLayout>
  );
};
