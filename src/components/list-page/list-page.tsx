import React, { ChangeEvent, useState, useEffect} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { useCustomEffect } from "../../utility/use-custom-effect";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import style from "./list-page.module.css"
import "../../index.css"

export const ListPage: React.FC = () => {
  const [value, setValue] = useState('')
  const [index, setIndex] = useState('')
  const [loader, setLoader] = useState(false)

  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  const onChangeIndex = (event: ChangeEvent<HTMLInputElement>) => {
    setIndex(event.target.value)
  }
  const sortableArr = [{value: '1', status: ElementStates.Default}, 
                       {value: 'kek', status: ElementStates.Default},
                       {value: '11', status: ElementStates.Default},
                       {value: '0', status: ElementStates.Default}]
  return (
    <SolutionLayout title="Связный список">
      <div className="box-container">
        <div className="input-box">
            <Input placeholder="Введите значение" isLimitText={true} maxLength={4} value={value} onChange={onChangeValue} extraClass={`${style.input__size}`}></Input>
            <Button text='Добавить в head' isLoader={loader} /*disabled={loader}*/ extraClass={`${style.button__size_S}`}> </Button>
            <Button text='Добавить в tail' isLoader={loader} /*disabled={loader}*/ extraClass={`${style.button__size_S}`}> </Button>
            <Button text='Удалить из head' isLoader={loader} /*disabled={loader}*/ extraClass={`${style.button__size_S}`}> </Button>
            <Button text='Удалить из tail' isLoader={loader} /*disabled={loader}*/ extraClass={`${style.button__size_S}`}> </Button>
        </div>
        <div className="input-box">
            <Input placeholder="Введите индекс" value={index} onChange={onChangeIndex} extraClass={`${style.input__size}`}></Input>
            <Button text='Добавить по индексу' isLoader={loader} /*disabled={loader}*/ extraClass={`${style.button__size_M}`}> </Button>
            <Button text='Удалить по индексу' isLoader={loader} /*disabled={loader}*/ extraClass={`${style.button__size_M}`}> </Button>

        </div>
        <ul className="list-box">
          {sortableArr !== null
            ? sortableArr.map((elem, index) => {
                return <li className="list-box_circle" key={index}>
                  {index !== 0 ?<ArrowIcon></ArrowIcon> : null}
                  <Circle letter={elem.value} state={elem.status} index={index} tail={<Circle letter={elem.value} state={elem.status} isSmall={true}></Circle>}></Circle>
                  </li>;
              })
            : null}
        </ul>
      </div>
    </SolutionLayout>
  );
};
