import { TColumnArray } from "./sorting-page";
import { act } from "react-test-renderer";
import { bubbleSort } from "../../utility/get-bubble-sort";
import { ElementStates } from "../../types/element-states";

describe("Sorting-page-bubble", () => {
  const mockSetSortabledArr = jest.fn();

  it("Корректно сортирует массив из нескольких элементов", async() => {
    const incomingArray:TColumnArray[] = [
      { value: 100, state: ElementStates.Default },
      { value: 50, state: ElementStates.Default },
      { value: 0, state: ElementStates.Default },
    ];
    await act(async () => {
        const result = await bubbleSort(incomingArray,'up', 0, mockSetSortabledArr);
        expect(result).toEqual([
            { value: 0, state: ElementStates.Modified },
            { value: 50, state: ElementStates.Modified },
            { value: 100, state: ElementStates.Modified },
        ]);
    });
  });
  it("Корректно сортирует массив из одного элемента", async() => {
    const incomingArray:TColumnArray[] = [
      { value: 100, state: ElementStates.Default },
    ];
    await act(async () => {
        const result = await bubbleSort(incomingArray,'up', 0, mockSetSortabledArr);
        expect(result).toEqual([
            { value: 100, state: ElementStates.Modified },
        ]);
    });
  });
  it("Корректно сортирует пустой массив", async() => {
    const incomingArray:TColumnArray[] = [];
    await act(async () => {
        const result = await bubbleSort(incomingArray,'up', 0, mockSetSortabledArr);
        expect(result).toEqual([]);
    });
  });
});
