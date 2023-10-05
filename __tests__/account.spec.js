// const request = require('supertest');
// const app = require('../server.js');
// // import { expect } from 'chai';

// describe("GET /healthz", () => {
//   it("should respond 200", async() => { // Use the 'done' callback
//     const res = await request(app)
//       .get("/healthz")
//     expect(res.statusCode).toEqual(200)
//   });
// });

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');

const { expect } = chai;
chai.use(chaiHttp);

describe('/healthz endpoint', () => {
  it('should return 200 OK for a valid health check', async () => {
    const response = await chai.request(app).get('/healthz');
    expect(response.statusCode).equal(200);
  });
});

// const request = require('supertest');
// const app = require('../server');
// const expect = require('chai');

// describe("GET /healthz", () => {
//   it("It should respond 200", (done) => { // Use the 'done' callback
//     request(app)
//       .get("/healthz")
//       .end((err, response) => {
//         if (err) {
//           done(err); // Pass the error to 'done'
//         } else {
//           expect(response.statusCode).equal(200);
//           done(); // Indicate that the test is done
//         }
//       });
//   });
// });