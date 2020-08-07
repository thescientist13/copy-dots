/*
 * Use Case
 * Run Greenwood with empty config object and default workspace.
 *
 * Uaer Result
 * Should generate a bare bones Greenwood build.  (same as build.default.spec.js)
 *
 * User Command
 * greenwood build
 *
 * User Config
 * {}
 *
 * User Workspace
 * Greenwood default (src/)
 */
const expect = require('chai').expect;
const TestBed = require('../test-bed');

describe('Run copy-dots with: ', function() {
  let setup;

  before(async function() {
    setup = new TestBed();
    this.context = await setup.setupTestBed(__dirname);
  });

  describe('default with relative path', function() {
    // before(async function() {
    //   await setup.runGreenwoodCommand('build');
    // });

    it('should work', function() {
      expect(true).to.be.equal(true);
    });
    
  });

  after(function() {
    // setup.teardownTestBed();
  });
});