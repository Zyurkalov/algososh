import {divClassDefault, divClassChanging, divClassModified} from '../../src/constants/testConstants' 
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../src/constants/delays";

/// <reference types="cypress" />
describe("Тестирование переходов по страницам", () => {
  
  beforeEach(() => {
    cy.goToVisit("list");
  });

  it("если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.checkButtonStateAfterClearInput("Добавить");
    cy.checkButtonState("Добавить в head", false);
    cy.checkButtonState("Добавить в tail", false);
    cy.checkButtonState("Добавить по индексу", false);
    cy.checkButtonState("Удалить по индексу", false);
    cy.checkButtonState("Удалить из head", true);
    cy.checkButtonState("Удалить из tail", true);
  });

});