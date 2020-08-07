#!/usr/bin/env node

/* eslint no-console: 0 */
const fs = require('fs');
const path = require('path');

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

// TODO
// const filterFiles = (files = [], options = {}) => { // eslint-disable-line no-unused-vars
//   console.log('filter for files ????', files);
//   return new Promise((resolve, reject) => {
//     try {
//       const filteredFiles = files
//         .filter(isDotFileFilter)
//         .filter(file => isDirectoryFilter(`${targetDirectory}/${file}`));
      
//       //  filterForDotFiles(files);
//       // console.log('filtered files just for dots', filteredFiles);
        
//       resolve(filteredFiles);
//     } catch (error) {
//       console.log('Unexpected error filtering files', error);
//       reject();
//     }
//   });
// };

const scanFiles = (userDirectory) => {
  return new Promise((resolve, reject) => {
    try {   
      const files = fs.readdirSync(userDirectory)
        .filter(isDotFile)
        .filter(file => isNotDirectory(`${userDirectory}/${file}`));
      
      resolve(files);
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
  // console.log('params', process.argv);

  try {
    console.log('Validating user directory...');
    let currentDirectory = process.cwd();
    const userPathAbsolute = await validateUserPath(process.argv);

    console.log('Scanning Files in user directory...', userPathAbsolute);
    const files = await scanFiles(userPathAbsolute);

    console.log('Filtering files in user directory...');
    // console.log('files', files);
    const filteredFiles = files; // TODO await filterFiles(files);

    console.log('Copying filtered files into current directory...');
    // console.log('========= FILTERED FILES', filteredFiles);

    // TODO
    if (process.env.NODE_ENV === 'development' && !fs.existsSync(path.join(process.cwd(), './output'))) {
      fs.mkdirSync(path.join(process.cwd(), './output'));
    }

    filteredFiles.forEach(file => {
      const fullPath = `${userPathAbsolute}/${file}`;

      // TODO
      if (process.env.NODE_ENV === 'development') {
        currentDirectory = path.join('output', file);
      }
  
      console.log('copying file from', fullPath);
      console.log('copying file to', currentDirectory);
      fs.copyFileSync(`${fullPath}`, currentDirectory);
    });
  } catch (err) {
    console.error(err);
  }

  process.exit(); // eslint-disable-line no-process-exit
};

run();