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
    bed = new TestBed();

    await bed.setup(basePath);
  });

  describe('default options with relative path', function() {
    before(async function() {
      console.log('basepath', basePath);
      await bed.runCommand(
        './src/index.js', 
        path.join(process.cwd(), './test/fixtures')
      );
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
    rimraf.sync(basePath);
  });
});