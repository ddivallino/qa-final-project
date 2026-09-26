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