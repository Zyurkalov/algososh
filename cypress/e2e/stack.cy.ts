/// <reference types="cypress" />

import {divClassDefault, divClassChanging, divClassModified} from '../../src/constants/testConstants' 
import { DELAY_IN_MS } from "../../src/constants/delays";

describe('Тестирование компонента Stack', () => {
  const stackValue = ['1', '100', 'end']

    beforeEach(() => {
        cy.goToVisit('stack');
      });
    
    it("если в инпуте пусто, то кнопка добавления недоступна", () => {
        cy.checkButtonStateAfterClearInput("Добавить")
    });

    it("добавили элементы в стек", () => {
      stackValue.forEach((value) => {
        const input = cy.get('input')
        input.type(value)
        cy.contains("button", "Добавить").click().should('be.disabled')
        input.should('be.disabled')

        cy.checkLastElement(divClassChanging, stackValue)
        cy.checkLastElement(divClassDefault, stackValue, DELAY_IN_MS)
        input.should('not.be.disabled')
      })
    });

    it("проверяем поведение кнопки «Удалить»", () => {
      cy.checkButtonState("Удалить", false)
      stackValue.forEach((value) => {
        cy.get('input').type(value)
        cy.contains("button", "Добавить").click()
        cy.wait(DELAY_IN_MS)
      })
      const getLastElement = () => {
        return cy.get('li').last()
      };

      getLastElement().find(divClassDefault).should("exist");
      getLastElement().find('div[class*=circle_head__]').should("have.text", 'top');
      getLastElement().find('p[class*=circle_letter__]').should("have.text", stackValue[stackValue.length-1]);
      
      cy.checkButtonState("Удалить", true).click()

      getLastElement().find(divClassChanging).should("exist");
      getLastElement().find('div[class*=circle_head__]').should("have.text", 'top');
      getLastElement().find('p[class*=circle_letter__]').should("have.text", stackValue[stackValue.length-2]);
    })

    it("проверяем поведение кнопки «Очистить»", () => {
      cy.checkButtonState("Очистить", false)

      stackValue.forEach((value) => {
        cy.get('input').type(value)
        cy.contains("button", "Добавить").click()
        cy.wait(DELAY_IN_MS)
      })
      cy.checkButtonState("Очистить", true).click()
      cy.get('li').should('not.exist')
    })
})