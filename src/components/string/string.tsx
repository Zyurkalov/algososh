import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { useCustomEffect } from "../../utility/use-custom-effect";
import { reverse } from "../../utility/string/reverse";
import { DELAY_IN_MS } from "../../constants/delays";
import { getDelay } from "../../utility/getDelay";
import { useForm } from "../../utility/hooks/useForm";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import "../../index.css"

export type TArrayStatus = {
  letter: string;
  status: ElementStates;
}
export const StringComponent: React.FC = () => {
  const [loader, setLoader] = useState(false)
  const [sortableArr, setSortableArr] = useState<TArrayStatus[] | null>(null)
  const {value, handleValueChange} = useForm('');

  const handleReverse = async() => {
    if(value !== '') {
      const defaultArray = value.split('').map(elem => ({letter: elem, status: ElementStates.Default}))
      setSortableArr(defaultArray)
      setLoader(true)

      await getDelay(DELAY_IN_MS)
      reverse(defaultArray, setSortableArr, setLoader)
    }
  };
  useCustomEffect(handleReverse, loader)

  return (
    <SolutionLayout title="Строка">
      <div className="box-container">
        <div className="input-box">
            <Input placeholder="Введите текст" data-testid={'input-test'} isLimitText={true} maxLength={11} value={value} onChange={handleValueChange} disabled={loader}></Input>
            <Button text='Развернуть' data-testid={'button-test'} onClick={handleReverse} isLoader={loader} disabled={value===""} /*disabled={loader}*/> </Button>
        </div>
        <ul className="list-box" data-testid={'list-test'}>
          {sortableArr !== null
            ? sortableArr.map((elem, index) => {
                return <li className="list-box_circle" key={index} data-key={index}><Circle letter={elem.letter} state={elem.status}></Circle></li>;
              })
            : null}
        </ul>
      </div>
    </SolutionLayout>
  );
};
