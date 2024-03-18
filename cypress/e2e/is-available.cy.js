/// <reference types="cypress" />
import {LOCALHOST} from '../../src/constants/routing-url'

describe('Тестирование работоспособности приложения', () => {
  it('приложение поднялось', () => {
    cy.visit(LOCALHOST)
  })
})