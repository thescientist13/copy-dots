#!/usr/bin/env node

/* eslint no-console: 0 */
const fs = require('fs');
const path = require('path');

const commands = {
  '-r': (file) => { return file.toLowerCase().indexOf('readme') >= 0; }
};

function isDotFile(file = '') {
  if (file.indexOf('.') === 0 && (file.indexOf('git') < 0)) {
    return file;
  }
}

function isNotDirectory(file = '') {
  if (!fs.lstatSync(file).isDirectory()) {
    return file;
  }
}

const scanFiles = (userDirectory, options) => {
  return new Promise((resolve, reject) => {
    try {   
      const files = fs.readdirSync(userDirectory);
      const userFiles = [];

      const dotFiles = files
        .filter(isDotFile)
        .filter(file => isNotDirectory(`${userDirectory}/${file}`));

      options.forEach((option) => {
        if (commands[options]) {
          console.log('appling option...', option);
          files
            .filter(commands[options])
            .forEach(file => {
              userFiles.push(file);
            });
        } else {
          console.log(`WARNING: options ${options} not valid, please try one of ${Object.keys(commands).join(',')}`);
        }
      });
      
      resolve([...dotFiles, ...userFiles]);
    } catch (error) {
      console.log('Unexpected error scanning files', error);
      reject(error);
    }
  });
};

const validateUserPath = (args) => { 
  return new Promise((resolve, reject) => {
    if (args.length <= 2) {
      reject('Missing required paramater: path.  Usage is npx copy-dots /some/path');
    }

    const userPath = path.isAbsolute(args[2]) 
      ? args[2]
      : path.join(process.cwd(), args[2]);

    resolve(userPath);
  });
};

const run = async () => {

  try {
    console.log('Validating user directory...');
    let currentDirectory = process.cwd();
    const userPathAbsolute = await validateUserPath(process.argv);

    console.log('Reading options...');
    const options = process.argv.length > 3
      ? process.argv.slice(3)
      : [];

    console.log('Scanning Files in user directory...', userPathAbsolute);
    const files = await scanFiles(userPathAbsolute, options);

    console.log('Copying filtered files into current directory...');
    files.forEach(file => {
      const fullPath = `${userPathAbsolute}/${file}`;
  
      console.log('copying file from', fullPath);
      console.log('copying file to', currentDirectory);
      fs.copyFileSync(fullPath, `${currentDirectory}/${file}`);
    });
  } catch (err) {
    console.error(err);
  }

  process.exit(); // eslint-disable-line no-process-exit
};

run();