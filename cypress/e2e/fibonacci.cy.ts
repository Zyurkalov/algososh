/// <reference types="cypress" />
import { LOCALHOST } from "../../src/constants/routing-url";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {divClassDefault} from '../../src/constants/testConstants' 

describe("Тестирование компонента String", () => {
  const fibonacciNumbers = ['1', '1', '2', '3', '5', '8', '13'];

  beforeEach(() => {
    cy.goToVisit('fibonacci');
  });

  it("если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.checkButton("Рассчитать")
  });

  it("проверяем что числа генерируются корректно", () => {
    cy.get("input").type(`${fibonacciNumbers.length - 1}`);
    cy.contains("button", "Рассчитать").click().should("be.disabled");
    cy.get("input").should("be.disabled");
    
    cy.wait(SHORT_DELAY_IN_MS * fibonacciNumbers.length - 1);
    
    cy.get("li")
    .should("have.length", fibonacciNumbers.length)
    cy.checkingEachList(divClassDefault, fibonacciNumbers) 

    cy.contains('button', "Рассчитать").should('not.be.disabled')
  });
});