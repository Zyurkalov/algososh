/// <reference types="cypress" />

//без этого TypeScript ругается на типизацию кастомных модулей для Cypress
declare namespace Cypress {
    interface Chainable {
      goToVisit(key?: string ): Cypress.Chainable<Element>;
      checkButtonState(text: string, boolean: boolean): Cypress.Chainable<Element>;
      checkButtonStateAfterClearInput(text: string): Cypress.Chainable<Element>;
      checkEachList(arrayStyle: string | string[], arrayText: string[], timer?: number): void;
      checkLastElement(arrayStyle: string, arrayText: string[], timer?: number): void;
      checkRoutes(key: string, headerValue: string): Cypress.Chainable<Element>;
      queueInteractElementAtIndex(index: number, arr: string[], style: {
        divClassDefault: string;
        divClassChanging: string;
        divClassModified: string;
      }): void;
      listVerifyElementAtIndex(array: string[], index: number, target?: 'head'|'tail'|'other'): void;
      listInteractAddElementAtIndex(value: number| string, index:number, timer: number): void;
      listRemoveElementAtIndex(value: string, typeIndex: number, timet: number): void;
    }
  }