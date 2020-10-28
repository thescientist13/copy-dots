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
const Runner = require('gallinago').Runner;

describe('Run copy-dots', function() {
  let runner;
  const cliPath = path.join(process.cwd(), 'src', 'index.js');
  const fixturesPath = path.join(process.cwd(), 'test/fixtures');
  const outputPath = path.join(__dirname, './output');

  before(async function() {
    runner = new Runner();
  });

  describe('with verbose flag', function() {
    before(async function() {
      await runner.setup(outputPath);
      await runner.runCommand(cliPath, `${fixturesPath} v`);
    });

    it('should copy 3 files', function() {
      const files = fs.readdirSync(outputPath);
     
      expect(files.length).to.be.equal(3);
    });

    it('should have an .editorconfig file', function() {
      expect(fs.existsSync(`${outputPath}/.editorconfig`)).to.be.equal(true);
    });

    it('should have an .eslintrc file', function() {
      expect(fs.existsSync(`${outputPath}/.eslintrc.js`)).to.be.equal(true);
    });

    it('should have .mocharc.js file', function() {
      expect(fs.existsSync(`${outputPath}/.mocharc.js`)).to.be.equal(true);
    });
  });

  after(function() {
    runner.teardown();
  });
});