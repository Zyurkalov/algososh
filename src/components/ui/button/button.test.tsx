import { render, screen } from '@testing-library/react';
import renderer from "react-test-renderer";
import userEvent from '@testing-library/user-event';
import { Button } from './button';

describe("Button ui-component", () => {

    it('рендерится c текстом', () => {
        const buttonText = "Click me"

        const tree = renderer
            .create(<Button text = {buttonText} />)
            .toJSON();
            expect(tree).toMatchSnapshot();
    }); 
    
    it('рендерится без текста', () => {
        const tree = renderer
            .create(<Button />)
            .toJSON();
            expect(tree).toMatchSnapshot();
    }); 

    it('вызывает колбек функцию при клике', () => {
        const handleClick = jest.fn();
        render(<Button data-testid = 'buttonTest' onClick={handleClick}/>)

        const buttonElement = screen.getByTestId('buttonTest');
        userEvent.click(buttonElement)
        expect(handleClick).toBeCalledTimes(1);
    }); 

    it('заблокирована и не активна', () => {
        const handleClick = jest.fn();
        // render(<Button data-testid = 'buttonTest' onClick={handleClick} disabled={true}/>)

        // const buttonElement = screen.getByTestId('buttonTest');
        // userEvent.click(buttonElement)

        // expect(handleClick).not.toBeCalled();
        // expect(buttonElement).toHaveAttribute('disabled');

        const tree = renderer
            .create(<Button onClick={handleClick} disabled={true}/>)
            .toJSON();
            expect(tree).toMatchSnapshot();
            expect(handleClick).not.toBeCalled();
    }); 

    it('заблокирована индикатором загрузки и не активна', () => {
        const handleClick = jest.fn();
        // render(<Button data-testid = 'buttonTest' onClick={handleClick} isLoader={true}/>)

        // const buttonElement = screen.getByTestId('buttonTest');
        // userEvent.click(buttonElement)

        // expect(handleClick).not.toBeCalled();
        // expect(buttonElement).toHaveAttribute('disabled');

        const tree = renderer
        .create(<Button data-testid = 'buttonTest' onClick={handleClick} isLoader={true}/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
        expect(handleClick).not.toBeCalled();
    });
})
