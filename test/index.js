const chai = require('chai');
const dirtyChai = require('dirty-chai');
const expect = chai.expect;

const app = require('express')();
const request = require('supertest')(app);

chai.use(dirtyChai);

const filter = require('..');
let result;
app.use((req, res) => {
  result = filter(req);
  res.status(200).send({});
});

describe('express-log-to-json', function () {
  it('should filter unnecessary keys', function () {
    return request.get('/').then(() => {
      ['res', 'route', 'connection', 'client', 'socket', '_readableState'].forEach((key) => {
        expect(result[key]).to.equal(undefined);
      });
    });
  });
});
