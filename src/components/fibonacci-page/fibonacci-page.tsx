import React, {ChangeEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import "../../index.css"

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState('')
  const [loader, setLoader] = useState(false)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  const handleReverse = () => {
  
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className="box-container">
        <div className="input-box">
            <Input placeholder="Введите текст" isLimitText={true} max={19} value={value} onChange={onChange} type={'number'}></Input>
            <Button text='Рассчитать' onClick={handleReverse} isLoader={loader} /*disabled={loader}*/> </Button>
        </div>
        <ul className="list-box">
        
        </ul>
      </div>
    </SolutionLayout>
  );
};