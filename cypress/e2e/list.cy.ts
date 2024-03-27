/// <reference types="cypress" />

import {divClassDefault, divClassChanging, divClassModified} from '../../src/constants/testConstants' 
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../src/constants/delays";
describe("Тестирование компонента List", () => {
  const defaultList = ['1', '22', '3', 'end']
  beforeEach(() => {
    cy.goToVisit("list");
  });

  it("проверка состояния кнопкок при пустом инпуте", () => {
    cy.checkButtonStateAfterClearInput("Добавить");
    cy.checkButtonState("Добавить в head", false);
    cy.checkButtonState("Добавить в tail", false);
    cy.checkButtonState("Добавить по индексу", false);
    cy.checkButtonState("Удалить по индексу", false);
    cy.checkButtonState("Удалить из head", true);
    cy.checkButtonState("Удалить из tail", true);
  });

  it("отрисовка дефолтного списка", () => {
    defaultList.forEach((value, index) => {
      if(index === 0) {
        cy.listVerifyElementAtIndex(defaultList, index,'head')
      }else if (index === defaultList.length -1) {
        cy.listVerifyElementAtIndex(defaultList, index,'tail')
      }else{
        cy.listVerifyElementAtIndex(defaultList, index)
      }
    })
  });

  it('добавление элемента по индексу', () => {
    const typeValue = '2'
    const typeIndex = 2
    const newList = [...defaultList.slice(0, typeIndex), typeValue, ...defaultList.slice(typeIndex)]

    cy.get('input[placeholder="Введите значение"]').should("not.be.disabled").type(typeValue )
    cy.get('input[placeholder="Введите индекс"]').should("not.be.disabled").type(`${typeIndex}`)
    cy.get('button').contains("Добавить по индексу").should("not.be.disabled").click()
    
    cy.listInteractAddElementAtIndex(typeValue, typeIndex, SHORT_DELAY_IN_MS)
    cy.checkEachList(divClassDefault, newList)
  })

  it('добавления элемента в head', () => {
    const typeValue = '2'
    const typeIndex = 0
    const newList = [...defaultList.slice(0, typeIndex), typeValue, ...defaultList.slice(typeIndex)]

    cy.get('input[placeholder="Введите значение"]').should("not.be.disabled").type(typeValue )
    cy.get('button').contains("Добавить в head").should("not.be.disabled").click()
    
    cy.listInteractAddElementAtIndex(typeValue, typeIndex, SHORT_DELAY_IN_MS)
    cy.checkEachList(divClassDefault, newList)
    cy.listVerifyElementAtIndex(newList, typeIndex, 'head')
  })

  it('добавления элемента в tail', () => {
    const typeValue = '2'
    const typeIndex = defaultList.length
    const newList = [...defaultList.slice(0, typeIndex), typeValue, ...defaultList.slice(typeIndex)]

    cy.get('input[placeholder="Введите значение"]').should("not.be.disabled").type(typeValue)
    cy.get('button').contains("Добавить в tail").should("not.be.disabled").click()
    
    cy.listInteractAddElementAtIndex(typeValue, typeIndex, SHORT_DELAY_IN_MS)
    cy.checkEachList(divClassDefault, newList)
    cy.listVerifyElementAtIndex(newList, typeIndex, 'tail')
  })

  it('удаление элемента по индексу', () => {
    const typeIndex = 2
    const value = defaultList[typeIndex]
    const newList = defaultList.filter((elem, index) => index !== typeIndex)

    cy.get('input[placeholder="Введите индекс"]').should("not.be.disabled").type(`${typeIndex}`)
    cy.get('button').contains("Удалить по индексу").should("not.be.disabled").click()
    
    cy.listRemoveElementAtIndex( value, typeIndex, SHORT_DELAY_IN_MS)
    cy.checkEachList(divClassDefault, newList)
  })

  it('удаление элемента из head', () => {
    const typeIndex = 0
    const value = defaultList[typeIndex]
    const newList = defaultList.filter((elem, index) => index !== typeIndex)

    cy.get('input[placeholder="Введите индекс"]').should("not.be.disabled").type(`${typeIndex}`)
    cy.get('button').contains("Удалить по индексу").should("not.be.disabled").click()
    
    cy.listRemoveElementAtIndex( value, typeIndex, SHORT_DELAY_IN_MS)
    cy.checkEachList(divClassDefault, newList)
    cy.listVerifyElementAtIndex(newList, typeIndex, 'head')
  })

  it('удаление элемента из tail', () => {
    const typeIndex = defaultList.length-1
    const value = defaultList[typeIndex]
    const newList = defaultList.filter((elem, index) => index !== typeIndex)

    cy.get('input[placeholder="Введите индекс"]').should("not.be.disabled").type(`${typeIndex}`)
    cy.get('button').contains("Удалить по индексу").should("not.be.disabled").click()
    
    cy.listRemoveElementAtIndex( value, typeIndex, SHORT_DELAY_IN_MS)
    cy.checkEachList(divClassDefault, newList)
    cy.listVerifyElementAtIndex(newList, typeIndex-1, 'tail')
  })
});