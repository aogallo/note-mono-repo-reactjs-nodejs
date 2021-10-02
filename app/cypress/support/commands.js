const urlApi = 'http://localhost:3001/api'

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password
  }).then((response) => {
    localStorage.setItem('user', JSON.stringify(response.body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createdNote', (content, important) => {
  cy.request({
    method: 'POST',
    url: `${urlApi}/notes`,
    body: {
      content,
      important
    },
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    }
  })
  cy.visit('http://localhost:3000')
})
