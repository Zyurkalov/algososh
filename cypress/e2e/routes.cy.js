/// <reference types="cypress" />
import {LOCALHOST} from '../../src/constants/routing-url'

describe('Тестирование переходов по страницам', () => {
  beforeEach(() => {
        cy.visit(LOCALHOST);
      });

    it('Строка', () => {
      cy.get('a[href="/recursion"]').click();
      cy.url().should('include', '/recursion');

      cy.get('h3').contains('Строка');
      cy.get('button').not(':contains("К оглавлению")').should('exist');
      cy.get('input').should('exist');
    });

    it('Последовательность Фибоначчи', () => {
      cy.get('a[href="/fibonacci"]').click();
      cy.url().should('include', '/fibonacci');

      cy.get('h3').contains('Последовательность Фибоначчи');
      cy.get('button').not(':contains("К оглавлению")').should('exist');
      cy.get('input').should('exist');
    });

    it('Сортировка массива', () => {
      cy.get('a[href="/sorting"]').click();
      cy.url().should('include', '/sorting');

      cy.get('h3').contains('Сортировка массива');
      cy.get('button').not(':contains("К оглавлению")').should('exist');
      cy.get('label').should('exist');
    });

    it('Стек', () => {
      cy.get('a[href="/stack"]').click();
      cy.url().should('include', '/stack');

      cy.get('h3').contains('Стек');
      cy.get('button').not(':contains("К оглавлению")').should('exist');
      cy.get('input').should('exist');
    });

    it('Очередь', () => {
      cy.get('a[href="/queue"]').click();
      cy.url().should('include', '/queue');

      cy.get('h3').contains('Очередь');
      cy.get('button').not(':contains("К оглавлению")').should('exist');
      cy.get('ul').should('exist').find('li').should('have.length', 7)
      cy.get('input').should('exist');
    });

    it('Связный список', () => {
      cy.get('a[href="/list"]').click();
      cy.url().should('include', '/list');

      cy.get('h3').contains('Связный список');
      cy.get('button').not(':contains("К оглавлению")').should('exist');
      cy.get('ul').should('exist').find('li').should('have.length', 4)
      cy.get('input').should('exist');
    });
  })