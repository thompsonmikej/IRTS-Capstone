// describe('Test #1. Register a new employee, Leeza.', () => {
//   it('Performs a sequence of a new employee self-registering, logging in, and adding a course into the catalog', () => {
//     cy.visit('http://localhost:3000')
//     cy.get('.register').click()
//     cy.get(':nth-child(1) > input').type('Leeza').not('Lisa')
//     cy.get(':nth-child(2) > input').type('Leeza')
//     cy.get(':nth-child(3) > input').type('Benson')
//     cy.get(':nth-child(4) > input').type('leeza@college.com')
//     cy.should('be.visible')
//     cy.get(':nth-child(5) > input').type('password1@')
//     cy.get('.form > button').click()
//   })
// })

// describe('Test #1a. Leeza logs in and adds the course 810 SNR2 BUS.', () => {
//   it('Performs a sequence of a new employee self-registering, logging in, and adding a course into the catalog', () => {
//     cy.visit('http://localhost:3000')
//     cy.get(':nth-child(1) > input').type('Leeza').not('Lisa')
//     cy.get(':nth-child(2) > input').type('password1@')
//     cy.should('exist')
//     cy.get('.form > button').click()
//     cy.wait(999)
//     cy.get(':nth-child(9) > .register').click()
//     cy.get(':nth-child(1) > input').type('810 SNR2 BUS')
//     cy.should('be.visible')
//     cy.get(':nth-child(2) > input').type('4')
//     cy.should('be.visible')
//     cy.get(':nth-child(3) > input').type('8')
//     cy.wait(999)
//     cy.get('.form > button').click()
//     cy.wait(999)
//     cy.get('button').click()
//   })
// })


// describe('Test #2. Log-in as Eve, a student. Check Schedule. Enroll in course, 810 SNR2 BUS, from Available Courses. Log out. ', () => {
//   it('Performs a sequence of steps simulating a student logging in and enrolling in a course.', () => {
//     cy.visit('http://localhost:3000')
//     cy.get(':nth-child(1) > input').type('Eve').not('Eva')
//     cy.should('be.visible')
//     cy.get(':nth-child(2) > input').type('password1@').not('be.visible')
//     cy.get('.form > button').click()
//     // She clicks Scheduled Courses
//     cy.get(':nth-child(9) > a').click()
//     cy.wait(999)
//    // She clicks Available Courses
//     cy.get(':nth-child(6) > a').click()
//     cy.wait(999)
//   // She clicks Enroll next to the course
//     cy.get(':nth-child(2) > .schedule-button > button').click()
//     cy.wait(999)
//  // She logs out
//     cy.get('button').click()
// cy.end()
//   })
// })