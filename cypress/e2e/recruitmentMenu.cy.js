import loginPage from "../support/pageObjects/loginPage"
import loginData from "../fixtures/loginData.json"
import recruitmentMenu from "../support/pageObjects/recruitmentMenu"
import recruitmentData from "../fixtures/recruitmentData.json"

describe ('Verifikasi Menu Recruitment', () => {
  it('TC-REC-001 Verifikasi Navigasi Halaman Recruitment', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
    recruitmentMenu.verifyViewRecruitment()
  })
})

describe ('Verifikasi Kandidat', () => {
  it('TC-REC-002 Verifikasi Sukses Menambahkan Kandidat', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
    recruitmentMenu.verifyViewRecruitment()
    recruitmentMenu.interceptAddCandidate()
    recruitmentMenu.clickAddCandidateButton()
    recruitmentMenu.inputCandidate(
      recruitmentData.firstName, 
      recruitmentData.middleName, 
      recruitmentData.lastName,
      recruitmentData.jobTitle,
      recruitmentData.email,
      recruitmentData.number,
      recruitmentData.keyword,
      recruitmentData.notes
    )
    recruitmentMenu.waitAddCandidate()
    recruitmentMenu.clickSaveButton()
    recruitmentMenu.verifySuccessMessage()
  })

  it('TC-REC-003 Verifikasi Sukses Hapus Kandidat', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
    recruitmentMenu.verifyViewRecruitment()
    recruitmentMenu.verifyCandidate(recruitmentData.firstName)
    recruitmentMenu.interceptDeleteCandidate()
    recruitmentMenu.clickDeleteIcon()
    recruitmentMenu.verifyConfirmationModal()
    recruitmentMenu.clickYes()
    recruitmentMenu.verifyDeletedMessage()
    recruitmentMenu.verifyDeletedCandidate(recruitmentData.firstName)
    recruitmentMenu.waitDeleteCandidate()
  })
})

describe ('Verifikasi Filter Kandidat', () => {
  it('TC-REC-004 Verifikasi Job Filter Kandidat', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
    recruitmentMenu.verifyViewRecruitment()
    recruitmentMenu.jobTitleFilter(recruitmentData.jobTitleFilter)
    recruitmentMenu.interceptFilterJob()
    recruitmentMenu.clickSearchButton()
    recruitmentMenu.verifyJobFilter(recruitmentData.jobTitleFilter)
    recruitmentMenu.waitFilterJob()
  })

  it('TC-REC-005 Verifikasi Vacancy Filter Kandidat', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
    recruitmentMenu.verifyViewRecruitment()
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click()
    cy.contains('.oxd-select-option', 'Sales Representative').should('be.visible').click()
    cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates?limit=50&offset=0&vacancyId=2&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC'
        ).as('FilterVacancy')
    recruitmentMenu.clickSearchButton()
    cy.get('.oxd-table-body > :nth-child(1) > .oxd-table-row').should('be.visible').and('contain.text', 'Sales Representative')
    cy.wait('@FilterVacancy').its('response.statusCode').should('eq', 200)
  })

  it('TC-REC-006 Verifikasi Hiring Manager Filter Kandidat', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
    recruitmentMenu.verifyViewRecruitment()
    cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click()
    cy.contains('.oxd-select-option', 'manda user').should('be.visible').click()
    cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates?limit=50&offset=0&hiringManagerId=7&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC'
        ).as('FilterHiringManager')
    recruitmentMenu.clickSearchButton()
    cy.get('.oxd-table-body > :nth-child(1) > .oxd-table-row').should('be.visible').and('contain.text', 'manda')
    cy.wait('@FilterHiringManager').its('response.statusCode').should('eq', 200)
  })

  it('TC-REC-007 Verifikasi Status Filter Kandidat', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
    recruitmentMenu.verifyViewRecruitment()
    cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click()
    cy.contains('.oxd-select-option', 'Application Initiated').should('be.visible').click()
    cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates?limit=50&offset=0&status=1&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC'
        ).as('FilterStatus')
    recruitmentMenu.clickSearchButton()
    cy.get('.oxd-table-body > :nth-child(1) > .oxd-table-row').should('be.visible').and('contain.text', 'Application Initiated')
    cy.wait('@FilterStatus').its('response.statusCode').should('eq', 200)
  })

  it('TC-REC-008 Verifikasi Reset Filter Kandidat', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
    recruitmentMenu.verifyViewRecruitment()
    cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click()
    cy.contains('.oxd-select-option', 'Application Initiated').should('be.visible').click()
    cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates?limit=50&offset=0&status=1&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC'
        ).as('FilterStatus')
    recruitmentMenu.clickSearchButton()
    cy.get('.oxd-table-body > :nth-child(1) > .oxd-table-row').should('be.visible').and('contain.text', 'Application Initiated')
    cy.wait('@FilterStatus').its('response.statusCode').should('eq', 200)
    cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates?limit=50&offset=0&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC'
        ).as('FilterReset')
    cy.get('.oxd-button--ghost').click()
    cy.get('.oxd-table-body').should('be.visible')
    cy.wait('@FilterReset').its('response.statusCode').should('eq', 200)
  })
})