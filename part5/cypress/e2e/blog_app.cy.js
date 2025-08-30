describe('Blog app', function() {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'juan',
      username: 'juanTest',
      password: 'password'
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)
  })

  it('front page can be opened', function() {
      cy.contains('blogs')
  })

  it('login form can be opened', function() {
    cy.contains('show login').click()
  })



  describe('Login', () => {
    it('user can login', function() {
      cy.contains('show login').click()
      cy.get('[placeholder="Username"]').type('juanTest')
      cy.get('[placeholder="Password"]').type('password')
      cy.get('#form-login-button').click()
      cy.contains('create new blog')
    })

    it('user can not login', () => {
      cy.contains('show login').click()
      cy.get('[placeholder="Username"]').type('username')
      cy.get('[placeholder="Password"]').type('password')
      cy.get('#form-login-button').click()
      cy.contains('wrong username or password')
    })
  })

  describe('when logged in', () => {
    beforeEach(() => {
        cy.contains('show login').click()
        cy.get('[placeholder="Username"]').type('juanTest')
        cy.get('[placeholder="Password"]').type('password')
        cy.get('#form-login-button').click()
    })

    it('a new blog can be created', () => {
        cy.contains('create new blog').click()
        cy.get('[placeholder="title"]').type('blog creado por cypress')
        cy.get('[placeholder="author"]').type('cypress')
        cy.get('[placeholder="URL"]').type('http://localhost:5173/')
        cy.get('#create-blog-button').click()
        cy.contains('blog creado por cypress')
    })

    describe('with a created blog', () => {
      beforeEach(() => {
        cy.contains('create new blog').click()
        cy.get('[placeholder="title"]').type('blog para probar')
        cy.get('[placeholder="author"]').type('cypress')
        cy.get('[placeholder="URL"]').type('http://localhost:5173/')
        cy.get('#create-blog-button').click()
      })
    
      it('a blog can be liked', () => {
          cy.contains('view').click()
          cy.contains('like').click()
          cy.contains('likes 1')
      })

      it('a blog can be removed', () => {
        cy.contains('view').click()
        cy.contains('remove').click()
      })
    })

    describe('with multiple blogs', () => {
      beforeEach(() => {
        cy.contains('create new blog').click()
        cy.get('[placeholder="title"]').type('Primer blog')
        cy.get('[placeholder="author"]').type('cypress')
        cy.get('[placeholder="URL"]').type('http://test1.com')
        cy.get('#create-blog-button').click()

        cy.contains('create new blog').click()
        cy.get('[placeholder="title"]').type('Segundo blog')
        cy.get('[placeholder="author"]').type('cypress')
        cy.get('[placeholder="URL"]').type('http://test2.com')
        cy.get('#create-blog-button').click()

        cy.contains('create new blog').click()
        cy.get('[placeholder="title"]').type('Tercer blog')
        cy.get('[placeholder="author"]').type('cypress')
        cy.get('[placeholder="URL"]').type('http://test3.com')
        cy.get('#create-blog-button').click()
      })

      it('blogs are ordered by likes', () => {
        cy.contains('Segundo blog').parent().find('button').contains('view').click()
        cy.contains('Segundo blog').parent().find('button').contains('like').as('secondBlogLike')
        cy.get('@secondBlogLike').click().wait(500).click().wait(500)

        cy.contains('Tercer blog').parent().find('button').contains('view').click()
        cy.contains('Tercer blog').parent().find('button').contains('like').as('thirdBlogLike')
        cy.get('@thirdBlogLike').click().wait(500)

        cy.visit('http://localhost:5173')

        cy.get('.blog').eq(0).should('contain', 'Segundo blog')
        cy.get('.blog').eq(1).should('contain', 'Tercer blog')
        cy.get('.blog').eq(2).should('contain', 'Primer blog')
      })
    })
  })
})