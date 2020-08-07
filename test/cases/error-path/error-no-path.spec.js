/*
 * Use Case
 * Runs copy-dots but doesn't pass required path param.
 *
 * Uaer Result
 * Should catch the error for the user.
 *
 * User Command
 * copy-dots
 *
 * User Workspace
 * N / A
 */

const expect = require('chai').expect;
const TestBed = require('../../test-bed');

describe('Run copy-dots', function() {
  let bed;

  before(async function() {
    bed = new TestBed();
    await bed.setup(__dirname);
  });

  describe('with no path provided', function() {
    it('should throw an error that path was not provided', async function() {
      try {
        await bed.runCommand('./src/index.js');
      } catch (err) {
        expect(err).to.contain('Missing required paramater: path.  Usage is npx copy-dots /some/path');
      }
    });
  });

  after(function() {
    // bed.teardown();
  });
});