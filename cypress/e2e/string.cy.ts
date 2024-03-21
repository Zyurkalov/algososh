/// <reference types="cypress" />
import { DELAY_IN_MS } from "../../src/constants/delays";
import {divClassDefault, divClassChanging, divClassModified} from '../../src/constants/testConstants' 

describe("Тестирование компонента String", () => {
  const listDefault_style = [
    divClassDefault,
    divClassDefault,
    divClassDefault,
    divClassDefault
  ]
  const firstIteration_style = [
    divClassChanging,
    divClassDefault,
    divClassDefault,
    divClassChanging
  ]
  const secondIteration_style = [
    divClassModified,
    divClassChanging,
    divClassChanging,
    divClassModified
  ]
  const firstIteration_text = [
    'e','c','h','o'
  ]
  const secondIteration_text = [
    'o','c','h','e'
  ]
  const thirdIteration_text = [
    'o','h','c','e'
  ]
  
  beforeEach(() => {
    cy.goToVisit('recursion');
  });

  it("если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.checkButtonStateAfterClearInput("Развернуть")
  });

  it("коректно добавляются значения", () => {
    cy.get("input").type("echo");
    cy.checkButtonState("Развернуть", true).click().should("be.disabled");
    cy.get("input").should("be.disabled");
    cy.get("li").should("have.length", 4)

    cy.checkEachList(listDefault_style, firstIteration_text, 0) 
    cy.checkEachList(firstIteration_style, firstIteration_text, DELAY_IN_MS)
    cy.checkEachList(secondIteration_style, secondIteration_text, DELAY_IN_MS)
    cy.checkEachList(divClassModified, thirdIteration_text, DELAY_IN_MS)

    cy.checkButtonState("Развернуть", true)
  });
});
