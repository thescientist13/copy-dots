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
const fs = require('fs-extra');
const path = require('path');
const rimraf = require('rimraf');
const TestBed = require('../../test-bed');

describe('Run copy-dots', function() {
  let bed;
  let basePath;

  before(async function() {
    await fs.mkdir(path.join(__dirname, './output'));

    basePath = path.join(__dirname, './output');
    bed = new TestBed(true);

    await bed.setup(basePath);
  });

  describe('with readme flag', function() {
    before(async function() {
      await bed.runCommand(
        './src/index.js', 
        `${path.join(process.cwd(), './test/fixtures')} -r`
      );
    });

    it('should copy 4 files', function() {
      const files = fs.readdirSync(basePath);
     
      expect(files.length).to.be.equal(4);
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

    it('should have README.md file', function() {
      expect(fs.existsSync(`${basePath}/README.md`)).to.be.equal(true);
    });
  });

  after(function() {
    // bed.teardown();
    rimraf.sync(basePath);
  });
});