import loginPage from "../support/pageObjects/loginPage"
import loginData from "../fixtures/loginData.json"
import directoryMenu from "../support/pageObjects/directoryMenu"

describe ('Verifikasi Menu Directory', () => {
  it('TC-DIR-001 Verifikasi List Karyawan', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
    directoryMenu.verifyViewDirectory()
  })

  it('TC-DIR-002 Verifikasi Search Tanpa Kriteria', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
    directoryMenu.verifyViewDirectory()
    cy.get('.orangehrm-horizontal-padding > .oxd-text').should('contain.text', 'Records')
    cy.intercept(
      'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0'
    ).as('EmployeeList')
    cy.get('.oxd-button--secondary').click()
    cy.get('.orangehrm-horizontal-padding > .oxd-text').should('contain.text', 'Records')
    cy.wait('@EmployeeList').its('response.statusCode').should('eq', 200)
  })

  it('TC-DIR-003 Verifikasi Search Tanpa Kriteria', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
    directoryMenu.verifyViewDirectory()
    cy.get('.oxd-autocomplete-text-input > input').should('be.visible').type('timothy')
    cy.contains('.oxd-autocomplete-option', 'Timothy Lewis Amiano').should('be.visible').click()
    cy.intercept(
      'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0&empNumber=95'
    ).as('SearchNameEmployee')
    cy.get('.oxd-button--secondary').click()
    cy.get('.orangehrm-directory-card-header').should('be.visible').and('have.text', 'Timothy Lewis Amiano ')
    cy.wait('@SearchNameEmployee').its('response.statusCode').should('eq', 200)
  })

  it('TC-DIR-004 Verifikasi Search dengan Nama Invalid', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
    directoryMenu.verifyViewDirectory()
    cy.get('.oxd-autocomplete-text-input > input').should('be.visible').type('Xyz999')
    cy.intercept(
      'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?nameOrId=Xyz999'
    ).as('SearchInvalidName')
    cy.contains('.oxd-autocomplete-option', 'No Records Found').should('be.visible').click()
    cy.get('.oxd-button--secondary').click()
    cy.get('.oxd-input-group > .oxd-text').should('exist')
    cy.get('.orangehrm-horizontal-padding > .oxd-text').should('contain.text', 'Records')
    cy.wait('@SearchInvalidName').its('response.statusCode').should('eq', 200)
  })

  it('TC-DIR-005 Verifikasi Filter Berdasarkaan Job Title', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
    directoryMenu.verifyViewDirectory()
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click()
    cy.contains('.oxd-select-option', 'Chief Financial Officer').should('be.visible').click()
    cy.intercept(
      'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0&jobTitleId=2'
    ).as('SearchBasedJobTitle')
    cy.get('.oxd-button--secondary').click()
    cy.wait('@SearchBasedJobTitle').its('response.statusCode').should('eq', 200)
    cy.contains('.orangehrm-directory-card-subtitle','Chief Financial Officer').should('be.visible')
  })
})