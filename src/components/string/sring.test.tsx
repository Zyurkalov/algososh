import { reverse } from '../../utility/string/reverse';
import { act } from 'react-test-renderer';
import {ElementStates} from "../../types/element-states"

describe('String-component', () => {

    const mockSetSortableArr = jest.fn();
    const mockSetLoader = jest.fn();

    it('разворачивает строку с чётным количеством символов', async() => {
        const incomingArray = [
            { letter: '1', status: ElementStates.Default },
            { letter: '2', status: ElementStates.Default },
            { letter: '3', status: ElementStates.Default },
            { letter: '4', status: ElementStates.Default },
        ];
        await act(async () => {
            const result = await reverse(incomingArray, mockSetSortableArr, mockSetLoader);
            expect(result).toEqual([
                { letter: '4', status: ElementStates.Modified },
                { letter: '3', status: ElementStates.Modified },
                { letter: '2', status: ElementStates.Modified },
                { letter: '1', status: ElementStates.Modified },
            ]);
        });
    }); 
    it('разворачивает строку с НЕчётным количеством символов', async() => {
        const incomingArray = [
            { letter: '1', status: ElementStates.Default },
            { letter: '2', status: ElementStates.Default },
            { letter: '3', status: ElementStates.Default },
        ];
        await act(async () => {
            const result = await reverse(incomingArray, mockSetSortableArr, mockSetLoader);
            expect(result).toEqual([
                { letter: '3', status: ElementStates.Modified },
                { letter: '2', status: ElementStates.Modified },
                { letter: '1', status: ElementStates.Modified },
            ]);
        });
    }); 
    it('разворачивает строку с одним символом', async() => {
        const incomingArray = [
            { letter: '1', status: ElementStates.Default },
        ];
        await act(async () => {
            const result = await reverse(incomingArray, mockSetSortableArr, mockSetLoader);
            expect(result).toEqual([
                { letter: '1', status: ElementStates.Modified },
            ]);
        });
    }); 
    it('разворачивает пустую строку', async() => {
        const incomingArray = [
            { letter: '1', status: ElementStates.Default },
            { letter: '', status: ElementStates.Default },
        ];
        await act(async () => {
            const result = await reverse(incomingArray, mockSetSortableArr, mockSetLoader);
            expect(result).toEqual([
                { letter: '', status: ElementStates.Modified },
                { letter: '1', status: ElementStates.Modified },
            ]);
        });
    }); 
})