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
}

export default new recruitmentMenu()