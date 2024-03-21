import { pClassTextInsideСircle } from "../../src/constants/testConstants";
import { LOCALHOST } from "../../src/constants/routing";

/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
Cypress.Commands.add("checkEachList", (arrayStyle, arrayText, timer = 0) => {
    if (Array.isArray(arrayStyle)) {
      cy.wait(timer);
      return cy.get("li").each(($li, index) => {
        cy.wrap($li).find(arrayStyle[index]).should("exist");
        cy.wrap($li)
          .find(`${pClassTextInsideСircle}`)
          .should("have.text", arrayText[index]);
      });
    } else {
      cy.wait(timer);
      return cy.get("li").each(($li, index) => {
        cy.wrap($li).find(arrayStyle).should("exist");
        cy.wrap($li)
          .find(`${pClassTextInsideСircle}`)
          .should("have.text", arrayText[index]);
      });
    }
  }
);
Cypress.Commands.add("checkLastElement", (arrayStyle, arrayText, timer = 0) => {
  cy.wait(timer);
  return cy.get("li").each(($li, index) => {
    cy.get('li').last().find(arrayStyle).should("exist");
    cy.wrap($li)
    .find(`${pClassTextInsideСircle}`)
    .should("have.text", arrayText[index]);
  });
});
Cypress.Commands.add("checkRoutes", (key, header) => {
  const anchor = `a[href="${key}"]`
  cy.get(anchor).click();
  cy.url().should('include', key);

  cy.get('h3').contains(`${header}`);
  cy.get('button').not(':contains("К оглавлению")').should('exist');
  cy.get('input').should('exist');
})

Cypress.Commands.add("goToVisit", (key?) => {
  if (key) {
    cy.visit(`${LOCALHOST}/${key}`);
  } else {
    cy.visit(`${LOCALHOST}`);
  }
});

Cypress.Commands.add("checkButtonState", (text, boolean = true) => {
  if(boolean) {
    cy.contains("button", `${text}`).should("not.be.disabled");
  } else {
    cy.contains("button", `${text}`).should('be.disabled');
  }
});

Cypress.Commands.add('checkButtonStateAfterClearInput', (text) => {
  cy.get('input').clear();
  cy.contains("button", `${text}`).should("be.disabled");
});