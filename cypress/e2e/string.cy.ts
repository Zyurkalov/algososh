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
    cy.checkButton("Развернуть")
  });

  it("коректно добавляются значения", () => {
    cy.get("input").type("echo");
    cy.contains("button", "Развернуть").should("not.be.disabled").click().should("be.disabled");
    cy.get("input").should("be.disabled");
    cy.get("li").should("have.length", 4)

    cy.checkingEachList(listDefault_style, firstIteration_text, 0) 
    cy.checkingEachList(firstIteration_style, firstIteration_text, DELAY_IN_MS)
    cy.checkingEachList(secondIteration_style, secondIteration_text, DELAY_IN_MS)
    cy.checkingEachList(divClassModified, thirdIteration_text, DELAY_IN_MS)

    cy.contains('button', "Развернуть").should('not.be.disabled')
  });
});
