//без этого TypeScript ругается на типизацию кастомных модулей для Cypress

declare namespace Cypress {
    interface Chainable {
      goToVisit(key?: string ): void;
      checkButton(text: string): void;
      checkingEachList(arrayStyle: string | string[], arrayText: string[], timer?: number): void;
      checkRoutes(key: string, anchor: string, headerValue: string): void;
    }
  }