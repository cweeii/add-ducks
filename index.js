#!/usr/bin/env node
const { execSync } = require('child_process');
const { promisify } = require('util');
const { join } = require('path');

let ncp = promisify(require('ncp'));
ncp.limit = 16;

const cwd = process.cwd();

const installModules = () => {
  const modules = [
    'redux',
    'react-redux',
    'redux-actions',
    'redux-thunk',
    'reselect',
  ];

  execSync(`yarn add ${modules.join(' ')}`);
};

const copyTemplates = async () => {
  const templatesLocation = join(__dirname, '/templates');
  await ncp(templatesLocation, join(cwd, './src'));
};

const run = async () => {
  console.log('');
  console.log('####################################');
  console.log('##### Installing Dependencies ######');
  console.log('####################################');
  console.log('');
  installModules();

  console.log('');
  console.log('####################################');
  console.log('######## Copying Templates #########');
  console.log('####################################');
  console.log('');
  await copyTemplates();
};

try {
  run();
  console.log('Added redux to create-react-app application!');
} catch (e) {
  console.error(e);
}
