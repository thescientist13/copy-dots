/*
 * This module can be used to assist in the development of test cases that want run in a userland like environment
 * to recreate project configurations, config files, fixtures, etc.
 * 
 * The main goal is to be able to easily simulate any "real world" scenario you might need to test for.
 *
 */

// const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

// const setupFiles = [];
// const setupFiles = [{
//   dir: 'node_modules/@webcomponents/webcomponentsjs',
//   name: 'webcomponents-bundle.js'
// }];

module.exports = class TestBed {
  constructor(enableStdOut) {
    this.rootDir = process.cwd();
    this.enableStdOut = enableStdOut; // debugging tests
  }

  // setup(cwd, testFiles = []) {
  setup(cwd) {
    // console.log('setupTestBed for cwd', cwd);
    return new Promise(async (resolve, reject) => {
      try {
        this.rootDir = cwd;
        // this.publicDir = path.join(this.rootDir, 'public');
        // this.buildDir = path.join(this.rootDir, '.greenwood');

        // await this.teardownTestBed();

        // await Promise.all(setupFiles.concat(testFiles).map((file) => {
        //   return new Promise(async (resolve, reject) => {
        //     try {
        //       const targetSrc = path.join(process.cwd(), file.dir, file.name);
        //       const targetDir = path.join(cwd, file.dir);
        //       const targetPath = path.join(cwd, file.dir, file.name);

        //       await new Promise(async(resolve, reject) => {
        //         try {
        //           await fs.ensureDir(targetDir, { recursive: true });
        //           await fs.copy(targetSrc, targetPath);
        //           resolve();
        //         } catch (err) {
        //           reject(err);
        //         }
        //       });

        //       resolve();
        //     } catch (err) {
        //       reject(err);
        //     }
        //   });
        // }));

        resolve();
        // resolve({
        //   publicDir: this.publicDir
        // });
      } catch (err) {
        reject(err);
      }

    });
  }

  runCommand(binPath, args) {
    // console.log('run bin ', binPath);
    // console.log('with args', args);
    return new Promise(async (resolve, reject) => {
      const cliPath = path.join(process.cwd(), binPath);
      let err = '';

      // console.log('cli path', cliPath);
      
      const runner = os.platform() === 'win32' ? 'node.cmd' : 'node';
      const npm = spawn(runner, [cliPath, args], {
        cwd: this.rootDir,
        shell: true
      });

      npm.on('close', code => {
        if (code !== 0) {
          reject(err);
          return;
        }
        resolve();
      });

      npm.stderr.on('data', (data) => {
        err = data.toString('utf8');
        if (this.enableStdOut) {
          console.error(err); // eslint-disable-line
        }
        reject(err);
      });

      npm.stdout.on('data', (data) => {
        if (this.enableStdOut) {
          console.log(data.toString('utf8')); // eslint-disable-line
        }
      });
    });
  }

  // teardown() {
  //   return new Promise(async(resolve, reject) => {
  //     try {
  //       await fs.remove(path.join(this.rootDir, '.greenwood'));
  //       await fs.remove(path.join(this.rootDir, 'public'));

  //       await Promise.all(setupFiles.map((file) => {
  //         return fs.remove(path.join(this.rootDir, file.dir.split('/')[0]));
  //       }));
  //       resolve();
  //     } catch (err) {
  //       reject(err);
  //     }
  //   });
  // }
};