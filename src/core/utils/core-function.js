'use strict';

module.exports = {
  filterCoreDirectories,
  filterProduction
};

function filterProduction (fileName) {
  if (process.env.NODE_ENV === 'production' && fileName === 'documentation.js') {
    return false;
  }
  return true;
}

function filterCoreDirectories (dirName) {
  if (dirName === 'modules') {
    return true;
  }
  return false;
}
