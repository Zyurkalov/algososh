/// <reference types="cypress" />
import {headerMainPage} from '../../src/constants/testConstants' 

describe('Тестирование работоспособности приложения', () => {
  it('приложение поднялось', () => {
    cy.goToVisit()
    cy.get('h1').should('contain.text', headerMainPage)
  })
})