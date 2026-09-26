import loginPage from "../support/pageObjects/loginPage"
import loginData from "../fixtures/loginData.json"
import directoryMenu from "../support/pageObjects/directoryMenu"
import directoryData from "../fixtures/directoryData.json"

describe ('Verifikasi Menu Directory', () => {
  it('TC-DIR-001 Verifikasi List Karyawan', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
    directoryMenu.verifyViewDirectory()
  })

  it('TC-DIR-002 Verifikasi Search Tanpa Kriteria', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
    directoryMenu.verifyViewDirectory()
    directoryMenu.verifyListemployee()
    directoryMenu.interceptListEmployee()
    directoryMenu.clickSearchButton()
    directoryMenu.verifyListemployee()
    directoryMenu.waitListEmployee()
  })

  it('TC-DIR-003 Verifikasi Search dengan Nama Valid', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
    directoryMenu.verifyViewDirectory()
    directoryMenu.inputSearchName(directoryData.validSearchName)
    directoryMenu.verifyOptionName(directoryData.validSearchFullName)
    directoryMenu.interceptSearchNameEmployee()
    directoryMenu.clickSearchButton()
    directoryMenu.verifySearchNameEmployee(directoryData.validSearchFullName)
    directoryMenu.waitSearchNameEmployee()
  })

  it('TC-DIR-004 Verifikasi Search dengan Nama Invalid', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
    directoryMenu.verifyViewDirectory()
    directoryMenu.inputSearchName(directoryData.invalidSearchName)
    directoryMenu.interceptSearchInvalidNama()
    directoryMenu.verifyOptionName(directoryData.noRecords)
    directoryMenu.clickSearchButton()
    directoryMenu.verifyErrorMessage()
    directoryMenu.verifyListemployee()
    directoryMenu.waitSearchInvalidName()
  })

  it('TC-DIR-005 Verifikasi Filter Berdasarkaan Job Title', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
    directoryMenu.verifyViewDirectory()
    directoryMenu.jobFilterAndIntercept(directoryData.jobTitle)
    directoryMenu.clickSearchButton()
    directoryMenu.verifyAndWaitJobTitle(directoryData.jobTitle)
  })

  it('TC-DIR-006 Verifikasi Filter Berdasarkaan Location', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
    directoryMenu.verifyViewDirectory()
    directoryMenu.locationFilterAndIntercept(directoryData.location)
    directoryMenu.clickSearchButton()
    directoryMenu.verifyAndWaitLocation(directoryData.location)
  })

  it('TC-DIR-007 Verifikasi Reset Filter', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
    directoryMenu.verifyViewDirectory()
    directoryMenu.inputSearchName(directoryData.validSearchName)
    directoryMenu.verifyOptionName(directoryData.validSearchFullName)
    directoryMenu.interceptSearchNameEmployee()
    directoryMenu.clickSearchButton()
    directoryMenu.verifySearchNameEmployee(directoryData.validSearchFullName)
    directoryMenu.waitSearchNameEmployee()
    directoryMenu.interceptListEmployee()
    directoryMenu.clickResetButton()
    directoryMenu.verifyListemployee()
    directoryMenu.waitListEmployee()
  })

  it('TC-DIR-008 Verifikasi Message No Data', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
    directoryMenu.verifyViewDirectory()
    directoryMenu.jobFilterAndIntercept(directoryData.jobTitle)
    directoryMenu.locationFilterAndIntercept(directoryData.location)
    directoryMenu.interceptMessage()
    directoryMenu.clickSearchButton()
    directoryMenu.waitMessage()
  })
})