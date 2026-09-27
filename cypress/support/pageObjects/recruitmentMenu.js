class recruitmentMenu{
    verifyViewRecruitment(){
        cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates'
        ).as('ViewRecruitment')
        cy.get(':nth-child(5) > .oxd-main-menu-item').click()
        cy.url({timeout: 10000}).should('include', 'recruitment')
        cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('be.visible').and('have.text', 'Recruitment')
        cy.get('.oxd-table-filter-header-title > .oxd-text').should('be.visible').and('have.text', 'Candidates')
        cy.wait('@ViewRecruitment').its('response.statusCode').should('eq', 200)
    }

    interceptAddCandidate(){
        cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate'
        ).as('AddCandidate')
    }

    clickAddCandidateButton(){
        cy.get('.orangehrm-header-container > .oxd-button').click()
    }

    inputCandidate(firstName, middleName, lastName, jobTitle, email, number, keyword, notes){
        cy.get('[name="firstName"]').type(firstName)
        cy.get('[name="middleName"]').type(middleName)
        cy.get('[name="lastName"]').type(lastName)
        cy.get('.oxd-select-text').click()
        cy.contains('.oxd-select-option', jobTitle).should('be.visible').click()
        cy.get(':nth-child(3) > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input').type(email)
        cy.get('.oxd-grid-3 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(number)
        cy.get('.orangehrm-save-candidate-page-full-width > .oxd-input-group > :nth-child(2) > .oxd-input').type(keyword)
        cy.get('.oxd-textarea').type(notes)
        cy.get('.oxd-checkbox-input').click()
    }

    waitAddCandidate(){
        cy.wait('@AddCandidate').its('response.statusCode').should('eq', 200)
    }

    clickSaveButton(){
        cy.get('.oxd-button--secondary').click()
    }

    verifySuccessMessage(){
        cy.get('.oxd-toast').should('exist').and('contain.text', 'Success')
    }

    verifyCandidate(firsName){
        cy.get('.oxd-table-body > :nth-child(1) > .oxd-table-row').should('contain.text', firsName)
    }

    interceptDeleteCandidate(){
        cy.intercept(
            'DELETE', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates'
        ).as('DeleteCandidate')
    }

    clickDeleteIcon(){
        cy.get(':nth-child(1) > .oxd-table-row > :nth-child(7) > .oxd-table-cell-actions > :nth-child(2)').click()
    }

    verifyConfirmationModal(){
        cy.get('.oxd-sheet').should('exist')
    }

    clickYes(){
        cy.get('.oxd-button--label-danger').click()
    }

    verifyDeletedMessage(){
        cy.get('.oxd-toast').should('exist').and('contain.text', 'Successfully Deleted')
    }

    verifyDeletedCandidate(firstName){
        cy.get('.oxd-table-body > :nth-child(1) > .oxd-table-row').should('not.contain.text', firstName)
    }

    waitDeleteCandidate(){
        cy.wait('@DeleteCandidate').its('response.statusCode').should('eq', 200)
    }

    jobTitleFilter(jobTitleFilter){
        cy.get(':nth-child(1) > .oxd-grid-4 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click()
        cy.contains('.oxd-select-option', jobTitleFilter).should('be.visible').click()
    }

    interceptFilterJob(){
        cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates?limit=50&offset=0&jobTitleId=8&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC'
        ).as('FilterJob')
    }

    clickSearchButton(){
        cy.get('.oxd-form-actions > .oxd-button--secondary').click()
    }

    verifyJobFilter(jobTitleFilter){
        cy.get('.oxd-table-body > :nth-child(1) > .oxd-table-row').should('be.visible').and('contain.text', jobTitleFilter)
    }

    waitFilterJob(){
        cy.wait('@FilterJob').its('response.statusCode').should('eq', 200)
    }

    vacancyFilter(vacancyFilter){
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click()
        cy.contains('.oxd-select-option', vacancyFilter).should('be.visible').click()
    }

    interceptFilterVacancy(){
        cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates?limit=50&offset=0&vacancyId=2&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC'
        ).as('FilterVacancy')
    }

    verifyVacancyFilter(vacancyFilter){
        cy.get('.oxd-table-body > :nth-child(1) > .oxd-table-row').should('be.visible').and('contain.text', vacancyFilter)
    }

    waitFilterVacancy(){
        cy.wait('@FilterVacancy').its('response.statusCode').should('eq', 200)
    }

    hiringManagerFilter(hiringManagerFilter){
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click()
        cy.contains('.oxd-select-option', hiringManagerFilter).should('be.visible').click()
    }

    interceptFilterHiringManager(){
        cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates?limit=50&offset=0&hiringManagerId=7&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC'
        ).as('FilterHiringManager')
    }

    verifyHiringManagerFilter(verifyHiringManagerFilter){
        cy.get('.oxd-table-body > :nth-child(1) > .oxd-table-row').should('be.visible').and('contain.text', verifyHiringManagerFilter)
    }

    waitFilterHiringManager(){
        cy.wait('@FilterHiringManager').its('response.statusCode').should('eq', 200)
    }

    statusFilter(statusFilter){
        cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click()
        cy.contains('.oxd-select-option', statusFilter).should('be.visible').click()
    }

    interceptFilterStatus(){
        cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates?limit=50&offset=0&status=1&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC'
        ).as('FilterStatus')
    }

    verifyStatusFilter(statusFilter){
        cy.get('.oxd-table-body > :nth-child(1) > .oxd-table-row').should('be.visible').and('contain.text', statusFilter)
    }

    waitFilterStatus(){
        cy.wait('@FilterStatus').its('response.statusCode').should('eq', 200)
    }

    interceptFilterReset(){
        cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates?limit=50&offset=0&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC'
        ).as('FilterReset')
    }

    clickResetButton(){
        cy.get('.oxd-button--ghost').click()
    }

    verifyResetFilter(){
        cy.get('.oxd-table-body').should('be.visible')
    }

    waitFilterReset(){
        cy.wait('@FilterReset').its('response.statusCode').should('eq', 200)
    }
}

export default new recruitmentMenu()