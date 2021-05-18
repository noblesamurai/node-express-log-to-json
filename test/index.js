const chai = require('chai');
const dirtyChai = require('dirty-chai');
const expect = chai.expect;

const app = require('express')();
const request = require('supertest')(app);

chai.use(dirtyChai);

const filter = require('..');
app.use('/', (req, res) => {
  req.user = 'USER'; // Attach user info for later middleware...
  req.video = 'VIDEO'; // Attach video info for later middleware...
  // Return filtered request object as result (should only include whitelisted
  // values + video and headers['x-ref'].
  res.status(200).send(filter(req, ['video', ['headers', ['x-ref']]]));
});

describe('express-request-to-json', () => {
  it('should only include whitelisted keys', async () => {
    const { body: result } = await request.get('/')
      .set('x-fubar', 'should not be returned');
    // Check some of the other keys don't exist.
    const badKeys = ['_readableState', 'client', 'next', 'res', 'socket', 'user'];
    expect(Object.keys(result)).to.not.include(['user', ...badKeys]);
    // Check other header keys don't exist.
    const badHeaderKeys = ['connection', 'x-fubar'];
    expect(Object.keys(result.headers)).to.not.include([badHeaderKeys]);
  });

  it('should include extra whitelisted keys', async () => {
    const { body: result } = await request.get('/');
    expect(result.video).to.equal('VIDEO');
  });

  it('should include extra whitelisted header keys', async () => {
    const { body: result } = await request.get('/')
      .set('x-ref', 'ABC123');
    expect(result.headers['x-ref']).to.equal('ABC123');
  });
});
