/// <reference types="cypress" />
import { LOCALHOST } from "../../src/constants/routing-url";
import { DELAY_IN_MS } from "../../src/constants/delays";

describe("Тестирование компонента String", () => {
  beforeEach(() => {
    cy.visit(`${LOCALHOST}/recursion`);
  });

  const firstIteration_style = [
    'div[class*="circle_changing"]',
    'div[class*="circle_default"]',
    'div[class*="circle_defaul"]',
    'div[class*="circle_changing"]'
  ]
  const firstIteration_text = [
    't','e','s','t'
  ]
  const secondIteration_style = [
    'div[class*="circle_modified"]',
    'div[class*="circle_changing"]',
    'div[class*="circle_changing"]',
    'div[class*="circle_modified"]'
  ]
  const secondIteration_text = [
    't','e','s','t'
  ]
  const thirdIteration_style = [
    'div[class*="circle_modified"]',
    'div[class*="circle_modified"]',
    'div[class*="circle_modified"]',
    'div[class*="circle_modified"]'
  ]
  const thirdIteration_text = [
  't','s','e','t'
  ]

  it("если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.get("input").clear();
    cy.contains("button", "Развернуть").should("be.disabled");
  });

  it("коректно добавляются значения", () => {
    cy.get("input").type("test");
    cy.contains("button", "Развернуть")
      .should("not.be.disabled")
      .click()
      .should("be.disabled");
    cy.get("li")
      .should("have.length", 4)
      .each(($li) => {
        cy.wrap($li).find('div[class*="circle_default"]').should("exist");
      });

    cy.wait(DELAY_IN_MS);
    cy.get("li")
      .each(($li, index) => {
        cy.wrap($li).find(firstIteration_style[index]).should("exist");
        cy.wrap($li).find("p").should("have.text", firstIteration_text[index]);
      });

    cy.wait(DELAY_IN_MS);
    cy.get("li")
      .each(($li, index) => {
        cy.wrap($li).find(secondIteration_style[index]).should("exist");
        cy.wrap($li).find("p").should("have.text", secondIteration_text[index]);
      });

    cy.wait(DELAY_IN_MS);
    cy.get("li")
    .each(($li, index) => {
      cy.wrap($li).find(thirdIteration_style[index]).should("exist");
      cy.wrap($li).find("p").should("have.text", thirdIteration_text[index]);
    });

    cy.contains('button', "Развернуть").should('not.be.disabled')
  });
});
