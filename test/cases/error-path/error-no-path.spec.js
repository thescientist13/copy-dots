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
const path = require('path');
const Runner = require('gallinago').Runner;

describe('Run copy-dots', function() {
  const cliPath = path.join(process.cwd(), 'src', 'index.js');
  let runner;

  before(async function() {
    runner = new Runner();
  });

  describe('with no path provided', function() {
    it('should throw an error that path was not provided', async function() {
      try {
        await runner.runCommand(cliPath);
      } catch (err) {
        expect(err).to.contain('Missing required paramater: path.  Usage is npx copy-dots /some/path');
      }
    });
  });
});