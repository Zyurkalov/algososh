import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";
// getByTestId используем когда елемент гарантировано должен быть, иначе вернет Error().
// queryByTestId если объект может быть null.
// может спользовать toBeTruthy()?

describe("Circle ui-component", () => {
  it("рендерится без содержимого", () => {
    const tree = renderer.create(<Circle letter={""} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендерится с содержимым", () => {
    const letterValue = "Hi";

    const tree = renderer.create(<Circle letter={letterValue} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендерится с head", () => {
    const headValue = "head";

    const tree = renderer.create(<Circle head={headValue} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендерится с tail", () => {
    const tailValue = "head";

    const tree = renderer.create(<Circle tail={tailValue} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендерится с react-элементом в head", () => {
    const reactElement = <span>Hello world?</span>;

    const tree = renderer.create(<Circle head={reactElement} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендерится с react-элементом в tail", () => {
    const reactElement = <span>Hello world?</span>;

    const tree = renderer.create(<Circle tail={reactElement} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендерится с индексом", () => {
    const tree = renderer.create(<Circle index={100500} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендерится с пропом isSmall ===  true", () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендерится в состоянии default", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендерится в состоянии Changing", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендерится в состоянии Modified", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
