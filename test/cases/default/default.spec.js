/*
 * Use Case
 * Runs copy-dots by just passing a path to scan.
 *
 * Uaer Result
 * Should copy only dot files with no special filters
 *
 * User Command
 * copy-dots ../../some/path
 *
 * User Workspace
 * Default fixtures
 */

const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');
const TestBed = require('../../test-bed');

describe('Run copy-dots', function() {
  const basePath = path.join(__dirname, './output');
  let bed;

  before(async function() {
    bed = new TestBed();
    await bed.setup(__dirname);
  });

  describe('default options with relative path', function() {
    before(async function() {
      await bed.runCommand('./src/index.js', '../../fixtures');
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
    // bed.teardown();
  });
});