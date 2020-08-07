#!/usr/bin/env node

/* eslint no-console: 0 */
const fs = require('fs');
const path = require('path');

function isDotFileFilter(file = '') {
  console.log('isDotFileFilter', file);
  if (file.indexOf('.') === 0 && (file.indexOf('git') < 0)) {
    console.log('return dot file', file);
    return file;
  }
}

function isDirectoryFilter(file = '') {
  console.log('isDirectoryFilter', file);
  if (!fs.lstatSync(file).isDirectory()) {
    return file;
  }
}

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

const scanFiles = (targetDirectory) => {
  return new Promise((resolve, reject) => {
    try {   
      const files = fs.readdirSync(targetDirectory)
        .filter(isDotFileFilter)
        .filter(file => isDirectoryFilter(`${targetDirectory}/${file}`));
      
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

    console.log('userPath', userPath);
    resolve(userPath);
  });
};

const run = async () => {
  try {
    let targetDirectory = process.cwd();
    console.log('Validating target directory...');
    console.log('params', process.argv);
    const userPathAbsolute = await validateUserPath(process.argv);

    console.log('Scanning Files in user directory...');
    console.log('userPathAbsolute', userPathAbsolute);
    const files = await scanFiles(userPathAbsolute);

    console.log('Filtering files in target directory...');
    console.log('files', files);
    const filteredFiles = files; // await filterFiles(files);

    console.log('Copying filtered files into current directory...');
    console.log('========= FILTERED FILES', filteredFiles);

    if (process.env.NODE_ENV === 'development' && !fs.existsSync(path.join(process.cwd(), './output'))) {
      fs.mkdirSync(path.join(process.cwd(), './output'));
    }

    filteredFiles.forEach(file => {
      const fullPath = `${userPathAbsolute}/${file}`;

      if (process.env.NODE_ENV === 'development') {
        targetDirectory = path.join('output', file);
      }
  
      console.log('copying file from', fullPath);
      console.log('copying file to', targetDirectory);
      fs.copyFileSync(`${fullPath}`, targetDirectory);
    });
  } catch (err) {
    console.error(err);
  }

  process.exit(); // eslint-disable-line no-process-exit
};

run();