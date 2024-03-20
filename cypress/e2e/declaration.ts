declare namespace Cypress {
    interface Chainable {
      goToVisit(key?: string ): void;
      checkButton(text: string): void;
      checkingEachList(arrayStyle: string | string[], arrayText: string[], timer?: number): void;
    }
  }