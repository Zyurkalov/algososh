import {divClassDefault, divClassChanging, divClassModified} from '../../src/constants/testConstants' 
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../src/constants/delays";

/// <reference types="cypress" />
describe("Тестирование переходов по страницам", () => {
  const queueValue = ['1', '100', 'end']
  beforeEach(() => {
    cy.goToVisit("queue");
  });

  it("если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.checkButtonStateAfterClearInput("Добавить");
  });
  it("добавили элементы в очередь", () => {

  });
  it("проверяем поведение кнопки «Очистить»", () => {
    cy.checkButtonState("Очистить", false)

    queueValue.forEach((value) => {
      cy.get('input').type(value)
      cy.contains("button", "Добавить").click()
      cy.wait(DELAY_IN_MS)
    })

    cy.checkButtonState("Очистить", true).click()
    cy.get('li').find('p[class*=circle_letter__]').should('have.text', '');
    cy.get('li').find('div[class*=circle_head]').should('have.text', '');
    cy.get('li').find('div[class*=circle_tail]').should('have.text', '');
    cy.checkButtonState("Очистить", false)
  })
});
