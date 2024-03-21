//без этого TypeScript ругается на типизацию кастомных модулей для Cypress

declare namespace Cypress {
    interface Chainable {
      goToVisit(key?: string ): Cypress.Chainable<Element>;
      checkButtonState(text: string, boolean: boolean): Cypress.Chainable<Element>;
      checkButtonStateAfterClearInput(text: string): Cypress.Chainable<Element>;
      checkEachList(arrayStyle: string | string[], arrayText: string[], timer?: number): void;
      checkLastElement(arrayStyle: string, arrayText: string[], timer?: number): void;
      checkRoutes(key: string, headerValue: string): Cypress.Chainable<Element>;
    }
  }