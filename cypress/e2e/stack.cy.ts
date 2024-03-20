import {divClassDefault, divClassChanging, divClassModified} from '../../src/constants/testConstants' 
import { DELAY_IN_MS } from "../../src/constants/delays";

describe('Тестирование компонента Stack', () => {
  const stackValue = ['1', '100', '0' ,'10' ,'11' ,'end']
    beforeEach(() => {
        cy.goToVisit('stack');
      });
    
      it("если в инпуте пусто, то кнопка добавления недоступна", () => {
        cy.checkButton("Добавить")
      });
      
      it("добавили элемент в стек", () => {
        const input = cy.get('input')

        input.type(stackValue[0])
        cy.contains("button", "Добавить").click().should('be.disabled')
        input.should('be.disabled')

        cy.checkingEachList(divClassChanging, stackValue)
        cy.checkingEachList(divClassDefault, stackValue, DELAY_IN_MS)
      });

      it("проверяем поведение кнопки «Очистить»", () => {
        // const input = cy.get('input')

        // input.type(stackValue[0])
        // cy.contains("button", "Добавить").click().should('be.disabled')
        // input.should('be.disabled')

        // cy.checkingEachList(divClassChanging, stackValue)
        // cy.checkingEachList(divClassDefault, stackValue, DELAY_IN_MS)
      });
})