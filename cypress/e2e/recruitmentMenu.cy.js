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
    recruitmentMenu.vacancyFilter(recruitmentData.vacancyFilter)
    recruitmentMenu.interceptFilterVacancy()
    recruitmentMenu.clickSearchButton()
    recruitmentMenu.verifyVacancyFilter(recruitmentData.vacancyFilter)
    recruitmentMenu.waitFilterVacancy()
  })

  it('TC-REC-006 Verifikasi Hiring Manager Filter Kandidat', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
    recruitmentMenu.verifyViewRecruitment()
    recruitmentMenu.hiringManagerFilter(recruitmentData.hiringManagerFilter)
    recruitmentMenu.interceptFilterHiringManager()
    recruitmentMenu.clickSearchButton()
    recruitmentMenu.verifyHiringManagerFilter(recruitmentData.verifyHiringManagerFilter)
    recruitmentMenu.waitFilterHiringManager()
  })

  it('TC-REC-007 Verifikasi Status Filter Kandidat', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
    recruitmentMenu.verifyViewRecruitment()
    recruitmentMenu.statusFilter(recruitmentData.statusFilter)
    recruitmentMenu.interceptFilterStatus()
    recruitmentMenu.clickSearchButton()
    recruitmentMenu.verifyStatusFilter(recruitmentData.statusFilter)
    recruitmentMenu.waitFilterStatus()
  })

  it('TC-REC-008 Verifikasi Reset Filter Kandidat', () => {
    loginPage.login(loginData.urlLogin, loginData.validUsername, loginData.validPassword)
    recruitmentMenu.verifyViewRecruitment()
    recruitmentMenu.statusFilter(recruitmentData.statusFilter)
    recruitmentMenu.interceptFilterStatus()
    recruitmentMenu.clickSearchButton()
    recruitmentMenu.verifyStatusFilter(recruitmentData.statusFilter)
    recruitmentMenu.waitFilterStatus()
    recruitmentMenu.interceptFilterReset()
    recruitmentMenu.clickResetButton()
    recruitmentMenu.verifyResetFilter()
    recruitmentMenu.waitFilterReset()
  })
})