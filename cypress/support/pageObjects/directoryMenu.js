class directoryMenu{
    verifyViewDirectory(){
        cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory'
        ).as('ViewDirectory')
        cy.get(':nth-child(9) > .oxd-main-menu-item').click()
        cy.url({timeout: 10000}).should('include', 'directory')
        cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('be.visible')
        cy.get('.oxd-table-filter-header-title > .oxd-text').should('be.visible')
        cy.get('.orangehrm-horizontal-padding > .oxd-text').should('be.visible')
        cy.wait('@ViewDirectory').its('response.statusCode').should('eq', 200)
    }
}

export default new directoryMenu()