#!/usr/bin/env node
const { execSync } = require('child_process');
const { promisify } = require('util');
const { join } = require('path');

let ncp = promisify(require('ncp'));
ncp.limit = 16;

const cwd = process.cwd();

const installModules = () => {
  const modules = [
    'react-redux',
    'redux',
    'redux-actions',
    'redux-thunk',
    'reselect',
  ];

  const stdout = execSync(`yarn add ${modules.join(' ')}`);
  console.log(stdout.toString());
};

const copyTemplates = async () => {
  const templatesLocation = join(__dirname, 'templates');
  await ncp(templatesLocation, join(cwd, 'src'));
};

const modCode = () => {
  const jscodeshift = join(__dirname, 'node_modules/.bin/jscodeshift');
  const codemodsLocation = join(__dirname, 'codemods');

  const appLocation = join(cwd, 'src/App.js');
  const stdout = execSync(
    `${jscodeshift} ${appLocation} -t ${codemodsLocation}/App.js`,
  );
  console.log(stdout.toString());
};

const prettify = () => {
  const prettier = join(__dirname, 'node_modules/.bin/prettier');

  const stdout = execSync(
    `${prettier} --single-quote --trailing-comma all --write "${cwd}/src/**/*.js"`,
  );
  console.log(stdout.toString());
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

  console.log('');
  console.log('####################################');
  console.log('########## Modding Code ############');
  console.log('####################################');
  console.log('');
  modCode();

  console.log('');
  console.log('####################################');
  console.log('######## Prettifying Code ##########');
  console.log('####################################');
  console.log('');
  prettify();
};

run()
  .then(() => {
    console.log('Added redux to create-react-app application!');
  })
  .catch(e => {
    console.error(e);
  });
