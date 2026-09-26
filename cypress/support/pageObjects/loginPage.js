class loginPage {
    visitAndVerifyLoginPage(urlLogin) {
        cy.visit(urlLogin)
        cy.get('.oxd-text--h5').should('be.visible')
    }

    inputUsername(username) {
        cy.get('[name="username"]').type(username)
    }

    inputPassword(password) {
        cy.get('[name="password"]').type(password)
    }

    clickLoginButton() {
        cy.get('.oxd-button').click()
    }

    verifyErrorMessageNotExists() {
        cy.get('.oxd-alert').should('not.exist')
    }

    verifyDashboardPage() {
        cy.url({timeout: 10000}).should('include', 'dashboard')
        cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('be.visible')
        cy.get('.oxd-userdropdown-img').should('be.visible')
        cy.get('.oxd-userdropdown-name').should('be.visible')
    }

    verifyInputError() {
        cy.get('.oxd-input--error').should('exist')
        cy.get('.oxd-input-field-error-message').should('exist')
    }

    verifyUrlLoginPage() {
        cy.url().should('include', 'login')
    }

    verifyInvalidCredentialsError() {
        cy.get('.oxd-alert').should('be.visible').and('contain.text', 'Invalid credentials')
    }

    clickForgotPasswordLink() {
        cy.get('.orangehrm-login-forgot > .oxd-text').click()
    }

    verifyForgotPasswordPage() {
        cy.get('.oxd-text--h6').should('be.visible')
        cy.url().should('include', 'Reset')
    }

    clickButtonResetPassword() {
       cy.get('.oxd-button--secondary').click()
    }

    verifyPasswordFieldType() {
        cy.get('[name="password"]').should('have.attr', 'type', 'password')
    }

    clickBackAndForwardBrowser() {
        cy.go('back')
        cy.go('forward')
    }

    reloadPage() {
        cy.reload()
    }

    interceptDashboardPage() {
        cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'
        ).as('DashboardPage')
    }

    waitDashboardPage() {
        cy.wait('@DashboardPage', {timeout: 10000}).its('response.statusCode').should('eq', 200)
    }

    interceptMessage(){
        cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages'
        ).as('Messages')
    }

    waitMessage(){
        cy.wait('@Messages').its('response.statusCode').should('eq', 304)
    }

    interceptLoginPage(){
        cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
        ).as('LoginPage')
    }

    waitLoginPage(){
        cy.wait('@LoginPage').its('response.statusCode').should('eq', 200)
    }

    interceptValidate(){
        cy.intercept(
            'POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate'
        ).as('Validate')
    }

    waitValidate(){
        cy.wait('@Validate').its('response.statusCode').should('eq', 302)
    }

    interceptResetPasswordPage(){
        cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode'
        ).as('ResetPasswordPage')
    }

    waitResetPasswordPage(){
         cy.wait('@ResetPasswordPage').its('response.statusCode').should('eq', 200)
    }

    interceptResetPassword(){
        cy.intercept(
            'POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestResetPassword'
        ).as('ResetPassword')
    }

    waitResetPassword(){
        cy.wait('@ResetPassword').its('response.statusCode').should('eq', undefined)
    }

    interceptShortcuts(){
        cy.intercept(
            'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts'
        ).as('Shortcuts')
    }

    waitShortcuts(){
        cy.wait('@Shortcuts').its('response.statusCode').should('eq', 200)
    }

    login(urlLogin, username, password){
        this.visitAndVerifyLoginPage(urlLogin)
        this.inputUsername(username)
        this.inputPassword(password)
        this.interceptDashboardPage()
        this.clickLoginButton()
        this.verifyErrorMessageNotExists()
        this.verifyDashboardPage()
        this.waitDashboardPage()
    }   
}

export default new loginPage()