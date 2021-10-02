describe('Note app', () => {
  const user = {
    username: 'test',
    name: 'Tester 2021',
    password: 'test_2021',
  };

  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    cy.request('POST', 'http://localhost:3001/api/users', user);
  });
  // it('frontpage cane openned', () => {
  //   cy.contains('Notes');
  // });

  // it('login form can be opened', () => {
  //   cy.contains('Show login').click();
  // });

  // it('login with user and password', () => {
  //   cy.contains('Show login').click();
  //   cy.get('input:first').type('aogallo');
  //   cy.get('input').last().type('1234');
  //   cy.get('#form-login-button').click();
  // });

  // it('user can login', () => {
  //   cy.contains('Show login').click();
  //   cy.get('[placeholder="Username"]').type('aogallo');
  //   cy.get('[placeholder="Password"]').type('124');
  //   cy.get('#form-login-button').click();
  //   cy.contains('Create a new Note');
  // });

  it('login fails with wrong password', () => {
    cy.contains('Show login').click();
    cy.get('[placeholder="Username"]').type(user.username);
    cy.get('[placeholder="Password"]').type('worng_password');
    cy.get('#form-login-button').click();
    // cy.contains('jjjjj');

    cy.get('.error').should('contain', 'wrong credetianls');
    // .should('have.css', 'color', 'rgb(255,0,0,0)');
  });

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login(user);
    });

    it('a new note can be created', () => {
      cy.contains('Show create new note').click();
      cy.get('[placeholder="write your note"]').type('testing note');
      cy.contains('save').click();
    });

    describe('and a note exists', () => {
      beforeEach(() => {
        cy.createdNote('A note created from cypress ', false);
      });

      it('can be made important', () => {
        cy.contains('A note created from cypress ').as('theNote');

        cy.get('@theNote').contains('make important').click();

        cy.get('@theNote').contains('make not important');
      });
    });
  });
});
