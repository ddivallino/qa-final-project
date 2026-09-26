class directoryMenu{
    verifyViewDirectory(){
        cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory'
        ).as('ViewDirectory')
        cy.get(':nth-child(9) > .oxd-main-menu-item').click()
        cy.url({timeout: 10000}).should('include', 'directory')
        cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('be.visible').and('have.text', 'Directory')
        cy.get('.oxd-table-filter-header-title > .oxd-text').should('be.visible').and('have.text', 'Directory')
        cy.get('.orangehrm-horizontal-padding > .oxd-text').should('be.visible').and('contain.text', 'Records')
        cy.wait('@ViewDirectory').its('response.statusCode').should('eq', 200)
    }

    verifyListemployee(){
        cy.get('.orangehrm-horizontal-padding > .oxd-text').should('contain.text', 'Record')
    }

    interceptListEmployee(){
        cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0'
        ).as('EmployeeList')
    }

    clickSearchButton(){
        cy.get('.oxd-button--secondary').click()
    }

    waitListEmployee(){
        cy.wait('@EmployeeList').its('response.statusCode').should('eq', 200)
    }

    inputSearchName(name){
        cy.get('.oxd-autocomplete-text-input > input').should('be.visible').type(name)
    }

    verifyOptionName(fullName){
        cy.contains('.oxd-autocomplete-option', fullName).should('be.visible').click()
    }

    interceptSearchNameEmployee(){
        cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0&empNumber=95'
        ).as('SearchNameEmployee')
    }

    verifySearchNameEmployee(fullName){
        cy.get('.orangehrm-directory-card-header').should('be.visible').and('have.text', fullName +" ")
    }

    waitSearchNameEmployee(){
        cy.wait('@SearchNameEmployee').its('response.statusCode').should('eq', 200)
    }

    interceptSearchInvalidNama(){
        cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?nameOrId=Xyz999'
        ).as('SearchInvalidName')
    }

    waitSearchInvalidName(){
        cy.wait('@SearchInvalidName').its('response.statusCode').should('eq', 200)
    }

    verifyErrorMessage(){
        cy.get('.oxd-input-group > .oxd-text').should('exist')
    }

    jobFilterAndIntercept(jobTitle){
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click()
        cy.contains('.oxd-select-option', jobTitle).should('be.visible').click()
        cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0&jobTitleId=31'
        ).as('SearchBasedJobTitle')
    }

    verifyAndWaitJobTitle(jobTitle){
        cy.contains('.orangehrm-directory-card-subtitle', jobTitle).should('be.visible')
        cy.wait('@SearchBasedJobTitle').its('response.statusCode').should('eq', 200)
    }

    locationFilterAndIntercept(location){
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click()
        cy.contains('.oxd-select-option', location).should('be.visible').click()
        cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0&locationId=2'
        ).as('SearchBasedLocation')
    }

    verifyAndWaitLocation(location){
        cy.contains('.orangehrm-directory-card-body', location).should('be.visible')
        cy.wait('@SearchBasedLocation').its('response.statusCode').should('eq', 200)
    }

    clickResetButton(){
        cy.get('.oxd-button--ghost').click()
    }

    interceptMessage(){
        cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0&locationId=2&jobTitleId=31'
        ).as('Message')
    }

    verifyMessage(){
        cy.get('.oxd-toast')
    }

    waitMessage(){
        cy.wait('@Message').its('response.statusCode').should('eq', 200)
    }
}

export default new directoryMenu()