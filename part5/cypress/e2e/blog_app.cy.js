describe('Blog app', function() {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('front page can be opened', function() {
      cy.contains('blogs')
  })

  it('login form can be opened', function() {
    cy.contains('show login').click()
  })

  it('user can login', function() {
    cy.contains('show login').click()
    cy.get('[placeholder="Username"]').type('juanEsc')
    cy.get('[placeholder="Password"]').type('acb')
    cy.get('#form-login-button').click()
    cy.contains('create new blog')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.contains('show login').click()
      cy.get('[placeholder="Username"]').type('juanEsc')
      cy.get('[placeholder="Password"]').type('acb')
      cy.get('#form-login-button').click()
    })

    it('a new blog can be created', () => {
      cy.contains('create new blog').click()
      cy.get('[placeholder="title"]').type('blog creado por cypress')
      cy.get('[placeholder="author"]').type('cypress')
      cy.get('[placeholder="URL"]').type('http://localhost:5173/')
      cy.contains('create').click()
      cy.contains('blog creado por cypress')
    })
  })
})