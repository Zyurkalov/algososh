import {ChangeEvent, useState} from "react";

export function useForm(inputValue='', indexValue='') {
    const [value, setValue] = useState(inputValue);
    const [index, setIndex] = useState(indexValue);
  
    const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
    };
    const handleIndexChange = (event: ChangeEvent<HTMLInputElement>) => { 
        const inputNumber = parseInt(event.target.value, 10);
        if (!isNaN(inputNumber) && inputNumber >= 0) {
          setIndex(event.target.value);
        } else {
          setIndex('')
        }
    };

    return {value, setValue, handleValueChange, index, setIndex, handleIndexChange};
  }