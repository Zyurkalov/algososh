/// <reference types="cypress" />

import {setRoutesOption} from "../../src/constants/routing"
describe('Тестирование переходов по страницам', () => {

  beforeEach(() => {
        cy.goToVisit();
      });

  setRoutesOption.forEach((option) => {
    it(option.header, () => {
      option.anchor = `a[href="${option.key}"]`
      cy.checkRoutes(option.key, option.header)
    });
  });

    // it('Строка', () => {
    //   const option = routesOption.recursion
    //   option.anchor = `a[href="${option.key}"]`
    //   cy.checkRoutes(option.key, option.anchor, option.header)
    // });

    // it('Последовательность Фибоначи', () => {
    //   const option = routesOption.fibonacci
    //   option.anchor = `a[href="${option.key}"]`
    //   cy.checkRoutes(option.key, option.anchor, option.header)
    // });

    // it('Сортировка массива', () => {
    //   const option = routesOption.sorting
    //   option.anchor = `a[href="${option.key}"]`
    //   cy.checkRoutes(option.key, option.anchor, option.header)
    // });

    // it('Стек', () => {
    //   const option = routesOption.stack
    //   option.anchor = `a[href="${option.key}"]`
    //   cy.checkRoutes(option.key, option.anchor, option.header)
    // });

    // it('Очередь', () => {
    //   const option = routesOption.queue;
    //   option.anchor = `a[href="${option.key}"]`
    //   cy.checkRoutes(option.key, option.anchor, option.header)
    //   cy.get('ul').should('exist').find('li').should('have.length', 7)
    // });

    // it('Связный список', () => {
    //   const option = routesOption.list;
    //   option.anchor = `a[href="${option.key}"]`
    //   cy.checkRoutes(option.key, option.anchor, option.header)
    //   cy.get('ul').should('exist').find('li').should('have.length', 4)
    // });
  })