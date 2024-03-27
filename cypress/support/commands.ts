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

import {
  pClassTextInsideСircle, divClassTextСircleHead, divClassTextСircleTail,
  pClassTextСircleLetter, classStyleObject
} from "../../src/constants/testConstants";
import { LOCALHOST } from "../../src/constants/routing";

const { divClassDefault, divClassChanging, divClassModified } = classStyleObject;

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
  if (boolean) {
    cy.contains("button", `${text}`).should("not.be.disabled");
  } else {
    cy.contains("button", `${text}`).should('be.disabled');
  }
});

Cypress.Commands.add('checkButtonStateAfterClearInput', (text) => {
  cy.get('input').clear();
  cy.contains("button", `${text}`).should("be.disabled");
});

Cypress.Commands.add("queueInteractElementAtIndex", (headIndex, queueValue, style) => {
  const { divClassDefault, divClassChanging } = style
  cy.get("li").eq(headIndex).as('head')
  cy.get('@head').find(divClassTextСircleHead).should("have.text", "head")
    .parent()
    .find(divClassDefault).should("exist")
    .parent()
    .find(pClassTextСircleLetter).should("have.text", queueValue[headIndex]);

  if (headIndex < queueValue.length - 1) {
    //проверяем следующий элемент в очереди, на отсуствие метки "head"
    cy.get("li").eq(headIndex + 1).find(divClassTextСircleHead).should("have.text", "");
  } else {
    cy.get("li").eq(queueValue.length - 1).find(divClassTextСircleHead).should("have.text", "");
  }
  cy.contains("button", "Удалить").click()
  cy.get("li").eq(headIndex).find(divClassChanging).should("exist");
})

Cypress.Commands.add('listVerifyElementAtIndex', (defaultList, index, target = 'other') => {
  const result = target === 'head' || target === 'tail' ? target : '';
  const divAvailable = target === 'head' ? divClassTextСircleHead : divClassTextСircleTail;
  const divMissing = target === 'tail' ? divClassTextСircleHead : divClassTextСircleTail;

  cy.get("li").eq(index).as(target);
  cy.get(`@${target}`)
    .find(divAvailable).should("have.text", result)
    .parent()
    .find(divMissing).should("have.text", '')
    .parent()
    .find(pClassTextInsideСircle).should("have.text", defaultList[index]).should('exist')
  cy.get(`@${target}`).find(divClassDefault).should('exist')
})

Cypress.Commands.add('listInteractAddElementAtIndex', (value, index, timer) => {
  cy.get('li').its('length').then((length) => {
    let listLength = length

    let i = 0
    while (i <= index && i < listLength) {
      cy.get("li").eq(i).as('target');
      cy.get('@target').find('div[class*=circle_small__][class*="circle_changing__"]').should('exist').as('smallCircle')

      cy.get('@smallCircle').find(pClassTextInsideСircle).should('text', value)

      if (i > 0) {
        cy.get("li").eq(i - 1).as('prev');
        cy.get('@prev').find(divClassChanging).should('exist')
      }
      if (i === index) {
        cy.get("li").eq(i).as('goal');
        cy.get('@goal').find(divClassDefault).should('exist')
        cy.wait(timer)
        cy.get('@goal').find(divClassChanging).should('exist')
        cy.get('@goal').find(pClassTextInsideСircle).eq(1).should('text', '')
        cy.wait(timer)
        cy.get('@goal').find(divClassModified).should('exist')
        cy.get('@goal').find(pClassTextInsideСircle).should('text', value)
        cy.wait(timer)
        cy.get('@goal').find(divClassDefault).should('exist')
      }
      i++
    }
    cy.wait(timer)
  })
})
Cypress.Commands.add('listRemoveElementAtIndex', (value, index, timer) => {
  cy.get("li").eq(index).as('target');
  cy.get('@target').find(divClassChanging).should('exist').should('text', value)
  cy.wait(timer)
  cy.get('@target').find(divClassDefault).should('exist').should('text', '')
  cy.get('@target').find('div[class*=circle_small__][class*="circle_changing__"]').should('exist').should('text', value)
  cy.wait(timer)
})