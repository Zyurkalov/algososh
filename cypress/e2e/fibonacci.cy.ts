/// <reference types="cypress" />
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {divClassDefault} from '../../src/constants/testConstants' 

describe("Тестирование компонента String", () => {
  const fibonacciNumbers = ['1', '1', '2', '3', '5', '8', '13'];

  beforeEach(() => {
    cy.goToVisit('fibonacci');
  });

  it("если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.checkButtonStateAfterClearInput("Рассчитать")
  });

  it("проверяем что числа генерируются корректно", () => {
    cy.get("input").type(`${fibonacciNumbers.length - 1}`);

    cy.checkButtonState("Рассчитать", true).click().should("be.disabled");
    cy.get("input").should("be.disabled");
    
    cy.wait(SHORT_DELAY_IN_MS * fibonacciNumbers.length);
    
    cy.get("li").should("have.length", fibonacciNumbers.length)
    cy.checkEachList(divClassDefault, fibonacciNumbers) 

    cy.checkButtonState("Рассчитать", true)
    cy.get('ul').should('exist').find('li').should('have.length', fibonacciNumbers.length)
  });
});