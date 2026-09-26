import loginPage from "../support/pageObjects/loginPage"
import loginData from "../fixtures/loginData.json"

describe ('Verifikasi Filter Menu Recruitment', () => {
  it('TC-REC-001 Verifikasi List Karyawan', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
  })
})

describe ('Tambah Kandidat', () => {
  it('TC-REC-002 Verifikasi Sukses Menambahkan Kandidat', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
    cy.get(':nth-child(5) > .oxd-main-menu-item').click()
    cy.url({timeout: 10000}).should('include', 'recruitment')
    cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('be.visible').and('have.text', 'Recruitment')
    cy.get('.oxd-table-filter-header-title > .oxd-text').should('be.visible').and('have.text', 'Candidates')
    cy.get('.orangehrm-header-container > .oxd-button').click()
    cy.get('[name="firstName"]').type('Dheandy')
    cy.get('[name="middleName"]').type('Divallino')
    cy.get('[name="lastName"]').type('Susanto')
    cy.get('.oxd-select-text').click()
    cy.contains('.oxd-select-option', 'Junior Account Assistant').should('be.visible').click()
    cy.get(':nth-child(3) > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Test123@gmail.com')
    cy.get('.oxd-grid-3 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('123456789')
    cy.get('.orangehrm-save-candidate-page-full-width > .oxd-input-group > :nth-child(2) > .oxd-input').type('Susanto')
    cy.get('.oxd-textarea').type('Nothing')
    cy.get('.oxd-checkbox-input').click()
    cy.get('.oxd-button--secondary').click()
    cy.get('.oxd-toast').should('exist').and('contain.text', 'Success')
  })
})