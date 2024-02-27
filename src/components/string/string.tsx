import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { useCustomEffect } from "../../utility/use-custom-effect";
import { DELAY_IN_MS } from "../../constants/delays";
import { getDelay } from "../../utility/getDelay";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import "../../index.css"

type TArrayStatus = {
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
  const handleReverse = async() => {
    if(value !== '') {
      const defaultArray = value.split('').map(elem => ({letter: elem, status: ElementStates.Default}))
      setSortableArr(defaultArray)
      setLoader(true)

      await getDelay(DELAY_IN_MS)
      reverse(defaultArray)
    }
  };
  const reverse = async(arr: TArrayStatus[], start = 0, end = arr.length - 1) => {
    const newArr = [...arr];

    if (start <= end) {
      newArr[start].status = ElementStates.Changing;
      newArr[end].status = ElementStates.Changing;
      setSortableArr(newArr);
  
      await getDelay(DELAY_IN_MS)
      newArr[start].status = ElementStates.Modified;
      newArr[end].status = ElementStates.Modified;
      [newArr[start], newArr[end]] = [newArr[end], newArr[start]];
      reverse(newArr, start + 1, end - 1);
    } else {
      setLoader(false)
      setSortableArr(newArr)
    }
  }
  useCustomEffect(handleReverse, loader)

  return (
    <SolutionLayout title="Строка">
      <div className="box-container">
        <div className="input-box">
            <Input placeholder="Введите текст" isLimitText={true} maxLength={11} value={value} onChange={onChange} disabled={loader}></Input>
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
