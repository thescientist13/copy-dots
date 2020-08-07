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
const fs = require('fs');
const path = require('path');
const TestBed = require('../test-bed');

describe.only('Run copy-dots', function() {
  const basePath = path.join(__dirname, './output');
  let bed;

  before(async function() {
    bed = new TestBed(true);
    // TODO
    // this.context = await bed.setup(__dirname);
    await bed.setup(__dirname);
  });

  describe('default with relative path', function() {
    before(async function() {
      await bed.runCommand('./src/index.js', '../fixtures');
    });

    it('should only copy 3 files', function() {
      const files = fs.readdirSync(basePath);
      expect(files.length).to.be.equal(3);
    });

    it('should have an .editorconfig file', function() {
      expect(fs.existsSync(`${basePath}/.editorconfig`)).to.be.equal(true);
    });

    it('should have an .eslintrc file', function() {
      expect(fs.existsSync(`${basePath}/.eslintrc.js`)).to.be.equal(true);
    });

    it('should have .mocharc.js file', function() {
      expect(fs.existsSync(`${basePath}/.mocharc.js`)).to.be.equal(true);
    });

  });

  after(function() {
    // TODO bed.teardown();
  });
});