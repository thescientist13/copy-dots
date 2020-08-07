#!/usr/bin/env node
/* eslint no-console: 0 */

const fs = require('fs');
const path = require('path');

function filterForDotFiles(files = []) {
  console.log('filterForDotFiles', files);
  return files.filter(file => {
    console.log('file', file);
    if (file.indexOf('.') === 0) {
      return file;
    };
  })
} 

const filterFiles = (files = [], options = {}) => {
  console.log('filter for files ????', files);
  return new Promise((resolve, reject) => {
    try {
      const filteredFiles = filterForDotFiles(files);
        
      resolve(filteredFiles);
    } catch(error) {
      console.log('Unexpected error filtering files', error);
      reject();
    }
  });
}

const scanFiles = (targetDirectory) => {
  return new Promise((resolve, reject) => {
    try {   
      const files = fs.readdirSync(targetDirectory);
      
      resolve(files);
    } catch(error) {
      console.log('Unexpected error scanning files', error);
    }
  });
}

const validateUserPath = (args) => { 
  return new Promise((resolve, reject) => {
    if (args.length <= 2) {
      reject('Missing required paramater: path.  Usage is npx copy-dots /some/path');
    }

    const absPath = path.join(process.cwd(), args[2]);

    resolve(absPath);
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
    const filteredFiles = await filterFiles(files);

    console.log('Copying filtered files into current directory...');
    console.log('========= FILTERED FILES', filteredFiles);

    if (process.env.NODE_ENV === 'development') {
      fs.mkdirSync(path.join(process.cwd(), './output'));
    }

    filteredFiles.forEach(file => {
      const fullPath = `${userPathAbsolute}/${file}`;

      if (process.env.NODE_ENV === 'development') {
        targetDirectory = path.join('./output', file);
      }
  
      console.log('copying file from', fullPath);
      console.log('copying file to', targetDirectory);
      fs.copyFileSync(`${fullPath}`, targetDirectory);
    })

    // // success!
    // console.log('-------------------------------------------------------');
    // console.log('Success, your project is ready to go!');
    // console.log(`Just run: cd ${TARGET_DIR}`);
    // console.log('And then launch your project with: npm start');
    // console.log('-------------------------------------------------------');
  } catch (err) {
    console.error(err);
  }

  process.exit(); // eslint-disable-line no-process-exit
};

run();