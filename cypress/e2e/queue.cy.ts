/// <reference types="cypress" />
import {
  divClassDefault,
  divClassChanging,
  divClassModified,
  classStyleObject,
} from "../../src/constants/testConstants";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { pClassTextInsideСircle, divClassTextСircleHead, divClassTextСircleTail, pClassTextСircleLetter } from "../../src/constants/testConstants";

describe("Тестирование компонента Queue", () => {
  const queueValue = ["1", "100", "end"];
  beforeEach(() => {
    cy.goToVisit("queue");
  });

  it("если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.checkButtonStateAfterClearInput("Добавить");
  });

  it("добавили элементы в очередь", () => {
    queueValue.forEach((value, index) => {
      cy.get("input").type(value);
      cy.contains("button", "Добавить").click();

      cy.get("li").eq(index).then(($li) => {
          if (index === 0) {
            //если элемент первый в очереди, проверяем наличие метки "head"
            cy.wrap($li)
              .find(divClassTextСircleHead).should("have.text", "head");
          } else {
            //если элемент НЕ первый в очереди, проверяем отсуствие метки "head"
            //и осуствие метки "tail" у предыдущего элемента 
            cy.wrap($li)
              .find(divClassTextСircleHead).should("have.text", "");
              cy.get("li").eq(index-1).then(($previous) => {
                cy.wrap($previous).find(divClassTextСircleTail).should("have.text", "");
              })
          }
          cy.wrap($li)
            .find(divClassTextСircleTail).should("have.text", "tail")
            .parent()
            .find(divClassChanging).should("exist")
            .parent()
            .find(pClassTextСircleLetter).should("have.text", value);

          cy.wait(DELAY_IN_MS);
          cy.wrap($li).find(divClassDefault).should("exist");
        });
        // проверяем что первый элемент все еще имеет метку "head"
        cy.get("li").eq(0).then(($head) => {
          cy.wrap($head).find(divClassTextСircleHead).should("have.text", "head");
        });
    });
  });

  it('проверяем правильность удаления элемента из очереди', () => {
    let headIndex = 0;

   queueValue.forEach((value) => {
      cy.get('input').type(value)
      cy.contains("button", "Добавить").click()
      cy.wait(DELAY_IN_MS)
    })

    cy.queueInteractElementAtIndex(headIndex, queueValue, classStyleObject)
      headIndex = headIndex + 1;
    cy.wait(DELAY_IN_MS)
    cy.get("li").eq(headIndex).then(($li) => {
      cy.wrap($li).find(divClassTextСircleHead).should("have.text", "head")
      .parent()
      .find(divClassDefault).should("exist")
    })

    cy.queueInteractElementAtIndex(headIndex, queueValue, classStyleObject)
      headIndex = headIndex + 1;
    cy.wait(DELAY_IN_MS)
    cy.get("li").eq(headIndex).then(($li) => {
      cy.wrap($li).find(divClassTextСircleHead).should("have.text", "head")
      .parent()
      .find(divClassDefault).should("exist")
    })
});
  it("проверяем поведение кнопки «Очистить»", () => {
    cy.checkButtonState("Очистить", false)

    queueValue.forEach((value) => {
      cy.get('input').type(value)
      cy.contains("button", "Добавить").click()
      cy.wait(DELAY_IN_MS)
    })

    cy.checkButtonState("Очистить", true).click()
    cy.get('li').find(pClassTextСircleLetter).should('have.text', '');
    cy.get('li').find(divClassTextСircleHead).should('have.text', '');
    cy.get('li').find(divClassTextСircleTail).should('have.text', '');
    cy.checkButtonState("Очистить", false)
  })
});
