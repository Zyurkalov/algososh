import React, { ChangeEvent, useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import "../../index.css"

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState('')
  const [sortableArr, setSortableArr] = useState<Record<string, string>[] | null>(null)

  // let reveredArray: Record<string, string>[] = []

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  const handleReverse = () => {
    setSortableArr(value.split('').map(elem => ({letter: elem, status: 'default'})))
  };
  const reverse = async(arr: Record<string, string>[] | null) => {
    if( arr === null) {
      return
    }
    // let start = 0
    // let end = arr.length-1
    // while(start <= end) {
    //   await new Promise(resolve => setTimeout(resolve, 1000)).then(() => console.log(start));

    //   [arr[start], arr[end]] = [arr[end], arr[start]]
    //   start++
    //   end--
    // }
    console.log(arr)
  }


  useEffect(() => {
    if (sortableArr !== null) {
      reverse(sortableArr);
    }
  }, [sortableArr]);

  return (
    <SolutionLayout title="Строка">
      <div className="box-container">
        <div className="input-box">
            <Input placeholder="Введите текст" isLimitText={true} maxLength={11} value={value} onChange={onChange}></Input>
            <Button text='Развернуть' onClick={handleReverse}> </Button>
        </div>
        <ul className="list-box">
          {sortableArr !== null
            ? sortableArr.map((elem, index) => {
                return <li className="list-box_circle" key={index}><Circle letter={elem.letter}></Circle></li>;
              })
            : null}
        </ul>
      </div>
    </SolutionLayout>
  );
};

// export enum ElementStates {
//   Default = "default",
//   Changing = "changing",
//   Modified = "modified",
// }
